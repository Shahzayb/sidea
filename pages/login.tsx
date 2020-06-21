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
  Paper,
  makeStyles,
} from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { Alert } from '@material-ui/lab';
import Copyright from '../components/Copyright';
import { useLoginMutation } from '../graphql/client/types';
import { useAuth } from '../context/auth-context';
import Link from '../components/Link';

const initialValues = {
  username: '',
  password: '',
};

// check max lengths
const validationSchema = yupObject().shape({
  username: yupString().trim().required('required'),
  password: yupString().required('required'),
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
    <Container style={{ marginTop: '4rem' }} component="main" maxWidth="xs">
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
            <Typography component="div" variant="h5">
              Sidea
            </Typography>
          </Link>
        </div>
        <Typography align="center" component="h1" variant="h5">
          Welcome back, login to continue
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
            Login{' '}
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

        <Box mt={5}>
          <Copyright />
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
