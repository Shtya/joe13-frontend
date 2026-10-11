import { cmsImage } from '@/helpers/cms';

/** All images of a project as { src, alt }, CMS paths resolved. */
export function projectImages(project) {
    const list = project?.images?.length
        ? project.images
        : project?.image_url
          ? [{ url: project.image_url, alt: project.image_alt }]
          : [];
    return list.filter(img => img?.url).map(img => ({ src: cmsImage(img.url, img.url), alt: img.alt || '' }));
}

export function projectName(project, locale) {
    return project?.name?.[locale] || project?.name?.en || '';
}

export function plainText(html) {
    if (!html) return '';
    return String(html)
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/** Split rich CMS text into readable paragraphs. */
export function paragraphs(raw) {
    const html = String(raw || '').trim();
    if (!html) return [];
    if (/<p[\s>]/i.test(html)) {
        return html
            .split(/<\/p>/i)
            .map(plainText)
            .filter(Boolean);
    }
    return html
        .replace(/<br\s*\/?>/gi, '\n')
        .split(/\n+/)
        .map(plainText)
        .filter(Boolean);
}

/** "180+" → { number: 180, prefix: '', suffix: '+' } (keeps signs on either side). */
export function parseFigure(value) {
    const text = String(value ?? '').replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
    const m = text.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!m) return { number: null, prefix: '', suffix: text };
    return { prefix: m[1].trim(), number: Number(m[2]), suffix: m[3].trim() };
}
