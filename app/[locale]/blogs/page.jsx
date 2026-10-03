import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { BLOGS_QUERY, getCollection, getPageData } from '@/hooks/getPageData';
import { JsonLd, pageJsonLd } from '@/helpers/seo';

export async function generateMetadata({ params }) {
  return getPageMetadata('blogs', { locale: params.locale, path: 'blogs' });
}

export default async function Page({ params }) {
  const [initialData, initialBlogs] = await Promise.all([getPageData('blogs'), getCollection(BLOGS_QUERY)]);

  return (
    <>
      <JsonLd data={pageJsonLd(initialData, params.locale)} />
      <ClientPage initialData={initialData} initialBlogs={initialBlogs} />
    </>
  );
}