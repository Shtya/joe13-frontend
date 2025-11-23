import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function useBlog({slug_name}) {
  const [blog, setblog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchblog() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/blogs/slug/${slug_name}`, {
          cache: 'no-store',
        });

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
  }, []);

  return { blog, loading, error };
}
