import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function useSetting(initialSettings) {
  const [settings, setsettings] = useState(initialSettings ?? null);
  const [loading, setLoading] = useState(!initialSettings);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialSettings) return;

    async function fetchsettings() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/settings`);

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
  }, [initialSettings]);

  return { settings, loading, error };
}
