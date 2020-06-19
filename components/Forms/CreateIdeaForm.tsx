import React from 'react';
import {
  makeStyles,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';

import { CreateFeatureInput } from '../../graphql/client/types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TagsInput from './Fields/TagsInput';
import MultiFeatureInput from './Fields/MultiFeatureInput';
import RichTextEditor from './Fields/RichTextEditor';

const useStyles = makeStyles((theme) => ({
  gutterAllChild: {
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const initialValues = {
  title: '',
  body: '',
  tags: [] as string[],
  features: [] as CreateFeatureInput[],
};

const RE_QUILL_EMPTY = /^<p>(<br>|<br\/>|<br\s\/>|\s+|)<\/p>$/gm;

const validationSchema = yup.object().shape({
  title: yup.string().trim().required('required').max(300, 'title is too long'),
  body: yup
    .string()
    .trim()
    .required('required')
    .test('body', 'required', (value) => {
      return !RE_QUILL_EMPTY.test(value);
    }),
  tags: yup
    .array()
    .of(
      yup
        .string()
        .trim()
        .max(30, 'tag cannot be greater than 30 characters')
        .matches(
          RegExp('^[0-9a-zA-Z-_.]+$'),
          'tags can only contains "letters", "numbers", ".", "-", and "_"'
        )
    )
    .default([])
    .max(30, 'Too much tags. Max limit is 30 tags.'),
  features: yup
    .array()
    .of(
      yup.object().shape({
        title: yup
          .string()
          .trim()
          .required('required')
          .max(300, 'feature title is too long'),
      })
    )
    .default([]),
});

function CreateIdeaForm() {
  const classes = useStyles();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formik) => {
      console.log('values', values);
    },
  });

  // console.dir(formik);

  // formik.errors.features

  // console.log(formik.values);
  // console.log(formik.errors);
  // console.log(formik.touched);

  return (
    <div style={{ margin: '1rem' }}>
      <Typography component="h1" variant="h4">
        Create Idea
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        action=""
        noValidate
        autoComplete="off"
        className={classes.gutterAllChild}
      >
        <TextField
          {...formik.getFieldProps('title')}
          placeholder="title"
          variant="outlined"
          spellCheck="false"
          margin="none"
          size="small"
          multiline
          fullWidth
          inputProps={{
            maxLength: 300,
            style: {
              paddingRight: '3rem',
            },
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onBlur={undefined}
          FormHelperTextProps={{
            style: {
              position: 'absolute',
              right: 0,
              bottom: 0,
            },
          }}
          error={formik.touched.title && !!formik.errors.title}
          helperText={`${formik.values.title.length}/300`}
        />
        <RichTextEditor
          onChange={(html: string) => {
            formik.setFieldValue('body', html);
          }}
          // onBlur={() => {
          //   formik.setFieldTouched('body', true);
          // }}
          error={formik.touched.body ? formik.errors.body : undefined}
        />
        <TagsInput
          value={formik.values.tags}
          onChange={(tags: string[]) => {
            formik.setFieldValue('tags', tags);
          }}
          errors={formik.errors.tags}
        />

        <MultiFeatureInput
          onChange={(features: CreateFeatureInput[]) => {
            formik.setFieldValue('features', features);
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting || !formik.isValid}
          fullWidth
        >
          Post{' '}
          {formik.isSubmitting && (
            <CircularProgress size={16} style={{ marginLeft: '10px' }} />
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateIdeaForm;
