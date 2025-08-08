// app/page.tsx
import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <h1 className="h1">1337 — Admin</h1>
      <div className="card" style={{marginBottom: 16}}>
        <p>Bienvenido al panel admin de 1337.</p>
      </div>

      {/* ESTE a /login */}
      <Link href="/login"><button className="btn">Entrar</button></Link>
      <span style={{marginLeft: 12}} />

      {/* ESTE a /events */}
      <Link href="/events"><button className="btn">Eventos</button></Link>
    </main>
  );
}
