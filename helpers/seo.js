// Locale routing here uses next-intl's `localePrefix: 'as-needed'` with
// `defaultLocale: 'ar'` (see navigation.js / middleware.js): Arabic pages have
// no locale prefix, English pages are prefixed with /en.
const pathFor = (locale, path) => {
  const suffix = path ? `/${path}` : '';
  return locale === 'en' ? `/en${suffix}` : suffix || '/';
};

export function getAlternates(locale, path = '') {
  return {
    canonical: pathFor(locale, path),
    languages: {
      en: pathFor('en', path),
      ar: pathFor('ar', path),
      'x-default': pathFor('ar', path),
    },
  };
}
