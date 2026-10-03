import React from 'react';
import { baseUrl } from '@/helpers/baseUrl';
import { resolveMeta } from '@/helpers/cms';
import { JsonLd, SITE_NAME, buildMetadata, metaText, pageUrl, parseJsonLd } from '@/helpers/seo';
import ClientPage from './ClientPage';
import { notFound } from 'next/navigation';

export async function fetchServiceMeta(slug) {
    const res = await fetch(`${baseUrl}/api/v1/services/slug/${slug}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    return res.json();
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
    return buildMetadata({
        locale: params.locale,
        path: `services/${params.slug}`,
        title,
        description,
        ogTitle,
        ogDescription,
        keywords: params.locale === 'en' ? undefined : meta.keywords,
        image: data.image?.url || data.hero?.images?.[0]?.url,
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
