import { from } from 'env-var';

import validator from 'validator';

const env = from(process.env, {
  asEmail: (value): string => {
    const isEmail = validator.isEmail(value);
    const email = validator.normalizeEmail(value);

    if (!isEmail && !email) {
      throw new Error('Invalid email address');
    }

    return email as string;
  },
});

export const nodeEnv = env.get('NODE_ENV').required().asString();

export const jwtSecret = env.get('JWT_SECRET').required().asString();

export const sendGridApiKey = env.get('SENDGRID_API_KEY').required().asString();

export const companyName = env.get('COMPANY_NAME').required().asString();
export const companyEmail = env.get('COMPANY_EMAIL').required().asEmail();

const _clientBaseUrl = env
  .get('CLIENT_BASE_URL')
  .required(nodeEnv === 'development')
  .asUrlString();

const _vercelUrl = env
  .get('VERCEL_URL')
  .required(nodeEnv === 'production')
  .asUrlString();

export const clientBaseUrl = _clientBaseUrl || _vercelUrl;

export const algoliaAppId = env.get('ALGOLIA_APP_ID').required().asString();
export const algoliaAdminApiKey = env
  .get('ALGOLIA_ADMIN_API_KEY')
  .required()
  .asString();
