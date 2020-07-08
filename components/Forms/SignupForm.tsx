import React from 'react';
import { useFormik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import Link from '../Link';
import { Alert } from '@material-ui/lab';
import { useSignUpMutation } from '../../graphql/client/types';
import { useAuth } from '../../context/auth-context';
import useGutterAllChild from '../../hooks/useGutterAllChild';

const initialValues = {
  name: '',
  username: '',
  email: '',
  password: '',
};

type Errors = { param: keyof typeof initialValues; msg: string }[];

// check max lengths
const validationSchema = yupObject().shape({
  name: yupString().trim().required('required').max(255, 'name is too long'),
  username: yupString()
    .trim()
    .required('required')
    .max(255, 'username is too long'),
  email: yupString().trim().required('required').email('invalid email'),
  password: yupString()
    .required('required')
    .min(8, 'must be 8 characters or more'),
});

function SignupForm() {
  const classes = useGutterAllChild({ spacing: 3 });
  const { login } = useAuth();

  const [signupMutation, { loading, error }] = useSignUpMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnMount: true,
    onSubmit: (values, formik) => {
      signupMutation({
        variables: {
          input: values,
        },
      })
        .then(({ data, errors }) => {
          if (data) {
            login(data.signup.token);
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
    <>
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
        <TextField
          variant="outlined"
          fullWidth
          label="Full Name"
          size="small"
          required
          {...formik.getFieldProps('name')}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          variant="outlined"
          fullWidth
          label="Username"
          size="small"
          required
          {...formik.getFieldProps('username')}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
        />

        <TextField
          variant="outlined"
          fullWidth
          label="Email Address"
          size="small"
          required
          {...formik.getFieldProps('email')}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          variant="outlined"
          fullWidth
          label="Password"
          type="password"
          size="small"
          required
          {...formik.getFieldProps('password')}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
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
          Create account{' '}
          {formik.isSubmitting && (
            <CircularProgress size={16} style={{ marginLeft: '10px' }} />
          )}
        </Button>

        <Link variant="body2" href="/login">
          Already have an account? Sign in
        </Link>
      </form>
    </>
  );
}

export default SignupForm;
