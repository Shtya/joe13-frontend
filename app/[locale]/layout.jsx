import { useMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { Montserrat, Cairo, Orbitron, Inter, Alexandria, Almarai } from 'next/font/google';
import '@/style/tailwind.css';
import '@/style/joe-system.css';
import Layout from '@/components/template/Layout';
import { baseUrl } from '@/helpers/baseUrl';
import { JsonLd, SITE_NAME, SITE_URL, absoluteUrl } from '@/helpers/seo';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-montserrat',
});

const cairo = Cairo({
    subsets: ['latin', 'arabic'],
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-cairo',
});

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-orbitron',
});

// JOE13 Black & Silver system — Arabic: Almarai (display + text);
// Latin: Alexandria (display) + Inter (text).
const alexandria = Alexandria({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-alexandria',
});

const almarai = Almarai({
    subsets: ['arabic'],
    weight: ['300', '400', '700', '800'],
    display: 'swap',
    variable: '--font-almarai',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800'],
    display: 'swap',
    variable: '--font-inter',
});

export async function getSettings() {
    const res = await fetch(`${baseUrl}/api/v1/settings`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
}

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: SITE_NAME,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
   },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  // Geo-targeting for Saudi Arabia.
  other: {
    'geo.region': 'SA',
    'geo.country': 'SA',
    'geo.placename': 'Saudi Arabia',
  },
};

// Official accounts, merged with whatever the CMS settings list.
const OFFICIAL_PROFILES = [
    'https://x.com/joe13ksa',
    'https://www.linkedin.com/company/joe13ksa/',
    'https://www.facebook.com/joe13ksa',
    'https://www.tiktok.com/@joe13ksa',
    'https://www.snapchat.com/add/joe13ksa',
    'https://www.instagram.com/joe13ksa',
];

const SA_REGIONS = [
    'Riyadh', 'Makkah', 'Madinah', 'Eastern Province', 'Qassim', 'Asir', 'Tabuk',
    'Hail', 'Northern Borders', 'Jazan', 'Najran', 'Al Bahah', 'Al Jawf',
];

const ORG_DESCRIPTION = {
    ar: 'حلول متخصصة لقطاع الأعمال (B2B) تغطي كافة أرجاء المملكة العربية السعودية.',
    en: 'Specialised B2B solutions covering every region of Saudi Arabia.',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#000000',
};

function organizationLd(settings, locale) {
    const contact = settings?.contact_us || {};
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ProfessionalService',
                '@id': `${SITE_URL}/#organization`,
                name: settings?.site_name?.[locale] || settings?.site_name?.en || SITE_NAME,
                url: SITE_URL,
                logo: absoluteUrl(settings?.site_logo?.url || '/assets/svg/logo-white.svg'),
                image: `${SITE_URL}/og-image.jpg`,
                description: ORG_DESCRIPTION[locale] || ORG_DESCRIPTION.ar,
                email: contact.email || undefined,
                telephone: contact.phone || undefined,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: contact.address?.[locale] || undefined,
                    addressCountry: 'SA',
                },
                areaServed: [
                    { '@type': 'Country', name: 'Saudi Arabia' },
                    ...SA_REGIONS.map(name => ({ '@type': 'AdministrativeArea', name, containedInPlace: { '@type': 'Country', name: 'Saudi Arabia' } })),
                ],
                sameAs: [
                    ...new Set([
                        ...OFFICIAL_PROFILES,
                        ...Object.values(settings?.social_media || {}).filter(v => typeof v === 'string' && v.startsWith('http')),
                    ]),
                ],
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE_NAME,
                inLanguage: ['ar', 'en'],
                publisher: { '@id': `${SITE_URL}/#organization` },
            },
        ],
    };
}

async function getNavData() {
    const load = async endpoint => {
        try {
            const res = await fetch(`${baseUrl}/api/v1/${endpoint}?limit=10000`, { next: { revalidate: 60 } });
            if (!res.ok) return [];
            const json = await res.json();
            return Array.isArray(json?.data) ? json.data : [];
        } catch {
            return [];
        }
    };
    const [projects, services] = await Promise.all([load('projects'), load('services')]);
    return {
        projects: {
            data: projects.map(p => ({
                slug: p.slug,
                name: p.name,
                department: p.department ? { id: p.department.id, name: p.department.name } : null,
            })),
        },
        services: { data: services.map(s => ({ slug: s.slug, title: s.title })) },
    };
}

async function SettingsLayout({ children, locale }) {
    const [initialSettings, initialNav] = await Promise.all([getSettings(), getNavData()]);
    return (
        <>
            <JsonLd data={organizationLd(initialSettings, locale)} />
            <Layout initialSettings={initialSettings} initialNav={initialNav}>{children}</Layout>
        </>
    );
}

export default function RootLayout({ children, params: { locale } }) {
    const messages = useMessages();

    return (
        <html suppressHydrationWarning lang={locale} dir={locale == 'en' ? 'ltr' : 'rtl'} className={`${montserrat.variable} ${cairo.variable} ${orbitron.variable} ${inter.variable} ${alexandria.variable} ${almarai.variable}`}>
            <head>
                <meta name='google-site-verification' content='zJyIE3QZ-5AyKid90sn0qSevc_ChsFUc0aG_8hbOYj4' />
                <link rel='preconnect' href={baseUrl} crossOrigin='anonymous' />
                <link rel='dns-prefetch' href={baseUrl} />
            </head>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <body className={locale === 'en' ? 'font-montserrat' : 'font-cairo'}>
                    <SettingsLayout locale={locale}> {children} </SettingsLayout>
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
