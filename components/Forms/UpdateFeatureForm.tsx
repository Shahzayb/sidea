import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import MultilineTextField from './Fields/MultilineTextField';
import { Box, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Feature, useUpdateFeatureMutation } from '../../graphql/client/types';
import { useSnackbar } from 'notistack';
import useIsMounted from '../../hooks/useIsMounted';

const validationSchema = yup.object().shape({
  feature: yup
    .string()
    .trim()
    .required('required')
    .max(300, 'feature is too long'),
});

interface Props {
  feature: Pick<Feature, 'id' | 'title'>;
  onSuccess: () => void;
  onClose: () => void;
}

function UpdateFeatureForm({ feature, onSuccess, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const isMounted = useIsMounted();

  const [updateFeatureMutation] = useUpdateFeatureMutation();

  const formik = useFormik({
    initialValues: {
      feature: feature.title,
    },
    validationSchema,
    onSubmit: (values, formik) => {
      updateFeatureMutation({
        variables: {
          input: {
            id: feature.id,
            title: values.feature,
          },
        },
      })
        .then(({ data, errors }) => {
          if (data) {
            onSuccess();
            enqueueSnackbar('Feature is updated');
            if (isMounted) {
              formik.resetForm();
            }
          } else if (errors) {
            return Promise.reject({ graphQLErrors: errors });
          }
        })
        .catch(() => {
          enqueueSnackbar('Failed to update feature');
        })
        .finally(() => {
          if (isMounted) {
            formik.setSubmitting(false);
          }
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
      style={{ width: '100%' }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <MultilineTextField
          style={{ marginRight: 10 }}
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
          disabled={formik.isSubmitting}
        />
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            <IconButton
              type="submit"
              size="small"
              disabled={formik.isSubmitting}
              onClick={() => {
                onClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <IconButton
            type="submit"
            size="small"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            <CheckIcon />
          </IconButton>
        </Box>
      </Box>
    </form>
  );
}

export default UpdateFeatureForm;
