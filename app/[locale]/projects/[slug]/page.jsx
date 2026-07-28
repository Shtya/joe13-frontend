import React from "react";
import { baseUrl } from "@/helpers/baseUrl";
import { getAlternates } from "@/helpers/seo";
import ClientPage from "./ClientPage";
import { notFound } from "next/navigation";

async function fetchProjectBySlug(slug) {
  const res = await fetch(`${baseUrl}/api/v1/projects/slug/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({ params }) {
  const project = await fetchProjectBySlug(params.slug);

  if (!project) return null;

  return {
    title: project.meta_title,
    description: project.meta_description,
    keywords: project.meta_keywords?.join(", "),
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
      card: "summary_large_image",
    },
    alternates: getAlternates(params.locale, `projects/${params.slug}`),
  };
}

export default async function Page({ params }) {
  const project = await fetchProjectBySlug(params.slug);

  if (!project) notFound();

  return <ClientPage project={project} />;
}
