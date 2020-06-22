import React from 'react';
import { useFormik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  makeStyles,
  Paper,
} from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'; //temp
import Link from '../components/Link';
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

const useStyles = makeStyles((theme) => ({
  gutterAllChild: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
}));

function Signup() {
  const classes = useStyles();
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
    <Container
      style={{ marginTop: '4rem', marginBottom: '4rem' }}
      component="main"
      maxWidth="sm"
    >
      <Paper className={classes.gutterAllChild} style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            underline="none"
            color="primary"
            href="/"
          >
            {/* temp: use original logo here */}
            <Typography component="div" variant="h3">
              <EmojiObjectsIcon fontSize="inherit" />
            </Typography>
            <Typography component="div" variant="h6">
              Welcome to Sidea
            </Typography>
          </Link>
        </div>
        <Typography align="center" component="h1" variant="h4">
          Create your account
        </Typography>
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
      </Paper>
    </Container>
  );
}

export default Signup;
