import React from 'react';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';
import { TextField, Chip, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import ErrorTooltip from '../../ErrorTooltip';

interface CustonInputProps {
  onKeyDown?: (event: object) => void;
}

interface CustomAutocompleteRenderInputParams
  extends AutocompleteRenderInputParams {
  inputProps: CustonInputProps;
}

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
  errors?: string | string[];
}

const useStyles = makeStyles((theme) => ({
  muiChipOutlinePrimaryError: {
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
  },
  muiChipDeleteIconOutlinedColorPrimary: {
    color: theme.palette.error.light,
    '&:hover': {
      color: theme.palette.error.main,
    },
    '&:active': {
      color: theme.palette.error.main,
    },
  },
}));

function TagsInput({ value: tags, onChange: setTags, errors }: Props) {
  const classes = useStyles();

  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case ',':
      case ' ': {
        event.preventDefault();
        event.stopPropagation();
        if (
          event.target.value.length > 0 &&
          !tags.includes(event.target.value)
        ) {
          setTags([...tags, event.target.value as string]);
        }
        break;
      }
      default:
    }
  };
  return (
    <Autocomplete
      renderInput={(params: CustomAutocompleteRenderInputParams) => {
        params.inputProps.onKeyDown = handleKeyDown;
        return (
          <TextField
            {...params}
            placeholder="Enter tags here"
            variant="outlined"
            error={!!errors}
            helperText={typeof errors === 'string' ? errors : undefined}
          />
        );
      }}
      options={[]}
      open={false}
      multiple
      freeSolo
      size="small"
      value={tags}
      filterSelectedOptions
      onChange={(event, value: string[], reason) => {
        setTags(value);
      }}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => {
          let isValid = true;
          let error = '';
          if (Array.isArray(errors) && errors[index]) {
            isValid = false;
            error = errors[index];
          }
          const chip = (
            <Chip
              variant="outlined"
              color="primary"
              label={option}
              size="small"
              classes={{
                outlinedPrimary: clsx({
                  [classes.muiChipOutlinePrimaryError]: !isValid,
                }),
                deleteIconOutlinedColorPrimary: clsx({
                  [classes.muiChipDeleteIconOutlinedColorPrimary]: !isValid,
                }),
              }}
              {...getTagProps({ index })}
            />
          );
          if (!isValid) {
            return (
              <ErrorTooltip key={index} arrow interactive title={error}>
                {chip}
              </ErrorTooltip>
            );
          }
          return chip;
        })
      }
    />
  );
}

export default TagsInput;
