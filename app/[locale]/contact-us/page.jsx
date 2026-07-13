import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { getPageData } from '@/hooks/getPageData';

export async function generateMetadata(){
  return getPageMetadata('contact-us');
}

export default async function Page() {
  const initialData = await getPageData('contact-us');
  return <ClientPage initialData={initialData} />;
}
