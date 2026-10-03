'use client';

import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function usePages({ page_name, initialData }) {
  const [data, setData] = useState(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) return;

    async function fetchData() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/pages/${page_name}`);
        if (!res.ok) throw new Error('Error fetching page data');
        setData(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (page_name) fetchData();
  }, [page_name, initialData]);

  return { data, loading, error };
}
