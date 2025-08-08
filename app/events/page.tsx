'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function getAdminToken(): string | null {
  if (typeof window !== 'undefined') return localStorage.getItem('ADMIN_TOKEN');
  return null;
}

type Event = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  starts_at: string;
  prematch_start?: string;
  prematch_end?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export default function EventsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    starts_at: '',
    prematch_start: '',
    prematch_end: '',
  });

  // Guard: si no hay token, manda a login
  useEffect(() => {
    const t = getAdminToken();
    if (!t) router.replace('/login');
    else setReady(true);
  }, [router]);

  async function apiGet(path: string) {
    const token = getAdminToken() || '';
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
    return res.json();
  }

  async function apiPost(path: string, body: any) {
    const token = getAdminToken() || '';
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${path} -> ${res.status}`);
    return res.json();
  }

  async function load() {
    try {
      const data = await apiGet('/events');
      setEvents(data);
    } catch (e) {
      // Si el backend aún no está listo, no pasa nada
      console.warn('No se pudo cargar /events aún:', e);
    }
  }

  useEffect(() => {
    if (ready) load();
  }, [ready]);

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiPost('/events', form);
      setForm({ title: '', description: '', location: '', starts_at: '', prematch_start: '', prematch_end: '' });
      await load();
      alert('Evento creado');
    } catch (e: any) {
      alert('Error al crear evento: ' + e.message);
    }
  }

  if (!ready) return null;

  return (
    <main>
      <h1 className="h1">Eventos</h1>

      {/* Formulario de creación */}
      <div className="card" style={{ marginBottom: 16 }}>
        <form onSubmit={createEvent}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <input placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Lugar" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            <input placeholder="Descripción" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input placeholder="starts_at (YYYY-MM-DD HH:mm)" value={form.starts_at} onChange={e => setForm({ ...form, starts_at: e.target.value })} />
            <input placeholder="prematch_start (YYYY-MM-DD HH:mm)" value={form.prematch_start} onChange={e => setForm({ ...form, prematch_start: e.target.value })} />
            <input placeholder="prematch_end (YYYY-MM-DD HH:mm)" value={form.prematch_end} onChange={e => setForm({ ...form, prematch_end: e.target.value })} />
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn" type="submit">Crear evento</button>
          </div>
        </form>
      </div>

      {/* Listado */}
      <div className="card">
        {events.length === 0 ? (
          <p style={{ opacity: .7 }}>No hay eventos todavía.</p>
        ) : (
          <ul>
            {events.map(ev => (
              <li key={ev.id} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 600 }}>{ev.title}</div>
                <div style={{ opacity: .8 }}>{ev.location} — {new Date(ev.starts_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
