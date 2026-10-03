'use client';

import { TEAM_QUERY } from '@/hooks/queries';
import { baseUrl } from '@/helpers/baseUrl';
import { useEffect, useState } from 'react';

export function useTeamMemeberData(initialTeam) {
  const [data, setData] = useState(initialTeam ?? null);
  const [loading, setLoading] = useState(!initialTeam);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialTeam) return;
    async function fetchData() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/${TEAM_QUERY}`);

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
  }, [initialTeam]);

  return { data, loading, error };
}
