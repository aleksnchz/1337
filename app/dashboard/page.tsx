'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function getAdminToken(): string | null {
  if (typeof window !== 'undefined') return localStorage.getItem('ADMIN_TOKEN');
  return null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = getAdminToken();
    if (!t) router.replace('/login');
    else setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <main>
      <h1 className="h1">Dashboard</h1>
      <div className="card" style={{ marginBottom: 16 }}>
        <p>Bienvenido al panel de control. Aquí verás KPIs y accesos rápidos.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Eventos</h3>
          <p style={{ opacity: .8 }}>Crear y gestionar eventos</p>
          <Link href="/events"><button className="btn">Ir a Eventos</button></Link>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Usuarios (próx.)</h3>
          <p style={{ opacity: .8 }}>Ver miembros y perfiles</p>
          <button className="btn" disabled>Próximamente</button>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Métricas (próx.)</h3>
          <p style={{ opacity: .8 }}>Participación y matches</p>
          <button className="btn" disabled>Próximamente</button>
        </div>

        <div className="card">
          <h3 style={{ marginTop: 0 }}>Config (próx.)</h3>
          <p style={{ opacity: .8 }}>Ajustes del sistema</p>
          <button className="btn" disabled>Próximamente</button>
        </div>
      </div>
    </main>
  );
}
