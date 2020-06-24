import React from 'react';
import {
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from '@material-ui/core';

import ResponsiveButton from './ResponsiveButton';
import Link from './Link';
import { useAuth } from '../context/auth-context';
import { Skeleton } from '@material-ui/lab';
import { useToggleTheme } from '../context/theme-toggle-context';
import IdeaAdd from './Icons/IdeaAdd';

const useStyles = makeStyles((theme) => ({
  nav: {
    display: 'flex',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  [theme.breakpoints.up('sm')]: {
    nav: {
      '& > *:not(:last-child)': {
        marginRight: theme.spacing(2),
      },
    },
  },
}));

function HideOnScroll(props: { children: any }) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const classes = useStyles();
  const { loading, authenticated, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { mode, toggle } = useToggleTheme();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HideOnScroll>
      <AppBar color="default" variant="outlined">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link color="inherit" href="/">
            <Typography variant="h5">Sidea</Typography>
          </Link>

          {loading && (
            <nav className={classes.nav}>
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="circle" width={40} height={40} />
            </nav>
          )}

          {!loading && !authenticated && (
            <nav className={classes.nav}>
              <Link underline="none" href={'/login'}>
                <ResponsiveButton color="default">Sign in</ResponsiveButton>
              </Link>
              <Link underline="none" href={'/signup'}>
                <ResponsiveButton color="default" variant="outlined">
                  Sign up
                </ResponsiveButton>
              </Link>
            </nav>
          )}
          {!loading && user && (
            <nav className={classes.nav}>
              <Link underline="none" href="/idea/create">
                <IconButton size="small">
                  <IdeaAdd color="primary" fontSize="large" />
                </IconButton>
              </Link>
              <div>
                <IconButton
                  size="small"
                  aria-label="account of current user"
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar alt={user.name} src={user.avatar} />
                </IconButton>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem>
                    Dark Mode:{' '}
                    <Switch
                      checked={mode === 'dark'}
                      onChange={() => toggle()}
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            </nav>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;
