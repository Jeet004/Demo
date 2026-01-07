"use client";
import useData from './hooks/useData';

export default function Home() {
  const { loading, error, data } = useData();
  return (
    <main style={{ padding: 20 }}>
      <h1>Data Fetch Example</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 10 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
