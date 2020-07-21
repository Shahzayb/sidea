import validator from 'validator';

const env = {
  APOLLO_CLIENT_URI: process.env.APOLLO_CLIENT_URI,

  CLIENT_PAGE_QUERY_LIMIT: process.env.CLIENT_PAGE_QUERY_LIMIT,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_ONLY_API_KEY: process.env.ALGOLIA_SEARCH_ONLY_API_KEY,
};

if (!env.APOLLO_CLIENT_URI) {
  throw new Error('env.APOLLO_CLIENT_URI is required');
}

if (!env.CLIENT_PAGE_QUERY_LIMIT) {
  throw new Error('env.CLIENT_PAGE_QUERY_LIMIT is required');
}

if (!env.ALGOLIA_APP_ID) {
  throw new Error('env.ALGOLIA_APP_ID is required');
}

if (!env.ALGOLIA_SEARCH_ONLY_API_KEY) {
  throw new Error('env.ALGOLIA_SEARCH_ONLY_API_KEY is required');
}

if (
  !validator.isURL(env.APOLLO_CLIENT_URI, {
    protocols: ['http', 'https'],
    require_tld: false,
  })
) {
  throw new Error('env.APOLLO_CLIENT_URI is not a valid url');
}

if (
  !validator.isInt(env.CLIENT_PAGE_QUERY_LIMIT, {
    allow_leading_zeroes: true,
    min: 1,
  })
) {
  throw new Error('env.CLIENT_PAGE_QUERY_LIMIT is not a positive number');
}

export const apolloClientUri = env.APOLLO_CLIENT_URI;

export const clientPageQueryLimit = validator.toInt(
  env.CLIENT_PAGE_QUERY_LIMIT
);

export const algoliaAppId = env.ALGOLIA_APP_ID;

export const algoliaSearchOnlyApiKey = env.ALGOLIA_SEARCH_ONLY_API_KEY;
