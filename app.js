'use strict';

const { join, isAbsolute, resolve } = require('path');
const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('@iocast/koa-i18next/dist/es/index.js').default;

module.exports = (app) => {
  i18next
    .use(Backend)
    .init({
      fallbackLng: 'en-US',
      ns: ['common'],
      defaultNS: 'common',
      backend: {
        // translation resources
        loadPath: resolve(app.config.avet.dir, 'config', 'locales/{{lng}}/{{ns}}.json'),
        addPath: resolve(app.config.avet.dir, 'config', 'locales/{{lng}}/{{ns}}.missing.json')
      },
      preload: ['zh-CN', 'en-US'], // must know what languages to use
      fallbackLng: 'en-US'
    });

  app.use(i18nextMiddleware(i18next, app));
}
