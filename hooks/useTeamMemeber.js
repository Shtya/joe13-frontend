import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function useTeamMemeberData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/team-members?limit=30&sortBy=order&sortOrder=ASC`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
