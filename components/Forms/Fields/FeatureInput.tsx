import React from 'react';
import * as yup from 'yup';
import { Add } from '@material-ui/icons';
import { useFormik } from 'formik';
import MultilineTextField from './MultilineTextField';
import SquareIconButton from '../../SquareIconButton';

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
    validateOnMount: true,
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
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
        helperText={`${formik.values.feature.length}/300`}
      />
      <SquareIconButton
        size="small"
        color="secondary"
        title="add feature"
        onClick={() => formik.handleSubmit()}
        disabled={!formik.isValid || formik.isSubmitting}
      >
        <Add />
      </SquareIconButton>
    </div>
  );
}

export default FeatureInput;
