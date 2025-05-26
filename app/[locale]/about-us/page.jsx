import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';

export async function generateMetadata(){
  return getPageMetadata('about-us');
}

export default function Page() {
  return <ClientPage />;
}
