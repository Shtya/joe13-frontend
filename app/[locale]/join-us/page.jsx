import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { getPageData } from '@/hooks/getPageData';
import { JsonLd, pageJsonLd } from '@/helpers/seo';

export async function generateMetadata({ params }) {
  return getPageMetadata('join-us', { locale: params.locale, path: 'join-us' });
}

export default async function Page({ params }) {
  const initialData = await getPageData('join-us');

  return (
    <>
      <JsonLd data={pageJsonLd(initialData, params.locale)} />
      <ClientPage initialData={initialData} />
    </>
  );
}