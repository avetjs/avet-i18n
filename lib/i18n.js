'use strict';

const i18n = require('i18next');
const XHR = require('i18next-xhr-backend');
const LanguageDetector = require('i18next-browser-languagedetector');

module.exports = (app) => {
  const options = app.config.i18n;

  if (process.browser) {
    i18n
      .use(XHR)
      .use(LanguageDetector);
  }

  if (!i18n.isInitialized) i18n.init(options);

  i18n.getInitialProps = (req, namespaces) => {
    if (!namespaces) namespaces = i18n.options.defaultNS;
    if (typeof namespaces === 'string') namespaces = [namespaces]

    req.i18n.toJSON = () => null // do not serialize i18next instance and send to client

    const initialI18nStore = ()

    req.i18n.languages.forEach((lang) => {{
      initialI18nStore[lang] = {}
      namespaces.forEach((ns) => {
        initialI18nStore[lang][ns] = req.i18n.services.resourceStore.data[lang][ns] || {}
      })
    }})
  }

  return {
    i18n: req.i18n,
    initialI18nStore,
    initialLanguage: req.i18n.language
  }
}