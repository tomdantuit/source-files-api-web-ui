// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  githubAuthorizationUrl: '/login', // for testing locally
  userAuthUrl: '/user',
  loginUrl: '/login',
  authorizationRedirectUrl: '/profile',
  GET_API_KEYS_URL: '/apiKey',
  ADD_API_URL: '/apiKey',
  DELETE_API_URL: '/apiKey',
  DELETE_ACCOUNT_URL: '/user',
  MAX_ALLOWED_API_KEYS: 5
};
