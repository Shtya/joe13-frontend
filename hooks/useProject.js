import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function useProject({slug_name}) {
  const [project, setproject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchproject() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/projects/slug/${slug_name}`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();
        setproject(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchproject();
  }, []);

  return { project, loading, error };
}
