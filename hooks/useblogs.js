'use client';

import { baseUrl } from '@/helpers/baseUrl';
import { BLOGS_QUERY } from '@/hooks/queries';
import { useEffect, useState } from 'react';

export function useBlogs(initialBlogs) {
  const [blogs, setblogs] = useState(initialBlogs ?? null);
  const [loading, setLoading] = useState(!initialBlogs);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialBlogs) return;
    async function fetchblogs() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/${BLOGS_QUERY}`);

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
  }, [initialBlogs]);

  return { blogs, loading, error };
}
