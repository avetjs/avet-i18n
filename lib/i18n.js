'use strict';

const i18n = require('i18next');
const XHR = require('i18next-xhr-backend');
const LanguageDetector = require('i18next-browser-languagedetector');

const options = {
  fallbackLng: 'en',
  load: 'languageOnly', // we only provide en, de -> no region specific locals like en-US, de-DE

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
  if (typeof namespaces === 'string') namespaces = [namespaces]

  ctx.req.i18n.toJSON = () => null // do not serialize i18next instance and send to client

  const initialI18nStore = ()

  ctx.req.i18n.languages.forEach((lang) => {{
    initialI18nStore[lang] = {}
    namespaces.forEach((ns) => {
      initialI18nStore[lang][ns] = ctx.req.i18n.services.resourceStore.data[lang][ns] || {}
    })
  }})

  return {
    i18n: ctx.req.i18n,
    initialI18nStore,
    initialLanguage: ctx.req.i18n.language
  }
}
