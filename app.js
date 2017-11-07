import { i18n } from './config/config.default';

'use strict';

const { join, isAbsolute } = require('path');
const i18next = require('i18next');
const Backend = require('i18next-sync-fs-backend');
const koaI18next = require('koa-i18next');

module.exports = (app) => {
  i18next
    .use(Backend)
    .init({
      backend: {
        // translation resources
        loadPath: path.resolve(app.baseDir, app.rootDir, 'config', 'locales/{{lng}}/{{ns}}.json'),
        addPath: path.resolve(app.baseDir, app.rootDir, 'config', 'locales/{{lng}}/{{ns}}.missing.json')
      },
      preload: ['zh', 'en'], // must know what languages to use
      fallbackLng: 'en'
    });

  app.use(koaI18next(i18next, {
    lookupCookie: 'i18n', // detecting language in cookie
    /**
    * Detecting language in path params, need third part route middleware.
    * Example
    * path: `/api/:lng/hello
    */
    lookupPath: 'lng',
    lookupFromPathIndex: 0, // detecting language in path, like `/api/zh/hello` which `zh` is the language and the index is 1
    lookupQuerystring: 'lng', // detect language in query,
    lookupSession: 'lng', // detect language in session
    /**
    * support querystring, cookie, header, session, path
    * default order: ['querystring', 'cookie', 'header']
    */
    order: ['querystring'],
  }));
}
