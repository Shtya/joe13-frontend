import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { getPageData } from '@/hooks/getPageData';

export async function generateMetadata(){
  return getPageMetadata('projects');
}

export default async function Page() {
  const initialData = await getPageData('projects');

  return <>
    <ClientPage initialData={initialData} />
  </> ;
}
