import { Metadata } from 'next';
import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';

export async function generateMetadata(){
  return getPageMetadata('contact');
}

export default function Page() {
  return <ClientPage />;
}
