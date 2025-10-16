'use client'
import { useState } from 'react'

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setErr(null)
    const f = e.currentTarget
    const body = {
      name: (f.elements.namedItem('name') as HTMLInputElement).value,
      email: (f.elements.namedItem('email') as HTMLInputElement).value,
    }
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    res.ok ? setOk(true) : setErr('No pudimos enviar tu solicitud')
    setLoading(false)
  }

  return (
    <main className="min-h-screen grid place-items-center px-6">
      <section className="max-w-4xl w-full grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            KPIs y Automatización para tu empresa
          </h1>
          <p className="mt-4 text-lg opacity-80">
            Implementamos dashboards y workflows en semanas, no meses.
          </p>
          <ul className="mt-6 list-disc pl-5 space-y-2">
            <li>Dashboards de 10–12 KPIs</li>
            <li>Automatizaciones con n8n</li>
            <li>ROI claro y medible</li>
          </ul>
        </div>

        <div className="border rounded-2xl p-6">
          {ok ? (
            <p className="text-green-600">¡Gracias! Te contactaremos pronto.</p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold">Pide una demo</h2>
              <div>
                <label className="block text-sm mb-1">Nombre</label>
                <input name="name" required className="w-full border rounded-xl px-3 py-2 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input type="email" name="email" required className="w-full border rounded-xl px-3 py-2 bg-transparent" />
              </div>
              {err && <p className="text-red-600 text-sm">{err}</p>}
              <button disabled={loading} className="w-full border rounded-xl px-4 py-2 font-semibold">
                {loading ? 'Enviando…' : 'Quiero más información'}
              </button>
              <p className="text-xs opacity-70">Sin spam. Política de privacidad.</p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
