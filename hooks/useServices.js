import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function useServices() {
  const [services, setservices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchservices() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/services?limit=10000`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();
        setservices(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchservices();
  }, []);

  return { services, loading, error };
}
