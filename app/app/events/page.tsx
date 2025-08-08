'use client';
import { useEffect, useState } from 'react';

export default function EventsPage() {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(true), []);
  return (
    <main>
      <h1 className="h1">Eventos</h1>
      <p style={{opacity:.8}}>Ruta /events cargada correctamente.</p>
    </main>
  );
}
