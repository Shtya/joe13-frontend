import { baseUrl } from '@/helpers/baseUrl';

export { BLOGS_QUERY, PROJECTS_QUERY, TEAM_QUERY } from '@/hooks/queries';

export async function getPageData(page_name) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/pages/${page_name}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function getCollection(query) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/${query}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}
