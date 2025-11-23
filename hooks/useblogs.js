import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function useBlogs() {
  const [blogs, setblogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchblogs() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/blogs?blogs?sortBy=created_at&sortOrder=DESC&limit=10000`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();
        setblogs(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchblogs();
  }, []);

  return { blogs, loading, error };
}
