'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function getAdminToken(): string | null {
  if (typeof window !== 'undefined') return localStorage.getItem('ADMIN_TOKEN');
  return null;
}

export default function EventsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = getAdminToken();
    if (!t) router.replace('/login'); // si no hay token, manda al login
    else setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <main>
      <h1 className="h1">Eventos</h1>
      <div className="card">Ruta /events cargada correctamente.</div>
    </main>
  );
}
