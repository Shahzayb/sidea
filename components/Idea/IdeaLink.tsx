import React from 'react';
import {
  Paper,
  Typography,
  makeStyles,
  Button,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { format as timeago_format } from 'timeago.js';
import { Idea, User } from '../../graphql/client/types';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import number from '../../utils/number';
import Link from '../Link';
import UserAvatar from '../User/UserAvatar';
import DeleteIdea from './IdeaActions/DeleteIdea';
import ToggleLike from './IdeaActions/ToggleLike';
import ToggleSave from './IdeaActions/ToggleSave';
import Share from './IdeaActions/Share';
import useMarginRightChild from '../../hooks/useMarginRightChild';
import { useAuth } from '../../context/auth-context';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import IdeaActionsSkeleton from '../Skeletons/IdeaActionsSkeleton';
import clsx from 'clsx';
import StopPropagation from '../../hoc/StopPropagation';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    position: 'relative',
    transition: theme.transitions.create('border', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
      cursor: 'pointer',
    },
  },
  backdrop: {
    position: 'absolute',
    zIndex: 999,
    borderRadius: theme.shape.borderRadius,
  },
}));

interface Props {
  idea: Pick<
    Idea,
    'id' | 'title' | 'createdAt' | 'likesCount' | 'isLikedByMe' | 'isSavedByMe'
  > & {
    user: Pick<User, 'id' | 'username' | 'avatar'>;
  };
}

function IdeaLink({ idea }: Props) {
  const classes = useStyles();
  const gutterClx = useGutterAllChild({ spacing: 2 });
  const mrChildClx = useMarginRightChild();
  const [deleting, setDeleting] = React.useState(false);
  const { user: authUser, loading: authLoading, authenticated } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const isMineIdea = idea.user.id === authUser?.id && authenticated;

  return (
    <Paper
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'A') {
          router.push('/idea/[ideaId]', `/idea/${idea.id}`);
        }
      }}
      className={clsx(gutterClx.gutterAllChild, classes.card)}
    >
      {deleting && (
        <Backdrop
          open
          classes={{
            root: classes.backdrop,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <UserAvatar user={idea.user} />
        <Typography variant="caption" color="textSecondary">
          {timeago_format(idea.createdAt)}
        </Typography>
      </div>

      <Typography component="h1" variant="h5">
        {idea.title}
      </Typography>
      <Typography noWrap component="div" color="textPrimary" variant="overline">
        {number.format(idea.likesCount)} likes
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
          <StopPropagation>
            <ToggleLike idea={idea} />
          </StopPropagation>

          <StopPropagation>
            <ToggleSave idea={idea} />
          </StopPropagation>

          <StopPropagation>
            <Share />
          </StopPropagation>

          {isMineIdea && (
            <StopPropagation>
              <DeleteIdea
                id={idea.id}
                onLoading={() => setDeleting(true)}
                onSuccess={async () => {
                  setDeleting(false);
                }}
                onError={() => {
                  setDeleting(false);
                  enqueueSnackbar('Failed to delete idea.');
                }}
              />
            </StopPropagation>
          )}

          {isMineIdea && (
            <StopPropagation>
              <Link
                underline="none"
                href="/idea/[ideaId]/edit"
                as={`/idea/${idea.id}/edit`}
              >
                <Button size="small" startIcon={<EditIcon />}>
                  edit
                </Button>
              </Link>
            </StopPropagation>
          )}
        </div>
      )}
      {authLoading && <IdeaActionsSkeleton />}
    </Paper>
  );
}

export default IdeaLink;
