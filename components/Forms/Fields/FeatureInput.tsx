import React from 'react';
import * as yup from 'yup';
import { TextField, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useFormik } from 'formik';

interface Props {
  onChange: (value: string) => void;
}

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

function FeatureInput({ onChange }: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formik) => {
      onChange(values.feature);
      formik.setSubmitting(false);
      formik.resetForm();
    },
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        style={{ flex: 1, marginRight: 10 }}
        {...formik.getFieldProps('feature')}
        placeholder="Enter feature"
        variant="outlined"
        spellCheck="false"
        margin="none"
        size="small"
        multiline
        fullWidth
        inputProps={{
          maxLength: 300,
          style: {
            paddingRight: '3.5rem',
          },
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        FormHelperTextProps={{
          style: {
            position: 'absolute',
            right: 0,
            bottom: 0,
          },
        }}
        helperText={`${formik.values.feature.length}/300`}
      />
      <IconButton
        size="small"
        color="secondary"
        title="add feature"
        onClick={() => formik.handleSubmit()}
        disabled={!formik.isValid || formik.isSubmitting}
      >
        <Add />
      </IconButton>
    </div>
  );
}

export default FeatureInput;
