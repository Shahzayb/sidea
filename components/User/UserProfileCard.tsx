import React from 'react';
import { User } from '../../graphql/client/types';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardActions,
  CardContent,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import Link from '../Link';
import validator from 'validator';
import { useAuth } from '../../context/auth-context';

interface Props {
  user: Pick<User, 'id' | 'name' | 'username' | 'avatar' | 'createdAt'>;
}

function UserProfileCard({ user }: Props) {
  const { user: authUser } = useAuth();
  const date = React.useMemo(() => {
    const _date = new Date(validator.toInt(user.createdAt));

    return _date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }, [user.createdAt]);

  const isMineProfile = user.id === authUser?.id;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt={user.name} src={user.avatar} />}
        title={user.name}
        subheader={user.username}
        action={
          isMineProfile && (
            <IconButton aria-label="settings">
              <SettingsIcon />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Typography
          style={{ display: 'flex', alignItems: 'center' }}
          component="div"
          color="textSecondary"
          variant="body2"
        >
          <Box display="flex" alignItems="center" mr={1}>
            <CalendarTodayIcon />
          </Box>
          Joined, {date}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isMineProfile && (
          <Link style={{ width: '100%' }} naked href="/idea/create">
            <Button size="small" fullWidth color="primary" variant="contained">
              New Idea
            </Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
}

export default UserProfileCard;
