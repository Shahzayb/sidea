import React from 'react';
import { Search as SearchIcon, Cancel as CancelIcon } from '@material-ui/icons';
import {
  makeStyles,
  IconButton,
  Paper,
  Box,
  ClickAwayListener,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import AutocompleteUserSearch from './AutocompleteUserSearch';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  smallSearchContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    height: '100%',
    width: '100%',
    background: theme.palette.background.paper,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

function NavbarAutocompleteUserSearch() {
  const classes = useStyles();
  const [smallSearchActive, setSmallSearchActive] = React.useState(false);
  const [largeSearchActive, setLargeSearchActive] = React.useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {!smallSearchActive && isSmallScreen && (
        <IconButton
          onClick={() => {
            setSmallSearchActive(true);
          }}
          size="small"
        >
          <SearchIcon fontSize="large" />
        </IconButton>
      )}
      {smallSearchActive && isSmallScreen && (
        <ClickAwayListener
          onClickAway={() => {
            setSmallSearchActive(false);
          }}
        >
          <div className={classes.smallSearchContainer}>
            <Box flex={1} mr={2}>
              <Paper elevation={1}>
                <AutocompleteUserSearch />
              </Paper>
            </Box>
            <IconButton
              onClick={() => {
                setSmallSearchActive(false);
              }}
              size="small"
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </div>
        </ClickAwayListener>
      )}
      {!isSmallScreen && (
        <ClickAwayListener
          onClickAway={() => {
            setLargeSearchActive(false);
          }}
        >
          <div
            onClick={() => {
              setLargeSearchActive(true);
            }}
            style={{
              width: largeSearchActive ? 400 : 300,
              transition: theme.transitions.create('width'),
              background: largeSearchActive
                ? theme.palette.background.paper
                : undefined,
              borderRadius: largeSearchActive
                ? theme.shape.borderRadius
                : undefined,
            }}
          >
            <AutocompleteUserSearch />
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default NavbarAutocompleteUserSearch;
