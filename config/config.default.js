'use strict';

exports.i18n = {
  fallbackLng: 'en',
  load: 'languageOnly', // we only provide en, zh -> no region specific locals like en-US, zh-CN

  // have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  debug: true,
  saveMissing: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase()
      return value
    }
  }
}
