import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { getPageData } from '@/hooks/getPageData';

export async function generateMetadata({ params }){
  return getPageMetadata('contact-us', { locale: params.locale, path: 'contact-us' });
}

export default async function Page() {
  const initialData = await getPageData('contact-us');
  return <ClientPage initialData={initialData} />;
}
