import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { getPageData } from '@/hooks/getPageData';

export async function generateMetadata({ params }){
  return getPageMetadata('home-page', { locale: params.locale, path: '' });
}

export default async function Page() {
  const initialData = await getPageData('home-page');

  return <>
    <ClientPage initialData={initialData} />
  </> ;
}
