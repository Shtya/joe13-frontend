import { cmsImage } from '@/helpers/cms';

export function blogTitle(blog, locale) {
    return blog?.title?.[locale] || blog?.title?.en || '';
}

export function blogCover(blog) {
    return blog?.image_url ? cmsImage(blog.image_url, blog.image_url) : '';
}

export function plainText(html) {
    if (!html) return '';
    return String(html)
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export function excerpt(blog, locale, words = 28) {
    const list = plainText(blog?.content?.[locale] || blog?.content?.en).split(' ').filter(Boolean);
    return list.length > words ? `${list.slice(0, words).join(' ')}…` : list.join(' ');
}

/** Minutes to read at ~200 words per minute (never less than 1). */
export function readMinutes(blog, locale) {
    const words = plainText(blog?.content?.[locale] || blog?.content?.en).split(' ').filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

/** Dates in the reader's language, with Western digits like the rest of the site. */
export function formatDate(value, locale, month = 'long') {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString(locale === 'ar' ? 'ar-u-nu-latn' : 'en-GB', { day: 'numeric', month, year: 'numeric', timeZone: 'UTC' });
}

export function isHtml(text) {
    return /<\/?(p|h[1-6]|ul|ol|li|br|strong|em|a|img|blockquote)[\s>/]/i.test(String(text || ''));
}

/** Plain-text CMS bodies: blank lines separate paragraphs. */
export function paragraphsOf(text) {
    return String(text || '')
        .split(/\n\s*\n|\r\n\s*\r\n/)
        .map(p => p.replace(/\s+/g, ' ').trim())
        .filter(Boolean);
}
