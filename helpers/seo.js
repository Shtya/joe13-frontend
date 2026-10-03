import { cmsImage, resolveMeta } from '@/helpers/cms';

// Locale routing here uses next-intl's `localePrefix: 'as-needed'` with
// `defaultLocale: 'ar'` (see navigation.js / middleware.js): Arabic pages have
// no locale prefix, English pages are prefixed with /en.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.joe13th.com').replace(/\/+$/, '');
export const SITE_NAME = 'JOE13';
const DEFAULT_IMAGE = '/landing/bg-hero.png';

const pathFor = (locale, path) => {
  const suffix = path ? `/${path}` : '';
  return locale === 'en' ? `/en${suffix}` : suffix || '/';
};

export const absoluteUrl = (value) => {
  if (!value) return undefined;
  const src = cmsImage(value, value);
  return src.startsWith('http') ? src : `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
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

const plain = (value, max = 300) => {
  const text = String(value || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text || undefined;
};

const ARABIC = /[\u0600-\u06FF]/;

export function metaText(value, locale, fallback) {
  const text = plain(value);
  if (!text) return plain(fallback);
  const alt = plain(fallback);
  if (locale === 'en' && ARABIC.test(text)) return alt || text;
  if (locale === 'ar' && !ARABIC.test(text) && alt && ARABIC.test(alt)) return alt;
  return text;
}

export function buildMetadata({ locale = 'ar', path = '', title, description, keywords, image, ogTitle, ogDescription, type = 'website', noIndex = false }) {
  const desc = plain(description, 160);
  const ogDesc = plain(ogDescription, 200) || desc;
  const img = absoluteUrl(image || DEFAULT_IMAGE);
  const alternates = getAlternates(locale, path);
  const kw = Array.isArray(keywords) ? keywords.filter(Boolean).join(', ') : plain(keywords, 400);

  return {
    title: plain(title, 120) || SITE_NAME,
    description: desc,
    keywords: kw || undefined,
    alternates,
    openGraph: {
      title: plain(ogTitle, 120) || plain(title, 120) || SITE_NAME,
      description: ogDesc,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: locale === 'en' ? 'en_US' : 'ar_SA',
      alternateLocale: locale === 'en' ? ['ar_SA'] : ['en_US'],
      type,
      images: img ? [{ url: img }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: plain(ogTitle, 120) || plain(title, 120) || SITE_NAME,
      description: ogDesc,
      images: img ? [img] : undefined,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

const isSchema = (value) => Boolean(value && typeof value === 'object' && (value['@type'] || value['@graph']));

export function parseJsonLd(value) {
  if (!value) return null;
  if (Array.isArray(value?.array)) value = value.array.join(',');
  if (typeof value === 'object') return isSchema(value) ? value : null;
  try {
    const parsed = JSON.parse(String(value).replace(/<\/?script[^>]*>/gi, '').trim());
    return isSchema(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export const pageJsonLd = (page, locale) => parseJsonLd(resolveMeta(page?.meta, locale)?.structuredData);

export function JsonLd({ data }) {
  if (!data) return null;
  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const pageUrl = (locale, path = '') => `${SITE_URL}${pathFor(locale, path) === '/' ? '' : pathFor(locale, path)}`;
