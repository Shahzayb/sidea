import React from 'react';
import * as yup from 'yup';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { useForgotPasswordMutation } from '../../graphql/client/types';
import { useFormik } from 'formik';
import { Alert } from '@material-ui/lab';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import Link from '../Link';

const initialValues = {
  email: '',
};

type Errors = { param: keyof typeof initialValues; msg: string }[];

// check max lengths
const validationSchema = yup.object().shape({
  email: yup.string().trim().required('required').email('invalid email'),
});

export default function ForgotPasswordForm() {
  const classes = useGutterAllChild({ spacing: 3 });
  const [
    forgotPasswordMutation,
    { loading, error, data },
  ] = useForgotPasswordMutation({
    onCompleted(data) {
      formik.setSubmitting(false);
    },
    onError(error) {
      if (error.graphQLErrors[0]) {
        const errors: Errors | null | undefined =
          error.graphQLErrors[0]?.extensions?.errors;
        if (errors) {
          errors.forEach(({ param, msg }) => {
            formik.setFieldError(param, msg);
          });
        }
      }
      formik.setSubmitting(false);
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      forgotPasswordMutation({
        variables: {
          input: values,
        },
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
        {!loading && data && (
          <Alert
            action={
              <Button
                onClick={() => {
                  formik.submitForm();
                }}
                color="inherit"
                size="small"
              >
                resend
              </Button>
            }
            severity="success"
          >
            Yay! Password reset link is sent successfully. Please check your
            email.
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
        <TextField
          variant="outlined"
          fullWidth
          label="Email Address"
          size="small"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            formik.isSubmitting || !formik.isValid || formik.isValidating
          }
          fullWidth
        >
          Submit
          {formik.isSubmitting && (
            <CircularProgress size={16} style={{ marginLeft: '10px' }} />
          )}
        </Button>

        <Link variant="body2" href="/login">
          Remembered the password? Sign in.
        </Link>
      </form>
    </div>
  );
}
