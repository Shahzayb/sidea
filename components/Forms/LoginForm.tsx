import React from 'react';
import { useFormik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useLoginMutation } from '../../graphql/client/types';
import { useAuth } from '../../context/auth-context';
import Link from '../Link';
import useGutterAllChild from '../../hooks/useGutterAllChild';

const initialValues = {
  username: '',
  password: '',
};

// check max lengths
const validationSchema = yupObject().shape({
  username: yupString().trim().required('required'),
  password: yupString().required('required'),
});

function LoginForm() {
  const classes = useGutterAllChild({ spacing: 3 });

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
        .then(({ data, errors }) => {
          if (data) {
            login(data.login.token);
          } else {
            return Promise.reject({ graphQLErrors: errors });
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

        {/* show invalid credentails error here */}
        {!loading && error?.graphQLErrors[0] && (
          <Alert severity="error">Invalid username or password.</Alert>
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
          size="small"
          label="Username or email"
          {...formik.getFieldProps('username')}
        />
        <div>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            label="Password"
            type="password"
            {...formik.getFieldProps('password')}
          />
          <Typography
            // style={{ paddingTop: '5px' }}
            align="right"
            component="div"
          >
            <Link underline="none" href="/password/forgot" variant="caption">
              Forgot password?
            </Link>
          </Typography>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={formik.isSubmitting || !formik.isValid}
          fullWidth
        >
          Sign in{' '}
          {formik.isSubmitting && (
            <CircularProgress
              color="secondary"
              size={16}
              style={{ marginLeft: '10px' }}
            />
          )}
        </Button>

        <Link href="/signup" variant="body2">
          Don't have an account? Sign Up.
        </Link>
      </form>
    </>
  );
}

export default LoginForm;
