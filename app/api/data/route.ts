import { NextResponse } from 'next/server';

export async function GET() {
  const externalUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  try {
    const res = await fetch(externalUrl, { next: { revalidate: 60 } });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: true, status: res.status, message: text || 'Upstream error' },
        { status: 502 }
      );
    }
    const data = await res.json();
    return NextResponse.json({ error: false, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: true, message: err?.message || 'Unknown error' }, { status: 500 });
  }
}
