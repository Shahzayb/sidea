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
  Tooltip,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  ListItemIcon,
  Hidden,
} from '@material-ui/core';

import ResponsiveButton from './Buttons/ResponsiveButton';
import Link from './Link';
import { useAuth } from '../context/auth-context';
import { Skeleton } from '@material-ui/lab';
import { useToggleTheme } from '../context/theme-toggle-context';
import IdeaAdd from './Icons/IdeaAdd';
import PersonIcon from '@material-ui/icons/Person';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { ThemeMode } from '../graphql/client/types';
import SideMenu from './SideMenu';
import Logo from './Icons/Logo';
import AutocompleteUserSearch from './Search/AutocompleteUserSearch';
import NavbarAutocompleteUserSearch from './Search/NavbarAutocompleteUserSearch';

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
  const { loading, authenticated, user, logout } = useAuth();
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
      <AppBar color="inherit" variant="outlined">
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Box mr={2}>
              <SideMenu />
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
              <Hidden xsDown>
                <Typography variant="h5" noWrap>
                  Sidea
                </Typography>
              </Hidden>
            </Link>
          </div>

          {loading && (
            <nav className={classes.nav}>
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="circle" width={40} height={40} />
            </nav>
          )}

          {!loading && !authenticated && (
            <nav className={classes.nav}>
              {/* <AutocompleteUserSearch /> */}
              <NavbarAutocompleteUserSearch />
              <Link underline="none" href={'/login'}>
                <ResponsiveButton color="primary" variant="outlined">
                  Login
                </ResponsiveButton>
              </Link>
              <Link underline="none" href={'/signup'}>
                <ResponsiveButton color="primary" variant="contained">
                  Sign up
                </ResponsiveButton>
              </Link>
            </nav>
          )}
          {!loading && user && (
            <nav className={classes.nav}>
              {/* <AutocompleteUserSearch /> */}
              <NavbarAutocompleteUserSearch />
              <Tooltip
                placement="bottom"
                title="Create Idea"
                aria-label="create idea"
              >
                <Link underline="none" href="/idea/create">
                  <IconButton size="small">
                    <IdeaAdd fontSize="large" />
                  </IconButton>
                </Link>
              </Tooltip>
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
                  <MenuItem disabled divider style={{ opacity: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Box mr={2}>
                        <Avatar alt={user.name} src={user.avatar} />
                      </Box>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          {user.name}
                        </Typography>
                        <Typography variant="body1">{user.username}</Typography>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    color="inherit"
                    underline="none"
                    href="/user/[userId]"
                    as={`/user/${user.id}`}
                    onClick={handleClose}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <MenuItem button={false}>
                    <ListItemIcon>
                      <SettingsBrightnessIcon />
                    </ListItemIcon>
                    <ListItemText
                      style={{ marginRight: '2.5rem' }}
                      primary="Dark Mode"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={mode === ThemeMode.Dark}
                        onChange={() => toggle()}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </ListItemSecondaryAction>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
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
