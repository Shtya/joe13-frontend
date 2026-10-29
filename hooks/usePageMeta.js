import { baseUrl } from '@/helpers/baseUrl';
import { resolveMeta } from '@/helpers/cms';
import { buildMetadata } from '@/helpers/seo';

export async function getPageMetadata(slug, { locale, path = '', fallbackTitle } = {}) {
    try {
        const res = await fetch(`${baseUrl}/api/v1/pages/${slug}`, {
            next: { revalidate: 10, tags: [`page-seo-${slug}`] },
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        const meta = resolveMeta(data?.meta, locale);
        const ogImage = meta?.ogImage?.url || (typeof meta?.ogImage === 'string' ? meta.ogImage : '');

        return buildMetadata({
            locale,
            path,
            title: meta?.title || fallbackTitle,
            description: meta?.description,
            keywords: meta?.keywords,
            ogTitle: meta?.ogTitle,
            ogDescription: meta?.ogDescription,
            image: ogImage,
            type: meta?.ogType === 'article' ? 'article' : 'website',
            robots: meta?.robots,
            noIndex: meta?.noIndex,
            canonicalUrl: meta?.canonicalUrl,
        });
    } catch {
        return buildMetadata({ locale, path, title: fallbackTitle });
    }
}
