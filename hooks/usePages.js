import { useEffect, useState } from 'react';
import { getPageData } from './getPageData';

export function usePages({ page_name, initialData }) {
  const [data, setData] = useState(initialData ?? null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) return;

    async function fetchData() {
      try {
        const json = await getPageData(page_name);
        if (!json) throw new Error('Error fetching page data');
        setData(json);
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
