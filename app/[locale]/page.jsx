import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';

export async function generateMetadata(){
  return getPageMetadata('home-page');
}

export default function Page() {

  return <>
    <ClientPage />
  </> ;
}
