import { baseUrl } from '@/helpers/baseUrl';
import { SITE_URL } from '@/helpers/seo';

// /llms.txt — a plain-markdown site map for AI search engines and LLM crawlers
// (https://llmstxt.org). Services are pulled from the CMS so the list stays current.
export const revalidate = 3600;

async function loadServices() {
    try {
        const res = await fetch(`${baseUrl}/api/v1/services?limit=10000`, { next: { revalidate } });
        if (!res.ok) return [];
        const json = await res.json();
        return Array.isArray(json?.data) ? json.data.filter(s => s?.slug) : [];
    } catch {
        return [];
    }
}

export async function GET() {
    const services = await loadServices();
    const serviceLines = services.map(s => `- [${(s.title?.ar || s.title?.en || s.slug).trim()}](${SITE_URL}/services/${s.slug})`);

    const body = [
        '# JOE13 - B2B Solutions in Saudi Arabia',
        '',
        '> JOE13 يوفر خدمات وحلول متقدمة لقطاع الأعمال في جميع أنحاء المملكة العربية السعودية.',
        '',
        '## Main Sections',
        '',
        `- [الرئيسية](${SITE_URL}/)`,
        `- [من نحن](${SITE_URL}/about-us)`,
        `- [مشاريعنا](${SITE_URL}/projects)`,
        `- [الخدمات](${SITE_URL}/services)`,
        `- [المدونة](${SITE_URL}/blogs)`,
        `- [انضم إلينا](${SITE_URL}/join-us)`,
        `- [اتصل بنا](${SITE_URL}/contact-us)`,
        '',
        ...(serviceLines.length ? ['## Services', '', ...serviceLines, ''] : []),
        '## English',
        '',
        `- [Home](${SITE_URL}/en)`,
        `- [Services](${SITE_URL}/en/services)`,
        `- [Projects](${SITE_URL}/en/projects)`,
        `- [Contact](${SITE_URL}/en/contact-us)`,
        '',
        '## Coverage Area',
        '',
        '- المملكة العربية السعودية (جميع المناطق والمحافظات): الرياض، مكة المكرمة، المدينة المنورة، المنطقة الشرقية، القصيم، عسير، تبوك، حائل، الحدود الشمالية، جازان، نجران، الباحة، الجوف',
        '',
    ].join('\n');

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
