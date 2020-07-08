import React from 'react';
import { Paper, Avatar, Typography, makeStyles } from '@material-ui/core';
import { format as timeago_format } from 'timeago.js';
import { Idea, User } from '../../graphql/client/types';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import Link from '../Link';
import UserAvatar from '../User/UserAvatar';

const useStyles = makeStyles((theme) => ({
  outerLink: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    '& + #card': {
      padding: theme.spacing(1),
      transition: theme.transitions.create('border', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeIn,
      }),
    },
    '&:hover + #card': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

interface Props {
  idea: Pick<Idea, 'id' | 'title' | 'createdAt'> & {
    user: Pick<User, 'id' | 'username' | 'avatar'>;
  };
}

function IdeaLink({ idea }: Props) {
  const gutterClx = useGutterAllChild({ spacing: 2 });
  const classes = useStyles();
  return (
    <div style={{ position: 'relative' }}>
      <Link
        href="/idea/[ideaId]"
        as={`/idea/${idea.id}`}
        naked
        className={classes.outerLink}
      />
      <Paper className={gutterClx.gutterAllChild} id="card">
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
      </Paper>
    </div>
  );
}

export default IdeaLink;
