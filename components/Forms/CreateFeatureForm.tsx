import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import MultilineTextField from './Fields/MultilineTextField';
import { Button, CircularProgress, Box } from '@material-ui/core';
import { useCreateFeatureMutation } from '../../graphql/client/types';

const initialValues = {
  feature: '',
};

const validationSchema = yup.object().shape({
  feature: yup
    .string()
    .trim()
    .required('required')
    .max(300, 'feature is too long'),
});

interface Props {
  ideaId: string;
}

function CreateFeatureForm({ ideaId }: Props) {
  const [createFeatureMutation] = useCreateFeatureMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formik) => {
      createFeatureMutation({
        variables: {
          input: {
            ideaId,
            title: values.feature,
          },
        },
      });
    },
    validateOnMount: true,
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      action=""
      noValidate
      autoComplete="off"
    >
      <MultilineTextField
        style={{ flex: 1, marginRight: 10 }}
        {...formik.getFieldProps('feature')}
        placeholder="Enter feature"
        variant="outlined"
        spellCheck="false"
        margin="none"
        size="small"
        inputProps={{
          maxLength: 300,
        }}
        disableEnterKey
        fullWidth
        helperText={`${formik.values.feature.length}/300`}
      />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          type="submit"
          variant="outlined"
          size="small"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Submit
          {formik.isSubmitting && (
            <CircularProgress size={16} style={{ marginLeft: '10px' }} />
          )}
        </Button>
      </Box>
    </form>
  );
}

export default CreateFeatureForm;
