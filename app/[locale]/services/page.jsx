import ClientPage from './ClientPage';
import { getPageMetadata } from '@/hooks/usePageMeta';
import { getCollection, getPageData } from '@/hooks/getPageData';
import { JsonLd, SITE_NAME, pageUrl } from '@/helpers/seo';

const TITLES = { ar: 'خدماتنا', en: 'Our services' };

export async function generateMetadata({ params }) {
    return getPageMetadata('services', { locale: params.locale, path: 'services', fallbackTitle: `${TITLES[params.locale] || TITLES.en} | ${SITE_NAME}` });
}

/** Only what the catalog renders — the full service documents are large. */
function trimServices(list) {
    return (list || []).map(s => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        subTitle: s.subTitle,
        image: s.image ? { url: s.image.url, alt: s.image.alt } : null,
        featureCount: Array.isArray(s.hero?.attr) ? s.hero.attr.length : 0,
    }));
}

export default async function Page({ params }) {
    const [pageData, collection] = await Promise.all([getPageData('services'), getCollection('services?limit=10000')]);
    const services = trimServices(collection?.data);

    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'ItemList',
                    name: TITLES[params.locale] || TITLES.en,
                    url: pageUrl(params.locale, 'services'),
                    itemListElement: services.map((s, i) => ({
                        '@type': 'ListItem',
                        position: i + 1,
                        name: s.title?.[params.locale] || s.title?.en,
                        url: pageUrl(params.locale, `services/${s.slug}`),
                    })),
                }}
            />
            <ClientPage pageData={pageData} services={services} />
        </>
    );
}
