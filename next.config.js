const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    APOLLO_CLIENT_URI: (() => {
      if (isDev) return 'http://localhost:3000/api/graphql';
      if (isProd) {
        return 'https://www.siliconvalley-codecamp.com/rest/speakers/ps';
      }
      return '';
    })(),
    CLIENT_PAGE_QUERY_LIMIT: (() => {
      if (isDev) return '10';
      if (isProd) return '10';
      return '';
    })(),
  };

  // next.config.js object
  return {
    env,
  };
};
