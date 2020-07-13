import React from 'react';
import { Tooltip } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import AuthenticatedIconButton from '../../Buttons/AuthenticatedIconButton';

interface Props {
  onClick: () => void;
  disabled: boolean;
}

function EditFeature({ onClick, disabled }: Props) {
  return (
    <Tooltip placement="bottom" title="Edit feature" aria-label="Edit feature">
      <AuthenticatedIconButton
        onClick={onClick}
        disabled={disabled}
        size="small"
        aria-label="edit"
      >
        <EditIcon />
      </AuthenticatedIconButton>
    </Tooltip>
  );
}

export default EditFeature;
