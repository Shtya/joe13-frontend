import React from 'react';
import { fetchBySlug } from '@/helpers/slug';
import { resolveMeta } from '@/helpers/cms';
import { JsonLd, SITE_NAME, buildMetadata, metaText, pageUrl, parseJsonLd } from '@/helpers/seo';
import ClientPage from './ClientPage';
import { notFound } from 'next/navigation';

export async function fetchServiceMeta(slug) {
    return fetchBySlug('services', slug, {
        next: { revalidate: 10, tags: [`page-seo-services/${slug}`, 'page-seo-services'] },
    });
}

const serviceText = (data, locale) => {
    const meta = resolveMeta(data.meta, locale);
    const name = data.title?.[locale] || data.title?.en;
    const sub = data.subTitle?.[locale] || data.subTitle?.en;
    return {
        meta,
        title: metaText(meta.title, locale, name),
        description: metaText(meta.description, locale, sub),
        ogTitle: metaText(meta.ogTitle, locale, name),
        ogDescription: metaText(meta.ogDescription, locale, sub),
    };
};

export async function generateMetadata({ params }) {
    const data = await fetchServiceMeta(params.slug);
    if (!data) return buildMetadata({ locale: params.locale, noIndex: true });

    const { meta, title, description, ogTitle, ogDescription } = serviceText(data, params.locale);
    const ogImage = meta?.ogImage?.url || (typeof meta?.ogImage === 'string' ? meta.ogImage : '') || data.image?.url || data.hero?.images?.[0]?.url;
    return buildMetadata({
        locale: params.locale,
        path: `services/${params.slug}`,
        title,
        description,
        ogTitle,
        ogDescription,
        keywords: meta.keywords,
        image: ogImage,
        robots: meta.robots,
        noIndex: meta.noIndex,
        canonicalUrl: meta.canonicalUrl,
        type: meta.ogType === 'article' ? 'article' : 'website',
    });
}

export default async function page({ params }) {
    const data = await fetchServiceMeta(params.slug);
    if (data == null) notFound();

    const { meta, title, description } = serviceText(data, params.locale);

    return (
        <>
            <JsonLd
                data={
                    parseJsonLd(meta.structuredData) || {
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: title,
                        description,
                        url: pageUrl(params.locale, `services/${params.slug}`),
                        provider: { '@type': 'Organization', name: SITE_NAME },
                    }
                }
            />
            <ClientPage data={data} locale={params?.locale} />
        </>
    );
}
