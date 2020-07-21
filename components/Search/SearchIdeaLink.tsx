import React from 'react';

import { Paper, Typography, makeStyles } from '@material-ui/core';
import { format as timeago_format } from 'timeago.js';
import { useGetUserByIdQuery } from '../../graphql/client/types';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import UserAvatar from '../User/UserAvatar';
import UserAvatarSkeleton from '../Skeletons/UserAvatarSkeleton';
import { IdeaHit } from './IdeaHitType';
import { Highlight } from 'react-instantsearch-dom';
import CustomHighlight from './CustomHighlight';
import CustomTagsHighlight from './CustomTagsHighlight';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    transition: theme.transitions.create('border', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
      cursor: 'pointer',
    },
  },
}));

interface Props {
  idea: IdeaHit;
}

function SearchIdeaLink({ idea }: Props) {
  const classes = useStyles();
  const gutterClx = useGutterAllChild({ spacing: 2 });
  const router = useRouter();

  const userQuery = useGetUserByIdQuery({
    variables: {
      id: idea.userId,
    },
  });

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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {userQuery.data && userQuery.data.user && (
          <UserAvatar user={userQuery.data.user} />
        )}
        {(!userQuery.data || !userQuery.data.user) && <UserAvatarSkeleton />}
        <Typography variant="caption" color="textSecondary">
          {timeago_format(idea.createdAt)}
        </Typography>
      </div>

      <Typography component="h1" variant="h5">
        <Highlight tagName="mark" attribute="title" hit={idea} />
      </Typography>

      <Typography component="div" variant="body1">
        <CustomHighlight attribute="body" hit={idea} />
      </Typography>

      <CustomTagsHighlight attribute="" hit={idea} />
    </Paper>
  );
}

export default SearchIdeaLink;
