import { getRequestConfig } from 'next-intl/server';
import { defaultLeng } from '../leng.config';

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale ? locale : defaultLeng ? defaultLeng : 'en'; 

  return {
    messages: (await import(`../locales/${safeLocale}.json`)).default,
    locale: safeLocale
  };
});