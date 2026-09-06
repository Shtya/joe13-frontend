import { useMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { Montserrat, Cairo, Orbitron, Inter } from 'next/font/google';
import '@/style/tailwind.css';
import Layout from '@/components/template/Layout';
import { baseUrl } from '@/helpers/baseUrl';

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
  metadataBase: new URL('https://www.joe13th.com'),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
   },
};

async function SettingsLayout({ children }) {
    const initialSettings = await getSettings();
    return <Layout initialSettings={initialSettings}>{children}</Layout>;
}

export default function RootLayout({ children, params: { locale } }) {
    const messages = useMessages();

    return (
        <html lang={locale} dir={locale == 'en' ? 'ltr' : 'rtl'} className={`${montserrat.variable} ${cairo.variable} ${orbitron.variable} ${inter.variable}`}>
            <head>
                <meta name='google-site-verification' content='zJyIE3QZ-5AyKid90sn0qSevc_ChsFUc0aG_8hbOYj4' />
                <link rel='preconnect' href='https://back.joe13th.com' crossOrigin='anonymous' />
                <link rel='dns-prefetch' href='https://back.joe13th.com' />
            </head>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <body className={locale === 'en' ? 'font-montserrat' : 'font-cairo'}>
                    <SettingsLayout> {children} </SettingsLayout>
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
