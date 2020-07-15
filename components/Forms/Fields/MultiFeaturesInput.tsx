import React from 'react';
import { CreateFeatureInput } from '../../../graphql/client/types';
import MultilineTextField from './MultilineTextField';
import SquareIconButton from '../../Buttons/SquareIconButton';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  makeStyles,
  Box,
  FormHelperText,
  Tooltip,
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { FormikErrors } from 'formik';
import clsx from 'clsx';
import ErrorTooltip from '../../ErrorTooltip';

const useStyles = makeStyles((theme) => ({
  blood: {
    backgroundColor: theme.palette.error.main,
  },
  listError: {
    border: `1px solid ${theme.palette.error.main}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

interface Props {
  onChange: (value: CreateFeatureInput[]) => void;
  value: CreateFeatureInput[];
  errors: string | string[] | FormikErrors<CreateFeatureInput>[] | undefined;
}

function ListInput({ onChange, value, errors }: Props) {
  const classes = useStyles();
  const [feature, setFeature] = React.useState('');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MultilineTextField
          style={{ flex: 1, marginRight: 10 }}
          placeholder="Enter feature"
          variant="outlined"
          spellCheck="false"
          margin="none"
          size="small"
          inputProps={{
            maxLength: 300,
          }}
          disableEnterKey
          value={feature}
          onChange={(e) => {
            setFeature(e.target.value);
          }}
          helperText={`${feature.length}/300`}
        />
        <Tooltip
          title="add feature"
          placement="bottom"
          aria-label="add feature"
        >
          <SquareIconButton
            size="small"
            color="secondary"
            onClick={() => {
              const findIndex = value.findIndex(
                (feat) => feat.title === feature
              );
              if (findIndex === -1 && feature) {
                onChange([...value, { title: feature }]);
              }
              setFeature('');
            }}
          >
            <AddIcon />
          </SquareIconButton>
        </Tooltip>
      </div>

      {!!value.length && (
        <Box mt={2}>
          <List
            className={clsx({
              [classes.listError]: typeof errors === 'string',
            })}
          >
            {value.map((feat, index) => {
              let isValid = true;
              let error: string = '';
              if (Array.isArray(errors) && errors[index]) {
                const curError = errors[index];
                if (typeof curError === 'string') {
                  error = curError;
                  isValid = false;
                } else if (curError.title) {
                  error = curError.title;
                  isValid = false;
                }
              }
              const _item = (
                <ListItem
                  className={clsx({
                    [classes.blood]: !isValid,
                  })}
                  divider
                  key={feat.title}
                >
                  <ListItemText
                    primary={<Typography>{feat.title}</Typography>}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip
                      title="remove feature"
                      placement="bottom"
                      aria-label="remove feature"
                    >
                      <IconButton
                        onClick={() => {
                          const _value = value.filter(
                            (_, _index) => _index !== index
                          );
                          onChange(_value);
                        }}
                        size="small"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              );

              if (!isValid) {
                return (
                  <ErrorTooltip
                    key={index}
                    arrow
                    open
                    interactive
                    title={error}
                  >
                    {_item}
                  </ErrorTooltip>
                );
              }
              return _item;
            })}
          </List>
        </Box>
      )}
      {typeof errors === 'string' && (
        <Box mx={2}>
          <FormHelperText error>{errors}</FormHelperText>
        </Box>
      )}
    </div>
  );
}

export default ListInput;
