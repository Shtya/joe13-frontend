import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { PROJECTS_QUERY, getCollection, getPageData } from '@/hooks/getPageData';
import { JsonLd, pageJsonLd } from '@/helpers/seo';

export async function generateMetadata({ params }) {
  return getPageMetadata('projects', { locale: params.locale, path: 'projects' });
}

export default async function Page({ params }) {
  const [initialData, initialProjects] = await Promise.all([getPageData('projects'), getCollection(PROJECTS_QUERY)]);

  return (
    <>
      <JsonLd data={pageJsonLd(initialData, params.locale)} />
      <ClientPage initialData={initialData} initialProjects={initialProjects} />
    </>
  );
}