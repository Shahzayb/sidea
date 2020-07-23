import { format as url_format } from 'url';
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

export const isDevEnv = nodeEnv === 'development';
export const isProdEnv = nodeEnv === 'production';

export const jwtSecret = env.get('JWT_SECRET').required().asString();

export const sendGridApiKey = env.get('SENDGRID_API_KEY').required().asString();

export const companyName = env.get('COMPANY_NAME').required().asString();
export const companyEmail = env.get('COMPANY_EMAIL').required().asEmail();

const _vercelUrl = url_format({
  protocol: 'https',
  pathname: env.get('VERCEL_URL').required(isProdEnv).asString(),
});

if (isProdEnv && !validator.isURL(_vercelUrl)) {
  throw new Error('VERCEL_URL is not valid');
}

const _clientBaseUrl = env
  .get('CLIENT_BASE_URL')
  .required(isDevEnv)
  .asUrlString();

export const clientBaseUrl = _clientBaseUrl || _vercelUrl;

export const algoliaAppId = env.get('ALGOLIA_APP_ID').required().asString();
export const algoliaAdminApiKey = env
  .get('ALGOLIA_ADMIN_API_KEY')
  .required()
  .asString();
