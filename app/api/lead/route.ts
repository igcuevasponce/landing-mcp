import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body?.email || !body?.name) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }
  console.log('Nuevo lead:', body) // luego conectamos Supabase o n8n
  return NextResponse.json({ ok: true })
}
