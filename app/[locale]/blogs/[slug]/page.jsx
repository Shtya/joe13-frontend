import React from 'react'
import { baseUrl } from '@/helpers/baseUrl';
import ClientPage from './ClientPage';

export async function generateMetadata({ params }) {
  const res = await fetch(`${baseUrl}/api/v1/blogs/slug/${params.slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return {};

  const project = await res.json();

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

export default function page() {

  return (
    <ClientPage />
  )
}
