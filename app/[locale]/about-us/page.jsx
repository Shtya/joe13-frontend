import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { getCollection, getPageData, TEAM_QUERY } from '@/hooks/getPageData';
import { JsonLd, pageJsonLd } from '@/helpers/seo';

export async function generateMetadata({ params }) {
  return getPageMetadata('about-us', { locale: params.locale, path: 'about-us' });
}

export default async function Page({ params }) {
  const [initialData, initialTeam] = await Promise.all([
    getPageData('about-us'),
    getCollection(TEAM_QUERY),
  ]);

  return (
    <>
      <JsonLd data={pageJsonLd(initialData, params.locale)} />
      <ClientPage initialData={initialData} initialTeam={initialTeam} />
    </>
  );
}