import React from "react";
import { baseUrl } from "@/helpers/baseUrl";
import { JsonLd, SITE_NAME, absoluteUrl, buildMetadata, metaText, pageUrl } from "@/helpers/seo";
import ClientPage from "./ClientPage";
import { notFound } from "next/navigation";
import { PROJECTS_QUERY, getCollection } from "@/hooks/getPageData";

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

/** Up to three projects from the same department (topped up from others). */
function pickRelated(all, project) {
  const others = (all || []).filter((p) => p.slug !== project.slug);
  const same = others.filter((p) => p.department?.id === project.department?.id);
  const rest = others.filter((p) => p.department?.id !== project.department?.id);
  return [...same, ...rest].slice(0, 3).map(({ id, slug, name, description, images, image_url, image_alt, department }) => ({
    id,
    slug,
    name,
    description,
    images,
    image_url,
    image_alt,
    department: department ? { id: department.id, name: department.name } : null,
  }));
}

export default async function Page({ params }) {
  const [project, collection] = await Promise.all([fetchProjectBySlug(params.slug), getCollection(PROJECTS_QUERY)]);

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
      <ClientPage project={project} related={pickRelated(collection?.data, project)} />
    </>
  );
}
