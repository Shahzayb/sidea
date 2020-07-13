import React from 'react';
import { Button, CircularProgress, Box } from '@material-ui/core';

import {
  CreateFeatureInput,
  useCreateIdeaMutation,
  GetUserIdeasDocument,
  GetNewIdeasDocument,
} from '../../graphql/client/types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TagsInput from './Fields/TagsInput';
import MultiFeaturesInput from './Fields/MultiFeaturesInput';
import RichTextEditor from './Fields/RichTextEditor';
import MultilineTextField from './Fields/MultilineTextField';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';
import Link from '../Link';
import useMarginRightChild from '../../hooks/useMarginRightChild';
import ResponsiveButton from '../Buttons/ResponsiveButton';
import { useAuth } from '../../context/auth-context';
import { clientPageQueryLimit } from '../../client-env';

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
  const gutterClx = useGutterAllChild({ spacing: 3 });
  const marginClx = useMarginRightChild();
  const { user } = useAuth();
  const [createIdeaMutation, { loading, error }] = useCreateIdeaMutation({
    refetchQueries: [
      {
        query: GetUserIdeasDocument,
        variables: {
          id: user!.id,
          limit: clientPageQueryLimit,
        },
      },
      {
        query: GetNewIdeasDocument,
        variables: {
          limit: clientPageQueryLimit,
        },
      },
    ],
  });
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
        .then(({ data, errors }) => {
          if (data) {
            router.push('/idea/[ideaId]', `/idea/${data.createIdea.id}`);
          } else {
            return Promise.reject({ graphQLErrors: errors });
          }
        })
        .catch((err) => {
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

        <MultiFeaturesInput
          onChange={(value: CreateFeatureInput[]) => {
            formik.setFieldValue('features', value);
          }}
          value={formik.values.features}
          errors={formik.errors.features}
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
            Post{' '}
            {formik.isSubmitting && (
              <CircularProgress size={16} style={{ marginLeft: '10px' }} />
            )}
          </ResponsiveButton>
        </Box>
      </form>
    </div>
  );
}

export default CreateIdeaForm;
