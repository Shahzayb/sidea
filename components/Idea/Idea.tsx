import React from 'react';
import Head from 'next/head';
import { Paper, Typography, Button, Chip, Box } from '@material-ui/core';
import {
  List as ListIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
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

interface Props {
  id: string;
}

function Idea({ id }: Props) {
  const classes = useGutterAllChild({ spacing: 2 });
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

  return (
    <>
      <Head>
        <title>
          {data.idea.title} : {data.idea.user.username}
        </title>
      </Head>
      <Paper className={classes.gutterAllChild} style={{ padding: '1rem' }}>
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button size="small" startIcon={<ListIcon />}>
              12 Features
            </Button>
            <ToggleLike idea={data.idea} />
            <ToggleSave idea={data.idea} />

            <Share />

            <Button size="small" startIcon={<DeleteIcon />}>
              delete
            </Button>
            <Link
              underline="none"
              href="/idea/[ideaId]/edit"
              as={`/idea/${data.idea.id}/edit`}
            >
              <Button size="small" startIcon={<EditIcon />}>
                edit
              </Button>
            </Link>
          </div>
          <Typography component="span" variant="overline">
            {number.format(data.idea.likesCount)} likes
          </Typography>
        </Box>
        <div style={{ marginTop: '2rem' }}>
          <CreateFeatureForm />
        </div>
      </Paper>
    </>
  );
}

export default Idea;
