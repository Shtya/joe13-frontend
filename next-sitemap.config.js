/** @type {import('next-sitemap').IConfig} */
const BACKEND_URL = 'https://back.joe13th.com';
const STATIC_PATHS = ['', 'about-us', 'contact-us', 'blogs', 'join-us', 'projects'];

async function fetchSlugs(endpoint) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/${endpoint}?limit=10000`);
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data || []).map((item) => item.slug).filter(Boolean);
  } catch {
    return [];
  }
}

module.exports = {
  siteUrl: 'https://www.joe13th.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/*?section=*'], // استبعاد روابط الأقسام لتجنب المحتوى المكرر

  // next-sitemap can't auto-discover routes here since every page is a
  // dynamic [locale]/[slug] segment backed by the CMS — so we fetch the
  // real slugs (both locales: ar has no prefix, en is prefixed with /en,
  // matching navigation.js's localePrefix: 'as-needed' + defaultLocale: 'ar').
  additionalPaths: async (config) => {
    const [projects, services, blogs] = await Promise.all([
      fetchSlugs('projects'),
      fetchSlugs('services'),
      fetchSlugs('blogs'),
    ]);

    const dynamicPaths = [
      ...projects.map((slug) => `projects/${slug}`),
      ...services.map((slug) => `services/${slug}`),
      ...blogs.map((slug) => `blogs/${slug}`),
    ];

    const allPaths = [...STATIC_PATHS, ...dynamicPaths];

    const results = [];
    for (const path of allPaths) {
      const ar = path ? `/${path}` : '/';
      const en = path ? `/en/${path}` : '/en';
      results.push(await config.transform(config, ar));
      results.push(await config.transform(config, en));
    }
    return results;
  },
};
