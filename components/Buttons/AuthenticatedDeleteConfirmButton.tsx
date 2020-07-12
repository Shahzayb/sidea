import React from 'react';
import {
  Button,
  ButtonProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
  fade,
} from '@material-ui/core';
import { useAuth } from '../../context/auth-context';
import LoginModal from '../LoginModal';
import ResponsiveButton from './ResponsiveButton';

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: theme.palette.error.main,
    border: `1px solid ${fade(theme.palette.error.main, 0.23)}`,
    '&:hover': {
      backgroundColor: fade(theme.palette.error.main, 0.04),
    },
  },
}));

type Action = 'cancel' | 'ok';

interface Props {
  dialog: {
    title: {
      id: string;
      text: string;
    };
    description: {
      id: string;
      text: string;
    };
  };
  successHandler: () => void;
}

function AuthenticatedDeleteConfirmButton({
  dialog,
  successHandler,
  ...props
}: ButtonProps & Props) {
  const classes = useStyles();
  const { authenticated } = useAuth();
  const [action, setAction] = React.useState<Action>('cancel');
  const [isLoginOpen, setLoginOpen] = React.useState(false);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (authenticated) {
      setLoginOpen(false);
    }
  }, [authenticated]);

  const handleDialogClose = (action: Action) => async () => {
    setAction('cancel');
    setDialogOpen(false);
    if (action === 'ok') {
      successHandler();
    }
  };

  const clickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!authenticated) {
      setLoginOpen(true);
    } else if (action === 'cancel') {
      setDialogOpen(true);
    }
  };

  return (
    <>
      <Button {...props} onClick={clickHandler} />
      <LoginModal open={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose('cancel')}
        aria-labelledby={dialog.title.id}
        aria-describedby={dialog.description.id}
      >
        <DialogTitle id={dialog.title.id}>{dialog.title.text}</DialogTitle>
        <DialogContent>
          <DialogContentText id={dialog.description.id}>
            {dialog.description.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ResponsiveButton
            onClick={handleDialogClose('cancel')}
            variant="outlined"
          >
            Cancel
          </ResponsiveButton>
          <ResponsiveButton
            onClick={handleDialogClose('ok')}
            className={classes.deleteButton}
            variant="outlined"
            autoFocus
          >
            Delete
          </ResponsiveButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AuthenticatedDeleteConfirmButton;
