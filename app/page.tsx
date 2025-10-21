"use client";

import { useState } from "react";

export default function LandingServiciosPyMEs() {
  const [form, setForm] = useState({ name: "", email: "", company: "", industry: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          industry: form.industry,
          message: form.message,
          utm_source: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_source") : null,
          utm_medium: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_medium") : null,
        }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setStatus("ok");
      setForm({ name: "", email: "", company: "", industry: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Ocurrió un error al enviar.";
      setError(msg);
    }
  };

  const Item = ({ children }: { children: React.ReactNode }) => (
    <li className="flex gap-2 items-start"><span className="mt-1 h-2 w-2 rounded-full bg-purple-600" /> <span>{children}</span></li>
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold text-xl text-purple-800">Asesoría Datos</div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#industrias" className="hover:opacity-70">Industrias</a>
            <a href="#servicios" className="hover:opacity-70">Servicios</a>
            <a href="#precios" className="hover:opacity-70">Planes</a>
            <a href="#contacto" className="hover:opacity-70">Contacto</a>
          </nav>
          <a href="#contacto" className="inline-flex items-center rounded-2xl px-4 py-2 bg-purple-800 text-white text-sm hover:bg-purple-900 focus:ring-2 focus:ring-purple-300 transition-colors">Agenda una demo</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-purple-100 to-white">
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Analítica, IA y Automatización para PyMEs</h1>
            <p className="mt-4 text-lg text-gray-600">Implementamos datos accionables, dashboards y flujos automatizados para PyMEs de distintas industrias (comercio, servicios, operaciones). Menos tareas repetitivas, más crecimiento.</p>
            <div className="mt-6 flex gap-3">
              <a href="#contacto" className="rounded-2xl px-5 py-3 bg-purple-800 text-white text-sm">Empezar</a>
              <a href="#servicios" className="rounded-2xl px-5 py-3 border border-purple-300 text-sm text-purple-800 hover:bg-purple-50 focus:ring-2 focus:ring-purple-300 transition-colors">Ver servicios</a>
            </div>
            
          </div>
          <div className="md:pl-10">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Checklist de implementación</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <Item>Definición de KPIs por industria</Item>
                <Item>Conexión de datos desde sistemas internos y planillas</Item>
                <Item>Dashboard operativo y reportes ejecutivos</Item>
                <Item>Automatizaciones de procesos, recordatorios y reportes</Item>
                <Item>Modelos predictivos de demanda, retención y mantención</Item>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIAS */}
      <section id="industrias" className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-r from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Qué entregamos por industria</h2>
          <p className="mt-2 text-gray-600">Paquetes listos para acelerar resultados y estandarizar la operación.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {/* Restaurantes */}
            <div className="rounded-3xl border p-6 bg-white shadow-sm">
              <h3 className="font-semibold text-lg text-purple-800">Comercio y Retail</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <Item>Dashboard diario: ventas, ticket promedio e inventario</Item>
                <Item>Pronóstico de demanda por producto y franja horaria</Item>
                <Item>Optimización de inventario y compras</Item>
                <Item>Automatización de campañas y recordatorios</Item>
              </ul>
            </div>

            {/* Peluquerías */}
            <div className="rounded-3xl border p-6 bg-white shadow-sm">
              <h3 className="font-semibold text-lg text-purple-800">Servicios Profesionales</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <Item>Agendamiento online y recordatorios</Item>
                <Item>Panel de productividad por servicio/colaborador</Item>
                <Item>Reactivación de clientes inactivos (churn)</Item>
                <Item>Control de stock e insumos</Item>
              </ul>
            </div>

            {/* Empresas de Ingeniería */}
            <div className="rounded-3xl border p-6 bg-white shadow-sm">
              <h3 className="font-semibold text-lg text-purple-800">Operaciones y Manufactura</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <Item>Pipeline de proyectos y margen por cliente</Item>
                <Item>Tablero de avances y alertas de hitos</Item>
                <Item>Estimación de demanda y capacidad</Item>
                <Item>Integraciones IIoT/PLC y mantenimiento predictivo</Item>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS TRANSVERSALES */}
      <section id="servicios" className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-l from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Servicios</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border p-6 bg-white">
              <h3 className="font-semibold">Data & Analytics</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <Item>Modelado de datos y canalizaciones</Item>
                <Item>KPIs y dashboards operativos</Item>
                <Item>Calidad y gobierno de datos básico</Item>
              </ul>
            </div>
            <div className="rounded-3xl border p-6 bg-white">
              <h3 className="font-semibold">IA Aplicada</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <Item>Pronósticos (ventas, demanda, no-shows)</Item>
                <Item>Segmentación y churn</Item>
                <Item>Mantenimiento predictivo</Item>
              </ul>
            </div>
            <div className="rounded-3xl border p-6 bg-white">
              <h3 className="font-semibold">Automatización</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <Item>Flujos automatizados y asistentes operativos</Item>
                <Item>Reportes automáticos por canales de comunicación</Item>
                <Item>Integraciones con sistemas internos y hojas de cálculo</Item>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-r from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Planes</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border p-6">
              <h3 className="font-semibold">MVP</h3>
              <p className="text-sm text-gray-600 mt-2">Alcance inicial para validar KPIs y flujos de trabajo</p>
              <p className="text-3xl font-bold mt-4">$</p>
              <a href="#contacto" className="mt-6 inline-flex rounded-2xl px-4 py-2 border">Consultar</a>
            </div>
            <div className="rounded-3xl border p-6 ring-2 ring-purple-800">
              <h3 className="font-semibold">Operativo</h3>
              <p className="text-sm text-gray-600 mt-2">Implementación integral con múltiples fuentes y automatizaciones clave</p>
              <p className="text-3xl font-bold mt-4">$$</p>
              <a href="#contacto" className="mt-6 inline-flex rounded-2xl px-4 py-2 border">Consultar</a>
            </div>
            <div className="rounded-3xl border p-6">
              <h3 className="font-semibold">Escala</h3>
              <p className="text-sm text-gray-600 mt-2">Arquitectura de datos, modelos avanzados y automatizaciones extendidas</p>
              <p className="text-3xl font-bold mt-4">$$$</p>
              <a href="#contacto" className="mt-6 inline-flex rounded-2xl px-4 py-2 border">Consultar</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-l from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Conversemos</h2>
          <p className="mt-2 text-gray-600">Cuéntame tu industria y desafío. Te respondo con una propuesta en 24h hábiles.</p>
          <form onSubmit={submit} className="mt-8 grid md:grid-cols-2 gap-4">
            <input required placeholder="Nombre" className="rounded-2xl border p-3" value={form.name} onChange={e=>setForm({ ...form, name: e.target.value })} />
            <input required type="email" placeholder="Email" className="rounded-2xl border p-3" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} />
            <input placeholder="Empresa" className="rounded-2xl border p-3" value={form.company} onChange={e=>setForm({ ...form, company: e.target.value })} />
            <select className="rounded-2xl border p-3" value={form.industry} onChange={e=>setForm({ ...form, industry: e.target.value })}>
              <option value="">Industria</option>
              <option>Comercio / Retail</option>
              <option>Servicios Profesionales</option>
              <option>Operaciones / Manufactura</option>
              <option>Salud</option>
              <option>Logística</option>
              <option>Otra</option>
            </select>
            <textarea placeholder="Mensaje" className="rounded-2xl border p-3 md:col-span-2 min-h-[120px]" value={form.message} onChange={e=>setForm({ ...form, message: e.target.value })} />
            <div className="md:col-span-2 flex items-center gap-3">
              <button disabled={status==="sending"} className="rounded-2xl px-5 py-3 bg-purple-800 text-white disabled:opacity-50">{status === "sending" ? "Enviando…" : "Enviar"}</button>
              {status === "ok" && <span className="text-green-600 text-sm">¡Gracias! Te escribiré pronto.</span>}
              {status === "error" && <span className="text-red-600 text-sm">{error}</span>}
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Asesoría Datos — Todos los derechos reservados</div>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-70">Términos</a>
            <a href="#" className="hover:opacity-70">Privacidad</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
