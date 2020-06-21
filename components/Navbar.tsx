import React from 'react';
import {
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Typography,
  Link,
} from '@material-ui/core';
import NextLink from 'next/link';

import ButtonLink from '../components/ButtonLink';

// const useStyles = makeStyles((theme) => ({}));

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
  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <NextLink href="/">
            <Link color="inherit">
              <Typography variant="h5">Sidea</Typography>
            </Link>
          </NextLink>

          <nav>
            <ButtonLink href="/login">Login</ButtonLink>
            <ButtonLink href="/signup">Sign Up</ButtonLink>
          </nav>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;
