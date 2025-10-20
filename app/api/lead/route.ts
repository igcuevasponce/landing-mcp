// app/api/lead/route.ts
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // SOLO servidor
);

export async function GET() {
  return NextResponse.json({ ok: true, msg: 'Use POST /api/lead' });
}

export async function POST(req: Request) {
  // Acepta JSON y también <form method="POST">
  let name: string | null = null;
  let email: string | null = null;
  let utm_source: string | null = null;
  let utm_medium: string | null = null;

  try {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await req.json();
      name = body?.name ?? null;
      email = body?.email ?? null;
      utm_source = body?.utm_source ?? null;
      utm_medium = body?.utm_medium ?? null;
    } else {
      const fd = await req.formData();
      name = String(fd.get('name') ?? '');
      email = String(fd.get('email') ?? '');
      utm_source = (fd.get('utm_source') as string) ?? null;
      utm_medium = (fd.get('utm_medium') as string) ?? null;
    }
  } catch {}

  if (!name || !email) {
    return NextResponse.json({ error: 'name y email son requeridos' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({ name, email, utm_source, utm_medium })
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 200 });
}

