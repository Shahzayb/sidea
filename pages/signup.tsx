import React from 'react';
import { useFormik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Copyright from '../components/Copyright';
import { useSignUpMutation } from '../graphql/client/types';
import { useAuth } from '../context/auth-context';

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

function Signup() {
  const { login } = useAuth();

  const [signupMutation, { loading, error }] = useSignUpMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formik) => {
      signupMutation({
        variables: {
          input: values,
        },
      })
        .then(({ data }) => {
          if (data) {
            login(data.signup.token);
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
    <Container component="main" maxWidth="xs">
      {/* show network error here */}
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

      <Typography component="h1" variant="h4">
        Sign up
      </Typography>

      <form
        onSubmit={formik.handleSubmit}
        action=""
        noValidate
        autoComplete="off"
      >
        <TextField
          variant="outlined"
          fullWidth
          label="Full Name"
          {...formik.getFieldProps('name')}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          variant="outlined"
          fullWidth
          label="Username"
          {...formik.getFieldProps('username')}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
        />

        <TextField
          variant="outlined"
          fullWidth
          label="Email Address"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          variant="outlined"
          fullWidth
          label="Password"
          type="password"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
          fullWidth
        >
          Sign Up{' '}
          {formik.isSubmitting && (
            <CircularProgress size={16} style={{ marginLeft: '10px' }} />
          )}
        </Button>

        <Link variant="body2" href="/login">
          Already have an account? Sign in
        </Link>
      </form>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Signup;
