import React from 'react';
import { Share as ShareIcon } from '@material-ui/icons';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useSnackbar } from 'notistack';

function Share() {
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        size="small"
        aria-label="share idea"
        aria-controls="idea-share-menu"
        aria-haspopup="true"
        onClick={handleMenu}
        startIcon={<ShareIcon />}
      >
        share
      </Button>
      <Menu
        id="idea-share-menu"
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
        <MenuItem
          onClick={() => {
            if (typeof window !== 'undefined') {
              navigator.clipboard.writeText(window.location.href).then(() => {
                enqueueSnackbar('Link copied to clipbard');
              });
            }
            handleClose();
          }}
        >
          Copy Link
        </MenuItem>
      </Menu>
    </>
  );
}

export default Share;
