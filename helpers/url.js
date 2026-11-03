// URL hygiene shared by links, middleware, the sitemap and JSON-LD.
//
// Arabic is the default locale and lives at the root (`localePrefix:
// 'as-needed'`), English is prefixed with /en. Internal links are written out
// in their final form (lowercase, no /ar prefix, no trailing slash) so crawlers
// never meet a redirect.

export const DEFAULT_LOCALE = 'ar';

const EXTERNAL = /^([a-z][a-z\d+.-]*:|\/\/|#)/i;
const LOCALE_PREFIX = /^\/(ar|en)(?=\/|$)/i;

// Lowercases ASCII letters but leaves percent-escapes (%D8%A7…) untouched.
export const lowerPath = (path) => String(path).replace(/%[0-9a-f]{2}|[A-Z]+/gi, (m) => (m[0] === '%' ? m : m.toLowerCase()));

export function normalizePath(path) {
  const clean = lowerPath(`/${path || ''}`.replace(/\/{2,}/g, '/'));
  return clean.length > 1 ? clean.replace(/\/+$/, '') : '/';
}

export function localizePath(href, locale = DEFAULT_LOCALE) {
  if (href && typeof href === 'object') {
    return href.pathname == null ? href : { ...href, pathname: localizePath(href.pathname, locale) };
  }
  if (typeof href !== 'string' || EXTERNAL.test(href)) return href;

  const [, path = '', query = '', hash = ''] = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/) || [];
  const bare = normalizePath(path).replace(LOCALE_PREFIX, '') || '/';
  const localized = locale === DEFAULT_LOCALE ? bare : `/${locale}${bare === '/' ? '' : bare}`;
  return `${localized}${query}${hash}`;
}

// Profile URLs pasted from share sheets carry tracking params (?_t, ?mibextid,
// ?igsh, ?share_id…). Keep only scheme, host and path.
export function cleanExternalUrl(value) {
  if (typeof value !== 'string' || !/^https?:\/\//i.test(value.trim())) return null;
  try {
    const url = new URL(value.trim());
    const host = url.hostname.toLowerCase().replace(/^twitter\.com$/, 'x.com');
    const path = url.pathname.replace(/\/+$/, '');
    return `https://${host}${path}`;
  } catch {
    return null;
  }
}

export const uniqueUrls = (values) => [...new Set(values.map(cleanExternalUrl).filter(Boolean))];
