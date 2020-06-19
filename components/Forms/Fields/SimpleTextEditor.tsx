import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

function SimpleTextEditor(props: TextFieldProps) {
  return (
    <TextField
      placeholder="title"
      variant="outlined"
      spellCheck="true"
      {...props}
      margin="dense"
      multiline
      inputProps={{
        maxLength: 300,
      }}
    />
  );
}

export default SimpleTextEditor;
