import { baseUrl } from '@/helpers/baseUrl';

const getJson = async (url, init) => {
  try {
    const res = await fetch(url, init);
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
};

// URLs are always lowercase (see middleware.js), but the backend matches slugs
// case-sensitively and older CMS entries may be mixed case (e.g.
// "Content-Creation"). Fall back to a case-insensitive match on the list.
export async function fetchBySlug(collection, slug, init) {
  const direct = await getJson(`${baseUrl}/api/v1/${collection}/slug/${slug}`, init);
  if (direct) return direct;

  let wanted;
  try {
    wanted = decodeURIComponent(slug).toLowerCase();
  } catch {
    return null;
  }
  const list = await getJson(`${baseUrl}/api/v1/${collection}?limit=10000`, init);
  const match = (list?.data || []).find((item) => typeof item?.slug === 'string' && item.slug.toLowerCase() === wanted);
  if (!match || match.slug === slug) return null;
  return getJson(`${baseUrl}/api/v1/${collection}/slug/${encodeURIComponent(match.slug)}`, init);
}
