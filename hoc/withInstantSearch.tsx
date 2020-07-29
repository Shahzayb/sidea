import React from 'react';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import { algoliaAppId, algoliaSearchOnlyApiKey } from '../client-env';

const algoliaClient = algoliasearch(algoliaAppId, algoliaSearchOnlyApiKey);

const searchClient = {
  search(requests: any[]) {
    if (requests.every(({ params }) => !params.query || !params.query.trim())) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

function withInstantSearch<P extends {} = {}>(
  Component: React.FC<P> | React.ComponentClass<P>,
  index: 'users' | 'ideas'
) {
  return (props: P) => {
    return (
      <InstantSearch searchClient={searchClient} indexName={index}>
        <Component {...props} />
      </InstantSearch>
    );
  };
}

export default withInstantSearch;
