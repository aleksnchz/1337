'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function setAdminToken(token: string) {
  if (typeof window !== 'undefined') localStorage.setItem('ADMIN_TOKEN', token);
}
function getAdminToken(): string | null {
  if (typeof window !== 'undefined') return localStorage.getItem('ADMIN_TOKEN');
  return null;
}

export default function LoginPage() {
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const t = getAdminToken();
    if (t) router.push('/events');
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setAdminToken(token);
    router.push('/events');
  }

  return (
    <main>
      <h1 className="h1">Acceso admin</h1>
      <form onSubmit={handleSubmit} className="card">
        <label>Admin Token</label>
        <input
          value={token}
          onChange={(e)=>setToken(e.target.value)}
          placeholder="Introduce tu ADMIN_TOKEN"
        />
        <div style={{marginTop:12}}>
          <button className="btn" type="submit">Entrar</button>
        </div>
      </form>
      <p style={{opacity:.7, marginTop: 12}}>
        Configura el token en Vercel (variable <code>ADMIN_TOKEN</code>) y pégalo aquí para esta demo.
      </p>
    </main>
  );
}
