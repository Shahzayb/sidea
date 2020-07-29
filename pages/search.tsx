import React from 'react';
import withInstantSearch from '../hoc/withInstantSearch';
import { connectSearchBox, Configure } from 'react-instantsearch-dom';
import withNavbar from '../hoc/withNavbar';
import withFooter from '../hoc/withFooter';
import withLayout from '../hoc/withLayout';
import InfiniteIdeaHits from '../components/Search/InfiniteIdeaHits';
import { GetServerSideProps } from 'next';
import { Paper, Typography, Box } from '@material-ui/core';
import useGutterAllChild from '../hooks/useGutterAllChild';
import { clientPageQueryLimit } from '../client-env';
import Head from 'next/head';

const VirtualSearchBox = connectSearchBox(() => null);

interface Props {
  q: string | string[] | undefined;
}

function Index({ q: searchTerm = '' }: Props) {
  const classes = useGutterAllChild({ spacing: 2 });

  if (Array.isArray(searchTerm)) {
    throw new Error('query param "q" is invalid');
  }

  return (
    <>
      <Head>
        <title>Search for "{searchTerm.trim()}" - Sidea</title>
      </Head>

      <div className={classes.gutterAllChild}>
        <Paper>
          <Box p={1}>
            <Box pb={1}>
              <Typography gutterBottom component="h1" variant="h4">
                "{searchTerm.trim()}"
              </Typography>
            </Box>
            <Typography component="h1" variant="body2">
              Search results
            </Typography>
          </Box>
        </Paper>
        <Configure hitsPerPage={clientPageQueryLimit} />

        <VirtualSearchBox defaultRefinement={searchTerm.trim()} />
        <InfiniteIdeaHits />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      q: context.query.q,
    },
  };
};

export default withInstantSearch(
  withLayout(withFooter(withNavbar(Index)), 'md'),
  'ideas'
);
