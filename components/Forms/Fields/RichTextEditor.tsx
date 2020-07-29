import React from 'react';
import ReactQuill from 'react-quill';
import { makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';

interface StyleProps {
  focus: boolean;
  error: boolean;
}

const useStyles = makeStyles((theme) => ({
  editor: {
    '& .quill': {
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
      padding: (props: StyleProps) => (props.focus ? 0 : 1),
      borderWidth: (props: StyleProps) => (!props.focus ? 1 : 2),
      borderColor: (props: StyleProps) => {
        if (props.error) {
          return theme.palette.error.main;
        } else if (props.focus) {
          return theme.palette.primary.main;
        }
        return theme.palette.action.disabled;
      },
      '&:hover': {
        borderColor: (props: StyleProps) => {
          if (props.error) {
            return theme.palette.error.main;
          } else if (props.focus) {
            return theme.palette.primary.main;
          }
          return theme.palette.text.primary;
        },
      },

      '& .ql-toolbar': {
        border: 'none',
        font: 'inherit',
        color: 'inherit',
        background: theme.palette.background.default,
        '& .ql-formats': {},
      },
      '& .ql-container': {
        border: 'none',
        font: 'inherit',
        color: 'inherit',
        '& .ql-editor': {
          fontSize: 16,
          '&.ql-blank::before': {
            color: theme.palette.text.disabled,
            fontStyle: 'normal',
          },
        },
      },
    },
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
  value: string;
}

function RichTextEditor({
  onChange,
  onBlur,
  error,
  placeholder,
  value,
}: Props) {
  const [focus, setFocus] = React.useState(false);
  const classes = useStyles({ focus, error: !!error });
  const theme = useTheme();

  return (
    <div className={classes.editor} id="quill_editor">
      <ReactQuill
        onFocus={() => {
          setFocus(true);
        }}
        value={value}
        theme={'snow'}
        formats={formats}
        modules={modules}
        onChange={(value, delta, source, editor) => {
          onChange(value);
        }}
        onBlur={() => {
          setFocus(false);
          onBlur && onBlur();
        }}
        bounds="#quill_editor"
        placeholder={placeholder}
      />
      {/* {error && <Typography color="textSecondary">{error}</Typography>} */}
      <style global jsx>{`
        .ql-snow.ql-toolbar button:hover,
        .ql-snow .ql-toolbar button:hover,
        .ql-snow.ql-toolbar button:focus,
        .ql-snow .ql-toolbar button:focus,
        .ql-snow.ql-toolbar button.ql-active,
        .ql-snow .ql-toolbar button.ql-active,
        .ql-snow.ql-toolbar .ql-picker-label:hover,
        .ql-snow .ql-toolbar .ql-picker-label:hover,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active,
        .ql-snow.ql-toolbar .ql-picker-item:hover,
        .ql-snow .ql-toolbar .ql-picker-item:hover,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
          color: ${theme.palette.primary.main};
        }
        .ql-snow.ql-toolbar button:hover .ql-fill,
        .ql-snow .ql-toolbar button:hover .ql-fill,
        .ql-snow.ql-toolbar button:focus .ql-fill,
        .ql-snow .ql-toolbar button:focus .ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-fill,
        .ql-snow .ql-toolbar button.ql-active .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
        .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
          fill: ${theme.palette.primary.main};
        }
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow .ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button:focus .ql-stroke,
        .ql-snow .ql-toolbar button:focus .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .ql-snow .ql-toolbar button.ql-active .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
        .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
        .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
        .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
        .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
        .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
        .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
        .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
        .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
        .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
          stroke: ${theme.palette.primary.main};
        }

        @media (pointer: coarse) {
          .ql-snow.ql-toolbar button:hover:not(.ql-active),
          .ql-snow .ql-toolbar button:hover:not(.ql-active) {
            color: ${theme.palette.text.secondary};
          }
          .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,
          .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,
          .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,
          .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {
            fill: ${theme.palette.text.secondary};
          }
          .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,
          .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,
          .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,
          .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {
            stroke: ${theme.palette.text.secondary};
          }
        }

        .ql-snow .ql-editor code,
        .ql-snow .ql-editor pre {
          background-color: ${theme.palette.background.default};
        }
        .ql-snow a {
          color: #0066cc;
        }

        .ql-snow .ql-picker {
          color: ${theme.palette.text.secondary};
        }
        .ql-snow .ql-picker-options {
          background-color: ${theme.palette.background.default};
        }
        .ql-snow .ql-picker.ql-expanded .ql-picker-label {
          color: ${theme.palette.text.secondary};
        }
        .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
          fill: ${theme.palette.text.secondary};
        }
        .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
          stroke: ${theme.palette.text.secondary};
        }

        .ql-snow .ql-stroke {
          stroke: ${theme.palette.text.secondary};
        }
        .ql-snow .ql-stroke-miter {
          stroke: ${theme.palette.text.secondary};
        }
        .ql-snow .ql-fill,
        .ql-snow .ql-stroke.ql-fill {
          fill: ${theme.palette.text.secondary};
        }
      `}</style>
    </div>
  );
}

export default RichTextEditor;
