import { baseImage } from '@/helpers/baseUrl';

export function pickLocale(obj, locale, fallback = '') {
  if (obj == null) return fallback;
  if (typeof obj !== 'object') return obj || fallback;
  const value = obj[locale] ?? obj.en;
  if (value == null || value === '') return fallback;
  return value;
}

export function pickUi(data, locale, key, fallback) {
  const bag = data?.ui?.[locale] || {};
  const value = bag[key];
  if (value == null || value === '') return fallback;
  return value;
}

export function pickList(data, locale, key, fallback) {
  const fromUi = key ? pickUi(data, locale, key) : null;
  if (Array.isArray(fromUi) && fromUi.length) return fromUi;
  const list = data?.list?.[locale] ?? data?.list?.en;
  if (Array.isArray(list) && list.length) return list;
  return fallback;
}

export function cmsImage(url, fallback) {
  const src = (url && String(url).trim()) || fallback || '';
  if (!src) return fallback || '';
  if (
    src.startsWith('http') ||
    src.startsWith('blob:') ||
    src.startsWith('/landing') ||
    src.startsWith('/assets') ||
    src.startsWith('/joe')
  ) {
    return src;
  }
  return baseImage(src);
}

const ARABIC = /[\u0600-\u06FF]/;

/** Pick bilingual SEO field: string | {en,ar} | fall back to content. */
export function localizedSeo(value, locale, fallback = '') {
  if (value == null || value === '') return fallback;
  if (typeof value === 'object' && !Array.isArray(value)) {
    return value[locale] || value.en || value.ar || fallback;
  }
  const text = String(value);
  if (locale === 'en' && ARABIC.test(text)) return fallback || text;
  if (locale === 'ar' && !ARABIC.test(text) && fallback && ARABIC.test(String(fallback))) return fallback;
  return text || fallback;
}

/**
 * Prefer meta[locale] when present. Flat legacy fields are used only when
 * the matching locale block is empty — never overwrite a filled AR/EN block
 * with the wrong language from the root.
 */
export function resolveMeta(meta, locale = 'en') {
  if (!meta || typeof meta !== 'object') return {};
  const localized = meta[locale];
  const hasLocalized =
    localized &&
    typeof localized === 'object' &&
    !Array.isArray(localized) &&
    (localized.title || localized.description || localized.ogTitle);

  if (hasLocalized) {
    return {
      ...meta,
      ...localized,
      title: localized.title || meta.title,
      description: localized.description || meta.description,
      ogTitle: localized.ogTitle || localized.title || meta.ogTitle,
      ogDescription: localized.ogDescription || localized.description || meta.ogDescription,
      ogImage: localized.ogImage || meta.ogImage,
      keywords: localized.keywords?.length ? localized.keywords : meta.keywords,
      canonicalUrl: localized.canonicalUrl || meta.canonicalUrl,
      ogUrl: localized.ogUrl || meta.ogUrl,
      ogType: localized.ogType || meta.ogType,
      robots: localized.robots || meta.robots,
      noIndex: localized.noIndex ?? meta.noIndex,
      headScript: localized.headScript ?? meta.headScript,
      bodyScript: localized.bodyScript ?? meta.bodyScript,
      structuredData: localized.structuredData || meta.structuredData,
    };
  }

  // Flat-only legacy: if locale is EN but flat title is Arabic (or vice versa),
  // leave title empty so callers can fall back to page content.
  const flatTitle = meta.title || '';
  const flatIsAr = ARABIC.test(String(flatTitle));
  if ((locale === 'en' && flatIsAr) || (locale === 'ar' && flatTitle && !flatIsAr)) {
    return {
      ...meta,
      title: undefined,
      description: undefined,
      ogTitle: undefined,
      ogDescription: undefined,
    };
  }

  return meta;
}
