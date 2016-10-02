// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import { AuthConfiguration } from '../app/shared/';

export const environment = Object.assign({
  production: false,
  apiUrl: 'http://localhost:5000'
}, {
  clientID: '1oy397EXD8DWvaJlhonAwRiBTgP9sXrD',
  domain: 'blazejewicz.eu.auth0.com'
} as AuthConfiguration);
