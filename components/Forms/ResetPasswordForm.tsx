import React from 'react';
import * as yup from 'yup';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import { useResetPasswordMutation } from '../../graphql/client/types';
import { useFormik } from 'formik';
import { Alert } from '@material-ui/lab';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import { useAuth } from '../../context/auth-context';

const initialValues = {
  newPassword: '',
};

type Errors = { param: 'newPassword' | 'userId' | 'token'; msg: string }[];

// check max lengths
const validationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('required')
    .min(8, 'must be 8 characters or more'),
});

interface Props {
  userId: string;
  token: string;
}

export default function ResetPasswordForm({ userId, token }: Props) {
  const [isInvalidData, setIsInvalidData] = React.useState(false);
  const classes = useGutterAllChild({ spacing: 3 });
  const { login } = useAuth();
  const [
    resetPasswordMutation,
    { loading, error, data },
  ] = useResetPasswordMutation({
    onCompleted(data) {
      formik.setSubmitting(false);
      login(data.resetPassword.token);
    },
    onError(error) {
      if (error.graphQLErrors[0]) {
        const errors: Errors | null | undefined =
          error.graphQLErrors[0]?.extensions?.errors;
        if (errors) {
          errors.forEach(({ param, msg }) => {
            if (param === 'newPassword') {
              formik.setFieldError(param, msg);
            } else {
              setIsInvalidData(true);
            }
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
      setIsInvalidData(false);
      resetPasswordMutation({
        variables: {
          input: {
            ...values,
            userId,
            token,
          },
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
        {!loading && isInvalidData && (
          <Alert severity="error">This link is invalid!</Alert>
        )}
        {!loading && data && (
          <Alert severity="success">Yay! Your password is changed.</Alert>
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
          label="Password"
          type="password"
          size="small"
          {...formik.getFieldProps('newPassword')}
          error={formik.touched.newPassword && !!formik.errors.newPassword}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
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
          Change Password
          {formik.isSubmitting && (
            <CircularProgress size={16} style={{ marginLeft: '10px' }} />
          )}
        </Button>
      </form>
    </div>
  );
}
