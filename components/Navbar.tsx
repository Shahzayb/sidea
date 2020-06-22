import React from 'react';
import {
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';

import ResponsiveButton from './ResponsiveButton';
import Link from './Link';
import { useAuth } from '../context/auth-context';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  marginRightAllChild: {
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
  [theme.breakpoints.up('sm')]: {
    marginRightAllChild: {
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
  const { loading, authenticated } = useAuth();
  return (
    <HideOnScroll>
      <AppBar color="default" variant="outlined">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link color="inherit" href="/">
            <Typography variant="h5">Sidea</Typography>
          </Link>

          {loading && (
            <nav
              style={{ display: 'flex' }}
              className={classes.marginRightAllChild}
            >
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="circle" width={40} height={40} />
            </nav>
          )}

          {!loading && !authenticated && (
            <nav
              style={{ display: 'flex' }}
              className={classes.marginRightAllChild}
            >
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
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;
