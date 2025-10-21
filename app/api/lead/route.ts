// app/api/lead/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Lead = {
  name: string;
  email: string;
  company?: string | null;
  industry?: string | null;
  message?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  created_at?: string;
};

export async function GET() {
  return NextResponse.json({ ok: true, msg: "Use POST /api/lead" });
}

export async function POST(req: Request) {
  try {
    // Usa variables NO públicas en Vercel (Settings → Environment Variables → Production)
    const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return NextResponse.json(
        { ok: false, error: "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY" },
        { status: 500 }
      );
    }

    const supabase = createClient(url, serviceKey);

    // Acepta JSON o form-data
    const ct = req.headers.get("content-type") || "";
    let payload: Partial<Lead> = {};
    if (ct.includes("application/json")) {
      payload = await req.json();
    } else {
      const fd = await req.formData();
      payload = {
        name: (fd.get("name") as string) ?? "",
        email: (fd.get("email") as string) ?? "",
        company: (fd.get("company") as string) || null,
        industry: (fd.get("industry") as string) || null,
        message: (fd.get("message") as string) || null,
        utm_source: (fd.get("utm_source") as string) || null,
        utm_medium: (fd.get("utm_medium") as string) || null,
      };
    }

    const name = (payload.name ?? "").trim();
    const email = (payload.email ?? "").trim();
    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "name y email son requeridos" },
        { status: 400 }
      );
    }

    const insertRow: Lead = {
      name,
      email,
      company: payload.company ?? null,
      industry: payload.industry ?? null,
      message: payload.message ?? null,
      utm_source: payload.utm_source ?? null,
      utm_medium: payload.utm_medium ?? null,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("leads").insert(insertRow);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error inesperado";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}


