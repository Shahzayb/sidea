import React from 'react';
import Link from '../Link';
import { Avatar, Typography, makeStyles } from '@material-ui/core';
import { User } from '../../graphql/client/types';

const useStyles = makeStyles((theme) => ({
  link: {
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
  user: Pick<User, 'id' | 'username' | 'avatar'>;
}

function UserAvatar({ user }: Props) {
  const classes = useStyles();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Link
        href="/user/[userId]"
        as={`/user/${user.id}`}
        naked
        className={classes.link}
      />
      <Avatar
        style={{ marginRight: '0.5rem' }}
        alt={user.username}
        src={user.avatar}
      />
      <Typography id="username" component="span" variant="subtitle2">
        {user.username}
      </Typography>
    </div>
  );
}

export default UserAvatar;
