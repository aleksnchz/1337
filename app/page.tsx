import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <h1 className="h1">1337 — Admin</h1>
      <div className="card" style={{marginBottom: 16}}>
        <p>Bienvenido al panel admin de 1337. Este starter incluye:</p>
        <ul>
          <li>Login simple por token (localStorage)</li>
          <li>Vista de eventos (GET /events)</li>
          <li>Creación de eventos (POST /events)</li>
        </ul>
      </div>
      <Link href="/login"><button className="btn">Entrar</button></Link>
      <span style={{marginLeft: 12}} />
      <Link href="/events"><button className="btn">Eventos</button></Link>
    </main>
  );
}
