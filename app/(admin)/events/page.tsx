'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../../lib/api';
import { getAdminToken } from '../../../lib/token';

type Event = {
  id: string;
  title: string;
  description?: string;
  location?: string;
  starts_at: string;
  prematch_start?: string;
  prematch_end?: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    starts_at: '',
    prematch_start: '',
    prematch_end: '',
  });
  const token = getAdminToken();

  async function load() {
    try {
      const data = await apiGet('/events', token || undefined);
      setEvents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiPost('/events', form, token || undefined);
      setForm({
        title: '',
        description: '',
        location: '',
        starts_at: '',
        prematch_start: '',
        prematch_end: '',
      });
      await load();
      alert('Evento creado');
    } catch (e:any) {
      alert('Error al crear evento: ' + e.message);
    }
  }

  return (
    <main>
      <h1 className="h1">Eventos</h1>

      <div className="card" style={{marginBottom: 16}}>
        <form onSubmit={createEvent}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <input placeholder="Título" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
            <input placeholder="Lugar" value={form.location} onChange={e=>setForm({...form, location: e.target.value})} />
            <input placeholder="Descripción" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
            <input placeholder="starts_at (YYYY-MM-DD HH:mm)" value={form.starts_at} onChange={e=>setForm({...form, starts_at: e.target.value})} />
            <input placeholder="prematch_start (YYYY-MM-DD HH:mm)" value={form.prematch_start} onChange={e=>setForm({...form, prematch_start: e.target.value})} />
            <input placeholder="prematch_end (YYYY-MM-DD HH:mm)" value={form.prematch_end} onChange={e=>setForm({...form, prematch_end: e.target.value})} />
          </div>
          <div style={{marginTop:12}}>
            <button className="btn" type="submit">Crear evento</button>
          </div>
        </form>
      </div>

      <div className="card">
        {loading ? <p>Cargando…</p> : (
          <ul>
            {events.map(ev => (
              <li key={ev.id} style={{marginBottom:12}}>
                <div style={{fontWeight:600}}>{ev.title}</div>
                <div style={{opacity:.8}}>{ev.location} — {new Date(ev.starts_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
