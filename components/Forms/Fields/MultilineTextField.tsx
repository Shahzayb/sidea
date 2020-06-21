import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

interface Props {
  disableEnterKey: boolean;
}

const disableEnterKeyHandler = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

function MultilineTextEditor({
  disableEnterKey,
  ...props
}: TextFieldProps & Props) {
  const [pasted, setPasted] = React.useState(false);

  return (
    <TextField
      {...props}
      multiline
      inputProps={{
        ...props.inputProps,
        style: {
          ...props.inputProps?.style,
          paddingRight: '3.5rem',
        },
      }}
      FormHelperTextProps={{
        ...props.FormHelperTextProps,
        style: {
          ...props.FormHelperTextProps?.style,
          position: 'absolute',
          right: 0,
          bottom: 0,
        },
      }}
      onKeyDown={disableEnterKey ? disableEnterKeyHandler : undefined}
      onChange={(e) => {
        if (pasted) {
          e.target.value = e.target.value.replace(/(\r\n|\n|\r)/gm, ' ');
          setPasted(false);
        }
        props.onChange && props.onChange(e);
      }}
      onPaste={(...rest) => {
        setPasted(true);
        props.onPaste && props.onPaste(...rest);
      }}
    />
  );
}

export default MultilineTextEditor;
