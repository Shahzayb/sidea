import React from 'react';
import { Paper, Avatar, Typography, makeStyles } from '@material-ui/core';
import { format as timeago_format } from 'timeago.js';
import { Idea, User } from '../../graphql/client/types';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import Link from '../Link';

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
  innerLink: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    '&:hover ~ #username': {
      textDecoration: 'underline',
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
        href="idea/[ideaId]"
        as={`idea/${idea.id}`}
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Link
              href="user/[userId]"
              as={`user/${idea.user.id}`}
              naked
              className={classes.innerLink}
            />
            <Avatar
              style={{ marginRight: '0.5rem' }}
              alt={idea.user.username}
              src={idea.user.avatar}
            />
            <Typography id="username" component="span" variant="subtitle2">
              {idea.user.username}
            </Typography>
          </div>
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
