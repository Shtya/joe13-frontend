import React from 'react'
import { notFound } from 'next/navigation';
import { baseUrl } from '@/helpers/baseUrl';
import { JsonLd, SITE_NAME, absoluteUrl, buildMetadata, metaText, pageUrl } from '@/helpers/seo';
import ClientPage from './ClientPage';
import { BLOGS_QUERY, getCollection } from '@/hooks/getPageData';

export async function fetchBlogBySlug(slug) {
  const res = await fetch(`${baseUrl}/api/v1/blogs/slug/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  return res.json();
}

const blogText = (blog, locale) => ({
  title: metaText(blog.meta_title, locale, blog.title?.[locale] || blog.title?.en),
  description: metaText(blog.meta_description, locale, blog.content?.[locale] || blog.content?.en),
});

export async function generateMetadata({ params }) {
  const blog = await fetchBlogBySlug(params.slug);
  if (!blog) return buildMetadata({ locale: params.locale, noIndex: true });

  const { title, description } = blogText(blog, params.locale);
  return buildMetadata({
    locale: params.locale,
    path: `blogs/${params.slug}`,
    title,
    description,
    keywords: blog.meta_keywords,
    image: blog.image_url,
    type: 'article',
  });
}

/** Up to three other articles — same department first, then the latest. */
function pickMore(all, blog) {
  const others = (all || []).filter((b) => b.slug !== blog.slug);
  const same = others.filter((b) => b.department?.id && b.department?.id === blog.department?.id);
  const rest = others.filter((b) => !same.includes(b));
  return [...same, ...rest].slice(0, 3).map(({ id, slug, title, content, image_url, image_alt, author, published_at, created_at, department }) => ({
    id, slug, title, content, image_url, image_alt, author, published_at, created_at,
    department: department ? { id: department.id, name: department.name } : null,
  }));
}

export default async function page({ params }) {
  const [initialData, collection] = await Promise.all([fetchBlogBySlug(params.slug), getCollection(BLOGS_QUERY)]);
  if (!initialData) notFound();

  const { title, description } = blogText(initialData, params.locale);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description,
          image: absoluteUrl(initialData.image_url),
          datePublished: initialData.published_at || initialData.created_at,
          dateModified: initialData.updated_at,
          author: initialData.author ? { '@type': 'Person', name: initialData.author } : undefined,
          publisher: { '@type': 'Organization', name: SITE_NAME },
          keywords: Array.isArray(initialData.meta_keywords) ? initialData.meta_keywords.join(', ') : undefined,
          mainEntityOfPage: pageUrl(params.locale, `blogs/${params.slug}`),
          inLanguage: params.locale,
        }}
      />
      <ClientPage initialData={initialData} more={pickMore(collection?.data, initialData)} />
    </>
  )
}
