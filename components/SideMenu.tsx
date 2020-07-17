import React from 'react';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  NewReleases as NewIcon,
  TrendingUp as TopIcon,
  Save as SaveIcon,
  Favorite as FavoriteIcon,
} from '@material-ui/icons';
import IdeaIcon from './Icons/Idea';

import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles,
  Box,
  Typography,
  ListSubheader,
} from '@material-ui/core';
import Link from './Link';
import { useAuth } from '../context/auth-context';
import ResponsiveButton from './Buttons/ResponsiveButton';
import Logo from './Icons/Logo';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function SideMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <React.Fragment>
      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box p={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Box mr={2}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </Box>
            <Link
              style={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              underline="none"
              href="/"
            >
              <Box display="flex" alignItems="center" mr={1}>
                <Logo fontSize="large" color="primary" />
              </Box>
              <Typography variant="h5">Sidea</Typography>
            </Link>
          </Box>
          <Divider />
          <List component="nav">
            <ListItem
              button
              component={Link}
              color="inherit"
              underline="none"
              href="/"
              selected={router.pathname === '/'}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={Link}
              color="inherit"
              underline="none"
              href="/new"
              selected={router.pathname === '/new'}
            >
              <ListItemIcon>
                <NewIcon />
              </ListItemIcon>
              <ListItemText primary="New Ideas" />
            </ListItem>
            <ListItem
              button
              component={Link}
              color="inherit"
              underline="none"
              href="/top"
              selected={router.pathname === '/top'}
            >
              <ListItemIcon>
                <TopIcon />
              </ListItemIcon>
              <ListItemText primary="Top Ideas" />
            </ListItem>
          </List>
          <Divider />
          <List
            component="nav"
            aria-labelledby="account-menu-list-subheader"
            subheader={
              <ListSubheader component="div" id="account-menu-list-subheader">
                My Account
              </ListSubheader>
            }
          >
            {user && (
              <>
                <ListItem
                  button
                  component={Link}
                  color="inherit"
                  underline="none"
                  href="/user/[userId]/ideas"
                  as={`/user/${user.id}/ideas`}
                  selected={router.pathname === '/user/[userId]/ideas'}
                >
                  <ListItemIcon>
                    <IdeaIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Ideas" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  color="inherit"
                  underline="none"
                  href="/user/[userId]/ideas/saved"
                  as={`/user/${user.id}/ideas/saved`}
                  selected={router.pathname === '/user/[userId]/ideas/saved'}
                >
                  <ListItemIcon>
                    <SaveIcon />
                  </ListItemIcon>
                  <ListItemText primary="Saved Ideas" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  color="inherit"
                  underline="none"
                  href="/user/[userId]/ideas/likes"
                  as={`/user/${user.id}/ideas/likes`}
                  selected={router.pathname === '/user/[userId]/ideas/likes'}
                >
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Liked Ideas" />
                </ListItem>
              </>
            )}
            {!user && (
              <Box p={2}>
                <Typography>
                  Login to see your own ideas, likes, and saved ideas.
                </Typography>
                <Box mt={1}>
                  <Link underline="none" href={'/login'}>
                    <ResponsiveButton color="primary" variant="outlined">
                      Login
                    </ResponsiveButton>
                  </Link>
                </Box>
              </Box>
            )}
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
