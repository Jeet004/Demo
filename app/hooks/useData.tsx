"use client";
import { useEffect, useState } from 'react';

type State = { loading: boolean; error: string | null; data: any | null };

export default function useData() {
  const [state, setState] = useState<State>({ loading: true, error: null, data: null });
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/data');
        const json = await res.json();
        if (!mounted) return;
        if (!res.ok || json?.error) {
          setState({ loading: false, error: json?.message || `HTTP ${res.status}`, data: null });
        } else {
          setState({ loading: false, error: null, data: json.data });
        }
      } catch (e: any) {
        if (!mounted) return;
        setState({ loading: false, error: e?.message || 'Unknown client error', data: null });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  return state;
}
