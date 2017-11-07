'use strict';

const { join, isAbsolute, resolve } = require('path');
const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('@iocast/koa-i18next/dist/es/index.js').default;

module.exports = (app) => {
  i18next
    .use(Backend)
    .init({
      backend: {
        // translation resources
        loadPath: resolve(app.config.avet.dir, 'config', 'locales/{{lng}}/{{ns}}.json'),
        addPath: resolve(app.config.avet.dir, 'config', 'locales/{{lng}}/{{ns}}.missing.json')
      },
      preload: ['zh', 'en'], // must know what languages to use
      fallbackLng: 'en'
    });

  app.use(i18nextMiddleware(i18next, app));
}
