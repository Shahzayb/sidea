import React from 'react';
import ReactQuill from 'react-quill';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  errorBorder: {
    border: `1px solid ${theme.palette.error.main}`,
  },
}));

const formats = [
  'bold',
  'code',
  'italic',
  'link',
  'script',
  'blockquote',
  'header',
  'indent',
  'list',
  'align',
  'code-block',
  'image',
  'video',
];

const modules = {
  toolbar: [
    { header: [1, 2, 3, false] },
    'bold',
    'italic',
    'blockquote',
    { align: [] },
    { script: 'super' },
    { list: 'ordered' },
    { list: 'bullet' },
    'code-block',
    'code',
    'link',
    'image',
    'video',
  ],
};

interface Props {
  onChange: (html: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder: string;
}

function RichTextEditor({ onChange, onBlur, error, placeholder }: Props) {
  const classes = useStyles();
  return (
    <div id="quill_editor">
      <ReactQuill
        className={clsx({
          [classes.errorBorder]: !!error,
        })}
        theme={'snow'}
        formats={formats}
        modules={modules}
        onChange={(value, delta, source, editor) => {
          onChange(value);
        }}
        onBlur={onBlur}
        bounds="#quill_editor"
        placeholder={placeholder}
      />
      {/* {error && <Typography color="textSecondary">{error}</Typography>} */}
    </div>
  );
}

export default RichTextEditor;
