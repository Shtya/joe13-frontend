import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function useBlog({slug_name, initialData}) {
  const [blog, setblog] = useState(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) return;

    async function fetchblog() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/blogs/slug/${slug_name}`);

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();
        setblog(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchblog();
  }, [slug_name, initialData]);

  return { blog, loading, error };
}
