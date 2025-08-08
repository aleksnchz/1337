'use client';

import { useState, useEffect } from 'react';
import { setAdminToken, getAdminToken } from '../../lib/token';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const t = getAdminToken();
    if (t) {
      router.push('/(admin)/events');
    }
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setAdminToken(token);
    router.push('/(admin)/events');
  }

  return (
    <main>
      <h1 className="h1">Acceso admin</h1>
      <form onSubmit={handleSubmit} className="card">
        <label>Admin Token</label>
        <input value={token} onChange={(e)=>setToken(e.target.value)} placeholder="Introduce tu ADMIN_TOKEN" />
        <div style={{marginTop:12}}>
          <button className="btn" type="submit">Entrar</button>
        </div>
      </form>
      <p style={{opacity:.7, marginTop: 12}}>Configura el token en Vercel como variable <span className="mono">ADMIN_TOKEN</span> (y pégalo aquí para esta demo).</p>
    </main>
  );
}
