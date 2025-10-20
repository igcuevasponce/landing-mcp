// lib/leads.ts
import { sbAdmin } from './supabase'

export type LeadPayload = {
  name: string
  email: string
  phone?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

export async function saveLead(payload: LeadPayload) {
  const clean = {
    name: String(payload.name).slice(0, 120),
    email: String(payload.email).toLowerCase().slice(0, 180),
    phone: payload.phone ?? null,
    utm_source: payload.utm_source ?? null,
    utm_medium: payload.utm_medium ?? null,
    utm_campaign: payload.utm_campaign ?? null,
    utm_content: payload.utm_content ?? null,
    utm_term: payload.utm_term ?? null,
  }
  const { error } = await sbAdmin().from('leads').insert(clean)
  if (error) throw new Error(error.message)
  return { ok: true }
}