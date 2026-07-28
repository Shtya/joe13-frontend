import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { getPageData } from '@/hooks/getPageData';

export async function generateMetadata({ params }){
  return getPageMetadata('join-us', { locale: params.locale, path: 'join-us' });
}

export default async function Page() {
  const initialData = await getPageData('join-us');
  return <ClientPage initialData={initialData} />;
}
