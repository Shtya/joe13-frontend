import { baseUrl } from '@/helpers/baseUrl';
import { cmsImage, resolveMeta } from '@/helpers/cms';
import { getAlternates } from '@/helpers/seo';

export async function getPageMetadata(slug, { locale, path = '' } = {}) {
    try {
        const res = await fetch(`${baseUrl}/api/v1/pages/${slug}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        const meta = resolveMeta(data?.meta, locale);
        const keywords = Array.isArray(meta.keywords) ? meta.keywords.join(', ') : '';
        const ogImageUrl = meta?.ogImage?.url || (typeof meta?.ogImage === 'string' ? meta.ogImage : '');

        return {
            title: meta?.title,
            description: meta?.description,
            keywords: keywords,
            openGraph: {
                title: meta.ogTitle || meta.title,
                description: meta.ogDescription || meta.description,
                url: meta.ogUrl,
                type: meta.ogType,
                images: ogImageUrl ? cmsImage(ogImageUrl, ogImageUrl) : undefined,
            },
            alternates: getAlternates(locale, path),

            other: {
                headScript: meta.headScript || '',
                structuredData: meta.structuredData || '',
                bodyScript: meta.bodyScript || '',
            },
        };
    } catch (error) {
        return {
            title: 'Joe 13 website',
            description: 'Joe 13 website.',
        };
    }
}
