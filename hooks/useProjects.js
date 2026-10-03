'use client';

import { baseUrl } from '@/helpers/baseUrl';
import { PROJECTS_QUERY } from '@/hooks/queries';
import { useEffect, useState } from 'react';

export function useProjects(initialProjects) {
  const [projects, setprojects] = useState(initialProjects ?? null);
  const [loading, setLoading] = useState(!initialProjects);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialProjects) return;
    async function fetchprojects() {
      try {
        const res = await fetch(`${baseUrl}/api/v1/${PROJECTS_QUERY}`);

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
  }, [initialProjects]);

  return { projects, loading, error };
}
