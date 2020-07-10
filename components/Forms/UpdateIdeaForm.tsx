import React from 'react';
import { Button, CircularProgress, Box } from '@material-ui/core';

import { useUpdateIdeaMutation, Idea } from '../../graphql/client/types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TagsInput from './Fields/TagsInput';
import RichTextEditor from './Fields/RichTextEditor';
import MultilineTextField from './Fields/MultilineTextField';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';
import Link from '../Link';
import useMarginRightChild from '../../hooks/useMarginRightChild';
import ResponsiveButton from '../ResponsiveButton';

type Errors = {
  param: keyof Pick<Idea, 'title' | 'body' | 'tags'>;
  msg: string;
}[];

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
});

interface Props {
  idea: Pick<Idea, 'id' | 'title' | 'body' | 'tags'>;
}

function UpdateIdeaForm({ idea }: Props) {
  const gutterClx = useGutterAllChild({ spacing: 3 });
  const marginClx = useMarginRightChild();

  const [updateIdeaMutation, { loading, error }] = useUpdateIdeaMutation();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: idea.title,
      body: idea.body,
      tags: idea.tags,
    },
    validationSchema,
    onSubmit: (values, formik) => {
      updateIdeaMutation({
        variables: {
          input: {
            id: idea.id,
            ...values,
          },
        },
      })
        .then(({ data, errors }) => {
          if (data) {
            router.push('/idea/[ideaId]', `/idea/${data.updateIdea.id}`);
          } else {
            return Promise.reject({ graphQLErrors: errors });
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
    <div className={gutterClx.gutterAllChild}>
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
      <form
        onSubmit={formik.handleSubmit}
        action=""
        noValidate
        autoComplete="off"
        className={gutterClx.gutterAllChild}
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
          value={formik.values.body}
          placeholder="Text"
        />
        <TagsInput
          value={formik.values.tags}
          onChange={(tags: string[]) => {
            formik.setFieldValue('tags', tags);
          }}
          errors={formik.errors.tags}
        />

        <Box
          display="flex"
          justifyContent="flex-end"
          className={marginClx.root}
        >
          <Link underline="none" href="/">
            <ResponsiveButton
              variant="outlined"
              color="primary"
              disabled={formik.isSubmitting}
            >
              Cancel
            </ResponsiveButton>
          </Link>
          <ResponsiveButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Update
            {formik.isSubmitting && (
              <CircularProgress size={16} style={{ marginLeft: '10px' }} />
            )}
          </ResponsiveButton>
        </Box>
      </form>
    </div>
  );
}

export default UpdateIdeaForm;
