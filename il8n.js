
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ar"];

export default getRequestConfig(async ({ locale }) => {

  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./langs/${locale}.js`)).default,
  };
});



        // sitemap , robots , google search console code
