import React from 'react';
import {
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

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
          <Typography variant="h5">Sidea</Typography>

          <div>
            <ButtonLink href="/login">Login</ButtonLink>
            <ButtonLink href="/signup">Sign Up</ButtonLink>
          </div>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;
