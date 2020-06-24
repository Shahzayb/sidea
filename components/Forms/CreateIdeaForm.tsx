import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

import {
  CreateFeatureInput,
  useCreateIdeaMutation,
} from '../../graphql/client/types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TagsInput from './Fields/TagsInput';
import MultiFeatureInput from './Fields/MultiFeatureInput';
import RichTextEditor from './Fields/RichTextEditor';
import MultilineTextField from './Fields/MultilineTextField';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';

const initialValues = {
  title: '',
  body: '',
  tags: [] as string[],
  features: [] as CreateFeatureInput[],
};

type Errors = { param: keyof typeof initialValues; msg: string }[];

const validationSchema = yup.object().shape({
  title: yup.string().trim().required('required').max(300, 'title is too long'),
  body: yup
    .string()
    .trim()
    .test('body', '', function (value) {
      const { path, createError } = this;
      const parser = new DOMParser();

      const { textContent } = parser.parseFromString(
        value,
        'text/html'
      ).documentElement;

      const empty = !textContent?.trim();

      return !empty || createError({ path, message: 'empty' });
    })
    .required('required'),
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
  const classes = useGutterAllChild({ spacing: 3 });
  const [createIdeaMutation, { loading, error }] = useCreateIdeaMutation();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formik) => {
      createIdeaMutation({
        variables: {
          input: values,
        },
      })
        .then(({ data }) => {
          if (data) {
            router.push('/idea/[ideaId]', `/idea/${data.createIdea.id}`);
          }
        })
        .catch((err) => {
          console.dir(err);
          if (err.graphQLErrors[0]) {
            const errors: Errors = err.graphQLErrors[0]?.extensions?.errors;
            errors.forEach(({ param, msg }) => {
              formik.setFieldError(param, msg);
            });
          }
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    },
  });

  return (
    <div className={classes.gutterAllChild}>
      <div>
        {!loading && error?.networkError && (
          <Alert
            action={
              <Button
                onClick={() => {
                  formik.submitForm();
                }}
                color="inherit"
                size="small"
              >
                retry
              </Button>
            }
            severity="error"
          >
            Ooops! Something went wrong.
          </Alert>
        )}
      </div>
      <form
        onSubmit={formik.handleSubmit}
        action=""
        noValidate
        autoComplete="off"
        className={classes.gutterAllChild}
      >
        <MultilineTextField
          {...formik.getFieldProps('title')}
          placeholder="Title"
          variant="outlined"
          spellCheck="false"
          margin="none"
          size="small"
          fullWidth
          inputProps={{
            maxLength: 300,
          }}
          disableEnterKey
          error={formik.touched.title && !!formik.errors.title}
          helperText={`${formik.values.title.length}/300`}
        />
        <RichTextEditor
          onChange={(html: string) => {
            formik.setFieldValue('body', html);
          }}
          onBlur={() => {
            formik.setFieldTouched('body', true);
          }}
          error={formik.touched.body ? formik.errors.body : undefined}
          placeholder="Text"
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
