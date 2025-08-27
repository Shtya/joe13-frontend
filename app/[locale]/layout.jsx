// Importing fonts from Google Fonts
import { useMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import '@/style/tailwind.css';
import Layout from '@/components/template/Layout';
import { baseUrl } from '@/helpers/baseUrl';

export async function getSettings() {
    const res = await fetch(`${baseUrl}/api/v1/settings`);
    if (!res.ok) return null;
    const setting = await res.json()
    return setting?.custom_scripts;
}

export const metadata = {
  icons: {
    icon: "/favicon.ico",          
    shortcut: "/favicon.ico",      
   },
};

export default function RootLayout({ children, params: { locale } }) {
    const messages = useMessages();

    return (
        <html lang={locale} dir={locale == 'en' ? 'ltr' : 'rtl'}>
            <head>
                <meta name='google-site-verification' content='zJyIE3QZ-5AyKid90sn0qSevc_ChsFUc0aG_8hbOYj4' />
                <link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Cairo:wght@900&display=swap' rel='stylesheet' />
                
  
            </head>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <body className={locale === 'en' ? 'font-montserrat' : 'font-cairo'}>
                    <Layout> {children} </Layout>
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
