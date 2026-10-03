import { useMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { Montserrat, Cairo, Orbitron, Inter } from 'next/font/google';
import '@/style/tailwind.css';
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
   },
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
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                name: settings?.site_name?.[locale] || settings?.site_name?.en || SITE_NAME,
                url: SITE_URL,
                logo: absoluteUrl(settings?.site_logo?.url || '/assets/svg/logo-white.svg'),
                email: contact.email || undefined,
                telephone: contact.phone || undefined,
                address: contact.address?.[locale] || undefined,
                sameAs: Object.values(settings?.social_media || {}).filter(v => typeof v === 'string' && v.startsWith('http')),
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
        <html lang={locale} dir={locale == 'en' ? 'ltr' : 'rtl'} className={`${montserrat.variable} ${cairo.variable} ${orbitron.variable} ${inter.variable}`}>
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
