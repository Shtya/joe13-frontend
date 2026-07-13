import { baseUrl } from '@/helpers/baseUrl';

export async function getPageData(page_name) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/pages/${page_name}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}
