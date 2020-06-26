import React from 'react';
import Head from 'next/head';
import {
  Paper,
  Avatar,
  Typography,
  Button,
  Chip,
  Box,
} from '@material-ui/core';
import {
  List as ListIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  PlaylistAdd as SaveIcon,
  PlaylistAddCheck as UnsaveIcon,
  Edit as EditIcon,
  Share as ShareIcon,
} from '@material-ui/icons';
import { format as timeago_format } from 'timeago.js';
import CreateFeatureForm from './Forms/CreateFeatureForm';
import { useGetIdeaByIdQuery } from '../graphql/client/types';
import IdeaSkeleton from './Skeletons/IdeaSkeleton';
import useGutterAllChild from '../hooks/useGutterAllChild';
import Error from './Errors/Error';

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
      <Error
        errorType="network"
        retry={() => {
          if (refetch) {
            refetch().catch(console.log);
          }
        }}
      />
    );
  }

  if (!data || !data.idea) {
    return (
      <Error
        errorType="no-content"
        retry={() => {
          if (refetch) {
            refetch().catch(console.log);
          }
        }}
      />
    );
  }

  return (
    <>
      <Head>
        <title>
          {data.idea.title} : {data.idea.user.username}
        </title>
      </Head>
      <Paper
        className={classes.gutterAllChild}
        elevation={0}
        style={{ padding: '1rem' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              style={{ marginRight: '0.5rem' }}
              alt={data.idea.user.username}
              src={data.idea.user.avatar}
            />
            <Typography component="span" variant="subtitle2">
              {data.idea.user.username}
            </Typography>
          </div>
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: '2rem',
          }}
        >
          <Button size="small" startIcon={<ListIcon />}>
            12 Features
          </Button>
          <Button size="small" startIcon={<FavoriteIcon />}>
            12 Likes
          </Button>
          <Button size="small" startIcon={<SaveIcon />}>
            save
          </Button>

          <Button size="small" startIcon={<ShareIcon />}>
            share
          </Button>

          <Button size="small" startIcon={<DeleteIcon />}>
            delete
          </Button>
          <Button size="small" startIcon={<EditIcon />}>
            edit
          </Button>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <CreateFeatureForm />
        </div>
      </Paper>
    </>
  );
}

export default Idea;
