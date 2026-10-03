import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { getPageData } from '@/hooks/getPageData';
import { JsonLd, pageJsonLd } from '@/helpers/seo';

export async function generateMetadata({ params }) {
  return getPageMetadata('contact-us', { locale: params.locale, path: 'contact-us' });
}

export default async function Page({ params }) {
  const initialData = await getPageData('contact-us');

  return (
    <>
      <JsonLd data={pageJsonLd(initialData, params.locale)} />
      <ClientPage initialData={initialData} />
    </>
  );
}