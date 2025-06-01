import React from 'react';
import { baseUrl } from '@/helpers/baseUrl';
import ClientPage from './ClientPage';
import { notFound } from 'next/navigation';

export async function fetchServiceMeta(slug) {
    const res = await fetch(`${baseUrl}/api/v1/services/slug/${slug}`, {
        cache: 'no-store',
    });

    if (!res.ok) return null;

    return res.json();
}

export async function generateMetadata({ params }) {
    const data = await fetchServiceMeta(params.slug);
    if (!data) return {};

    const { meta } = data;

    if (!meta) return;

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords.join(', '),
        twitter: { card: 'summary_large_image' },
        scripts: { head: meta.headScript, body: meta.bodyScript },
        canonicalUrl: meta.canonicalUrl,
        structuredData: meta.structuredData,
    };
}

export default async function page({ params }) {
    const data = await fetchServiceMeta(params.slug);
    if (data == null) notFound();

    return <ClientPage data={data} locale={params?.locale} />;
}
