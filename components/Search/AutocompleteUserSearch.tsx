import React from 'react';

import { connectAutoComplete, Configure } from 'react-instantsearch-dom';
import { AutocompleteProvided, BasicDoc, Hit } from 'react-instantsearch-core';

import {
  TextField,
  Avatar,
  Typography,
  Box,
  InputAdornment,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { User } from '../../graphql/client/types';
import Link from '../Link';
import { Autocomplete } from '@material-ui/lab';
import { useRouter } from 'next/router';
import withInstantSearch from '../../hoc/withInstantSearch';
import { clientPageQueryLimit } from '../../client-env';

type HitType = Pick<User, 'id' | 'name' | 'username' | 'avatar'> & BasicDoc;

function isUserHit(toBeDetermined: any): toBeDetermined is Hit<HitType> {
  const hit = toBeDetermined as Hit<HitType>;
  if (hit.id && hit.objectID) {
    return true;
  }
  return false;
}

function AutocompleteUserSearch({
  currentRefinement,
  hits,
  refine,
}: AutocompleteProvided<HitType>) {
  const router = useRouter();
  return (
    <>
      <Configure hitsPerPage={clientPageQueryLimit} />
      <Autocomplete
        id="autocomplete-user-search"
        style={{ width: 300 }}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.username
        }
        filterOptions={(x) => x}
        options={hits}
        freeSolo
        noOptionsText="Users not found"
        autoComplete
        includeInputInList
        filterSelectedOptions
        // value={value}
        onChange={(event, newValue, reason) => {
          if (newValue) {
            if (
              reason === 'create-option' &&
              typeof newValue === 'string' &&
              newValue.trim()
            ) {
              router.push({
                pathname: `/search`,
                query: {
                  q: newValue.trim().toLowerCase(),
                },
              });
              newValue;
            } else if (reason === 'select-option' && isUserHit(newValue)) {
              router.push('/user/[userId]', `/user/${newValue.id}`);
            }
          }
        }}
        inputValue={currentRefinement}
        onInputChange={(event, newInputValue) => {
          refine(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
            placeholder="Search"
            variant="outlined"
            fullWidth
          />
        )}
        // You can use the `getOptionSelected` prop to customize the equality test.
        renderOption={(option) => {
          return (
            <Link
              color="inherit"
              underline="none"
              href="/user/[userId]"
              as={`/user/${option.id}`}
              style={{ width: '100%', height: '100%' }}
            >
              <Box display="flex" alignItems="center">
                <Box mr={1}>
                  <Avatar src={option.avatar} alt={option.name} />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography component="h1" variant="h6">
                    {option.name}
                  </Typography>
                  <Typography component="h2">{option.username}</Typography>
                </Box>
              </Box>
            </Link>
          );
        }}
      />
    </>
  );
}

export default withInstantSearch(
  connectAutoComplete(AutocompleteUserSearch),
  'users'
);
