import { baseImage, baseUrl } from '@/helpers/baseUrl';

export async function getPageMetadata(slug) {
    try {
        const res = await fetch(`${baseUrl}/api/v1/pages/${slug}`, {
            cache: 'no-store',
            headers: {
                Accept: 'application/json',
            },
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
            alternates: { canonical: data?.meta.canonicalUrl },

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
