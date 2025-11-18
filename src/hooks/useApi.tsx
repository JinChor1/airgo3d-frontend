import { useState, useEffect, useCallback } from 'react';

export default function useApi<T = unknown>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const url = 'http://localhost:3001' + path;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const jsonData = await response.json();
      setData(jsonData as T);
      setLoading(false);
      return jsonData as T;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err);
      else setError(new Error('An unknown error occurred'));
      setLoading(false);
      return null;
    }
  }, [url]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const refetch = async () => {
    return await fetchData();
  };

  return { data, loading, error, refetch } as const;
}
