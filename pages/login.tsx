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
import { useLoginMutation } from '../graphql/client/types';
import { useAuth } from '../context/auth-context';

const initialValues = {
  username: '',
  password: '',
};

// check max lengths
const validationSchema = yupObject().shape({
  username: yupString().trim().required('required'),
  password: yupString().required('required'),
});

function Signup() {
  const { login } = useAuth();

  const [loginMutation, { loading, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formik) => {
      loginMutation({
        variables: {
          input: values,
        },
      })
        .then(({ data }) => {
          if (data) {
            login(data.login.token);
          }
        })
        .catch((err) => {
          console.dir(err);
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

      {/* show invalid credentails error here */}
      {!loading && error?.graphQLErrors[0] && (
        <Alert severity="error">Invalid username or password.</Alert>
      )}

      <Typography component="h1" variant="h4">
        Login
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
          label="Username or email"
          {...formik.getFieldProps('username')}
        />

        <TextField
          variant="outlined"
          fullWidth
          label="Password"
          type="password"
          {...formik.getFieldProps('password')}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting || !formik.isValid}
          fullWidth
        >
          Login{' '}
          {formik.isSubmitting && (
            <CircularProgress size={16} style={{ marginLeft: '10px' }} />
          )}
        </Button>

        <Link variant="body2" href="/signup">
          Don't have an account? Sign Up.
        </Link>
      </form>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Signup;
