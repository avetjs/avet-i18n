'use strict';

const i18n = require('i18next');
const XHR = require('i18next-xhr-backend');
const LanguageDetector = require('i18next-browser-languagedetector');

const options = {
  fallbackLng: 'en-US',

  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  debug: true,
  saveMissing: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase();
      return value;
    }
  }
};

if (process.browser) {
  i18n
    .use(XHR)
    .use(LanguageDetector);
}

if (!i18n.isInitialized) i18n.init(options);

i18n.getInitialProps = (ctx, namespaces) => {
  if (!namespaces) namespaces = i18n.options.defaultNS;
  if (typeof namespaces === 'string') namespaces = [namespaces];

  ctx.i18n.toJSON = () => null; // do not serialize i18next instance and send to client
  ctx.i18n.options = {};

  const initialI18nStore = {};

  ctx.i18n.languages.forEach((lang) => {
    initialI18nStore[lang] = {}
    namespaces.forEach((ns) => {
      initialI18nStore[lang][ns] = ctx.i18n.services.resourceStore.data[lang]
        ? ctx.i18n.services.resourceStore.data[lang][ns] || {}
        : {};
    });
  });

  return {
    i18n: ctx.i18n,
    initialI18nStore,
    initialLanguage: ctx.i18n.language
  }
}

module.exports = i18n;
