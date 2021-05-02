// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

const OKTA_DOMAIN = 'dev-47146441.okta.com';
export const CLIENT_ID = '0oanhz22yECWtKlNp5d6';
const CALLBACK_PATH = '/';

export const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const SCOPES = ['openid', 'profile', 'email', 'offline_access'];

export const AUTH_CONFIG = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  tokenManager: {
    storage: 'localStorage',
  },
};
