import { AuthConfiguration } from '../app/shared/';

export const environment = Object.assign({
  production: true,
  apiUrl: 'http://locahost:5000'
}, {
  clientID: '1oy397EXD8DWvaJlhonAwRiBTgP9sXrD',
  domain: 'blazejewicz.eu.auth0.com'
} as AuthConfiguration);
