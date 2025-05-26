import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function useProjects() {
  const [projects, setprojects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchprojects() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/projects?limit=10000`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();
        setprojects(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchprojects();
  }, []);

  return { projects, loading, error };
}
