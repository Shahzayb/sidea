import React from 'react';
import Head from 'next/head';
import {
  Paper,
  Typography,
  Button,
  Chip,
  Box,
  Backdrop,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { format as timeago_format } from 'timeago.js';
import CreateFeatureForm from '../Forms/CreateFeatureForm';
import { useGetIdeaByIdQuery } from '../../graphql/client/types';
import IdeaSkeleton from '../Skeletons/IdeaSkeleton';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import CustomError from '../Errors/CustomError';
import number from '../../utils/number';
import UserAvatar from '../User/UserAvatar';
import ToggleLike from './IdeaActions/ToggleLike';
import ToggleSave from './IdeaActions/ToggleSave';
import Share from './IdeaActions/Share';
import Link from '../Link';
import DeleteIdea from './IdeaActions/DeleteIdea';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import FeatureList from '../Feature/FeatureList';
import { useAuth } from '../../context/auth-context';
import IdeaActionsSkeleton from '../Skeletons/IdeaActionsSkeleton';
import CreateFeatureFormSkeleton from '../Skeletons/CreateFeatureFormSkeleton';
import useMarginRightChild from '../../hooks/useMarginRightChild';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    zIndex: 999,
    borderRadius: theme.shape.borderRadius,
  },
  ideaActions: {
    display: 'flex',
    flexDirection: 'column-reverse',
    '& > #idea-likes': {
      paddingBottom: theme.spacing(1),
      paddingLeft: 5,
    },
  },
}));

interface Props {
  id: string;
}

function Idea({ id }: Props) {
  const classes = useStyles();
  const [deleting, setDeleting] = React.useState(false);
  const { user: authUser, loading: authLoading, authenticated } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const gutterClx = useGutterAllChild({ spacing: 2 });
  const mrChildClx = useMarginRightChild();
  const { data, loading, error, refetch, networkStatus } = useGetIdeaByIdQuery({
    variables: {
      id,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading || networkStatus === 4) {
    return <IdeaSkeleton />;
  }

  if (error) {
    return (
      <CustomError
        title="Ooops. Something went wrong!"
        retry={() => {
          if (refetch) {
            refetch().catch(console.log);
          }
        }}
      />
    );
  }

  if (!data || !data.idea) {
    return <CustomError title="No idea found." />;
  }

  const isMineIdea = data.idea.user.id === authUser?.id && authenticated;

  return (
    <div style={{ position: 'relative' }}>
      {deleting && (
        <Backdrop
          open
          classes={{
            root: classes.root,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Head>
        <title>
          {data.idea.title} : {data.idea.user.username}
        </title>
      </Head>
      <Paper className={gutterClx.gutterAllChild} style={{ padding: '1rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <UserAvatar user={data.idea.user} />
          <Typography variant="caption" color="textSecondary">
            {timeago_format(data.idea.createdAt)}
          </Typography>
        </div>
        <Typography component="h1" variant="h5">
          {data.idea.title}
        </Typography>
        <Typography
          component="div"
          variant="body1"
          dangerouslySetInnerHTML={{ __html: data.idea.body }}
        ></Typography>
        {!!data.idea.tags.length && (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {data.idea.tags.map((tag, i) => (
              <Box key={tag + i} mr={1} mb={1}>
                <Chip
                  variant="outlined"
                  color="primary"
                  label={tag}
                  size="small"
                />
              </Box>
            ))}
          </div>
        )}
        <Typography
          noWrap
          component="div"
          color="textPrimary"
          variant="overline"
        >
          {number.format(data.idea.likesCount)} likes
        </Typography>

        {!authLoading && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
            className={mrChildClx.root}
          >
            <ToggleLike idea={data.idea} />
            <ToggleSave idea={data.idea} />

            <Share />

            {isMineIdea && (
              <DeleteIdea
                id={data.idea.id}
                onLoading={() => setDeleting(true)}
                onSuccess={async () => {
                  setDeleting(false);
                  try {
                    await router.push('/');
                  } catch {}
                }}
                onError={() => {
                  setDeleting(false);
                  enqueueSnackbar('Failed to delete idea.');
                }}
              />
            )}

            {isMineIdea && (
              <Link
                underline="none"
                href="/idea/[ideaId]/edit"
                as={`/idea/${data.idea.id}/edit`}
              >
                <Button size="small" startIcon={<EditIcon />}>
                  edit
                </Button>
              </Link>
            )}
          </div>
        )}
        {authLoading && <IdeaActionsSkeleton />}

        {isMineIdea && (
          <div style={{ marginTop: '2rem' }}>
            <CreateFeatureForm ideaId={data.idea.id} />
          </div>
        )}
        {authLoading && <CreateFeatureFormSkeleton />}
        <Typography component="h2" variant="h5">
          Features
        </Typography>
        <FeatureList id={data.idea.id} />
      </Paper>
    </div>
  );
}

export default Idea;
