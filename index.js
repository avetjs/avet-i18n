import { translate } from 'react-i18next';
import * as i18n from './lib/i18n';

export default function(Component, locales, options) {
  const WrapComponent = translate(locales, Object.assign({}, {
    i18n,
    wait: process.browser,
  }, options))(Component);

  WrapComponent.getInitialProps = async({ ctx }) => {
    if (ctx && !process.browser) {
      return i18n.getInitialProps(ctx, locales);
    }
    return {};
  }
}
