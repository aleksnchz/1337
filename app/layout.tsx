import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '1337 Admin',
  description: 'Admin panel for 1337 events',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen" style={{ background:'#0A0A0A', color:'#fff' }}>
        <div className="max-w-4xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
