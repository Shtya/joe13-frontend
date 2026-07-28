import { baseImage, baseUrl } from '@/helpers/baseUrl';
import { getAlternates } from '@/helpers/seo';

export async function getPageMetadata(slug, { locale, path = '' } = {}) {
    try {
        const res = await fetch(`${baseUrl}/api/v1/pages/${slug}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        const keywords = Array.isArray(data?.meta.keywords) ? data?.meta.keywords.join(', ') : '';

        return {
            title: data?.meta?.title,
            description: data?.meta?.description,
            keywords: keywords,
            openGraph: {
                title: data?.meta.ogTitle,
                description: data?.meta.ogDescription,
                url: data?.meta.ogUrl,
                type: data?.meta.ogType,
                images: baseImage(data?.meta.ogImage.url),
            },
            alternates: getAlternates(locale, path),

            other: {
                headScript: data?.meta.headScript || '',
                structuredData: data?.meta.structuredData || '',
                bodyScript: data?.meta.bodyScript || '',
            },
        };
    } catch (error) {
        return {
            title: 'Joe 13 website',
            description: 'Joe 13 website.',
        };
    }
}
