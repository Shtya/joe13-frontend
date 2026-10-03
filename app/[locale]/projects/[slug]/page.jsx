import React from "react";
import { baseUrl } from "@/helpers/baseUrl";
import { JsonLd, SITE_NAME, absoluteUrl, buildMetadata, metaText, pageUrl } from "@/helpers/seo";
import ClientPage from "./ClientPage";
import { notFound } from "next/navigation";

async function fetchProjectBySlug(slug) {
  const res = await fetch(`${baseUrl}/api/v1/projects/slug/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  return res.json();
}

const projectText = (project, locale) => ({
  title: metaText(project.meta_title, locale, project.name?.[locale] || project.name?.en),
  description: metaText(project.meta_description, locale, project.description?.[locale] || project.description?.en),
});

export async function generateMetadata({ params }) {
  const project = await fetchProjectBySlug(params.slug);
  if (!project) return buildMetadata({ locale: params.locale, noIndex: true });

  const { title, description } = projectText(project, params.locale);
  return buildMetadata({
    locale: params.locale,
    path: `projects/${params.slug}`,
    title,
    description,
    keywords: project.meta_keywords,
    image: project.images?.[0]?.url,
  });
}

export default async function Page({ params }) {
  const project = await fetchProjectBySlug(params.slug);

  if (!project) notFound();

  const { title, description } = projectText(project, params.locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: title,
          description,
          url: pageUrl(params.locale, `projects/${params.slug}`),
          image: (project.images || []).map((img) => absoluteUrl(img?.url)).filter(Boolean),
          inLanguage: params.locale,
          creator: { "@type": "Organization", name: SITE_NAME },
        }}
      />
      <ClientPage project={project} />
    </>
  );
}
