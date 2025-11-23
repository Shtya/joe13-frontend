import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function useSetting() {
  const [settings, setsettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchsettings() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/settings`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();
        setsettings(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchsettings();
  }, []);

  return { settings, loading, error };
}
