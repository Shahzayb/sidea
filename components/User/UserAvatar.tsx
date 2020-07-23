import React from 'react';
import Link from '../Link';
import { Avatar, Typography } from '@material-ui/core';
import { User } from '../../graphql/client/types';
import StopPropagation from '../../hoc/StopPropagation';

interface Props {
  user: Pick<User, 'id' | 'username' | 'avatar'>;
}

function UserAvatar({ user }: Props) {
  return (
    <StopPropagation>
      <Link
        href="/user/[userId]"
        as={`/user/${user.id}`}
        color="inherit"
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Avatar
          style={{ marginRight: '0.5rem' }}
          alt={user.username}
          src={user.avatar}
        />
        <Typography id="username" component="span" variant="subtitle2">
          {user.username}
        </Typography>
      </Link>
    </StopPropagation>
  );
}

export default UserAvatar;
