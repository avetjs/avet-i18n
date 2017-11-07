'use strict';

exports.i18n = {
  i18next: {
    fallbackLng: 'en',
    load: 'languageOnly', // we only provide en, zh -> no region specific locals like en-US, zh-CN

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,
    saveMissing: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format: (value, format, lng) => {
        if (format === 'uppercase') return value.toUpperCase()
        return value
      }
    }
  },
  // 更多配置信息查看这里 https://github.com/koajs/static-cache#api
  staticCache: {
    dir: 'config/locales',
    maxAge: 24 * 60 * 60, // 缓存一天， 0表示不缓存
    prefix: 'locales'
  }
}
