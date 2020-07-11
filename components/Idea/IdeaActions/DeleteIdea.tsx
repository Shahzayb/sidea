import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
  fade,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useDeleteIdeaMutation } from '../../../graphql/client/types';
import ResponsiveButton from '../../ResponsiveButton';

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: theme.palette.error.main,
    border: `1px solid ${fade(theme.palette.error.main, 0.23)}`,
    '&:hover': {
      backgroundColor: fade(theme.palette.error.main, 0.04),
    },
  },
}));

interface Props {
  id: string;
  onError?: () => void;
  onSuccess?: () => void;
  onLoading?: () => void;
}

type Action = 'cancel' | 'delete';

function DeleteIdea({ id, onError, onSuccess, onLoading }: Props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState<Action>('cancel');

  const [deleteIdeaMutation, { loading, client }] = useDeleteIdeaMutation({
    variables: {
      id,
    },
    onError(error) {
      onError && onError();
    },
    onCompleted(data) {
      onSuccess && onSuccess();
    },
    async update(proxy, result) {
      if (client) {
        try {
          await client.resetStore();
        } catch {}
      }
    },
  });

  const handleClose = (action: Action) => async () => {
    setAction(action);
    setOpen(false);
    if (!loading && action === 'delete') {
      onLoading && onLoading();
      try {
        await deleteIdeaMutation();
      } catch {}
    }
  };

  return (
    <>
      <Button
        onClick={async () => {
          if (!open || action === 'cancel') {
            setOpen(true);
          }
        }}
        size="small"
        startIcon={<DeleteIcon />}
      >
        delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-confirm-dialog-title"
        aria-describedby="delete-confirm-dialog-description"
      >
        <DialogTitle id="delete-confirm-dialog-title">
          Delete this idea?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-confirm-dialog-description">
            After deleting, you won't be able to recover this idea and its
            features.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ResponsiveButton onClick={handleClose('cancel')} variant="outlined">
            Cancel
          </ResponsiveButton>
          <ResponsiveButton
            onClick={handleClose('delete')}
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

export default DeleteIdea;
