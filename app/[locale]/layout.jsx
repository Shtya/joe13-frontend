// Importing fonts from Google Fonts
import { useMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import Head from 'next/head';

import "@/style/tailwind.css"
import Layout from "@/components/template/Layout";

export const metadata = {
  title: "Joe13 Website",
  description: "Joe13 Company",
};

export default function RootLayout({ children, params: { locale } }) {
  const messages = useMessages();

  return (
    <html lang={locale} dir={locale == "en" ? "ltr" : "rtl"}>
      <head>
        <meta name="google-site-verification" content="zJyIE3QZ-5AyKid90sn0qSevc_ChsFUc0aG_8hbOYj4" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Cairo:wght@900&display=swap" rel="stylesheet" />
      </head>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={locale === "en" ? "font-montserrat" : "font-cairo"}>
          <Layout>
            {children}
          </Layout>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
