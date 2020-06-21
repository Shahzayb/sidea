import React from 'react';
import * as yup from 'yup';
import { CreateFeatureInput } from '../../../graphql/client/types';
import FeatureInput from './FeatureInput';
import { useFormik } from 'formik';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const initialValues = {
  features: [] as CreateFeatureInput[],
};

const validationSchema = yup.object().shape({
  features: yup
    .array()
    .of(
      yup.object().shape({
        title: yup
          .string()
          .trim()
          .required('required')
          .max(300, 'feature title is too long'),
      })
    )
    .default([]),
});

interface Props {
  onChange: (values: CreateFeatureInput[]) => void;
}

function MultiFeatureInput({ onChange }: Props) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values, formik) {
      onChange(values.features);
      formik.setSubmitting(false);
    },
  });

  return (
    <div>
      <FeatureInput
        onChange={(val) => {
          const findIndex = formik.values.features.findIndex(
            (feat) => feat.title === val
          );
          if (findIndex === -1) {
            const values = [...formik.values.features, { title: val }];
            formik.setFieldValue('features', values);
            formik.submitForm();
          }
        }}
      />
      <List>
        {formik.values.features.map((feat, index) => (
          <ListItem className={classes.paper} divider key={feat.title}>
            <ListItemText primary={<Typography>{feat.title}</Typography>} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  const values = formik.values.features.filter(
                    (_, _index) => _index !== index
                  );
                  formik.setFieldValue('features', values);
                  formik.submitForm();
                }}
                size="small"
                aria-label="delete"
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MultiFeatureInput;
