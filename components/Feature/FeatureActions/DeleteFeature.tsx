import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

interface Props {
  id: string;
  disabled?: boolean;
  onError?: () => void;
  onSuccess?: () => void;
  onLoading?: () => void;
}

function DeleteFeature({ id, disabled }: Props) {
  return (
    <Tooltip
      placement="bottom"
      title="Delete feature"
      aria-label="Delete feature"
    >
      <IconButton disabled={disabled} size="small" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteFeature;
