import React from 'react'
import { baseUrl } from '@/helpers/baseUrl';
import ClientPage from './ClientPage';

export async function fetchBlogBySlug(slug) {
  const res = await fetch(`${baseUrl}/api/v1/blogs/slug/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({ params }) {
  const project = await fetchBlogBySlug(params.slug);

  if (!project) return {};

  return {
    title: project.meta_title,
    description: project.meta_description,
    keywords: project.meta_keywords?.join(', '),
    openGraph: {
      title: project.meta_title,
      description: project.meta_description,
      images: [
        {
          url: project.images?.[0]?.url,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function page({ params }) {
  const initialData = await fetchBlogBySlug(params.slug);

  return (
    <ClientPage initialData={initialData} />
  )
}
