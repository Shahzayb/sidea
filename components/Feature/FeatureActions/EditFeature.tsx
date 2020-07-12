import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

function EditFeature() {
  return (
    <Tooltip placement="bottom" title="Edit feature" aria-label="Edit feature">
      <IconButton size="small" aria-label="edit">
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
}

export default EditFeature;
