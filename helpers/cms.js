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

export function resolveMeta(meta, locale = 'en') {
  if (!meta || typeof meta !== 'object') return {};
  const localized = meta[locale];
  if (localized && typeof localized === 'object' && !Array.isArray(localized)) {
    return {
      ...meta,
      ...localized,
      ogImage: localized.ogImage || meta.ogImage,
      keywords: localized.keywords || meta.keywords,
      canonicalUrl: localized.canonicalUrl || meta.canonicalUrl,
      ogUrl: localized.ogUrl || meta.ogUrl,
      ogType: localized.ogType || meta.ogType,
      headScript: localized.headScript ?? meta.headScript,
      bodyScript: localized.bodyScript ?? meta.bodyScript,
      structuredData: localized.structuredData || meta.structuredData,
    };
  }
  return meta;
}
