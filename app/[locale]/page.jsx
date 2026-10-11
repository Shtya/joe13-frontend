import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { getPageData } from '@/hooks/getPageData';
import { JsonLd, pageJsonLd } from '@/helpers/seo';

export async function generateMetadata({ params }) {
  return getPageMetadata('home-page', { locale: params.locale, path: '' });
}

export default async function Page({ params }) {
  const initialData = await getPageData('home-page');

  return (
    <>
      {/* Lets the design system hide entrance-animated content before first paint
          (only when JS runs; a CSS failsafe reveals it if the motion engine never boots). */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('jx-js')" }} />
      <JsonLd data={pageJsonLd(initialData, params.locale)} />
      <ClientPage initialData={initialData} />
    </>
  );
}