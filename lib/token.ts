'use client';

export function setAdminToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ADMIN_TOKEN', token);
  }
}

export function getAdminToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('ADMIN_TOKEN');
  }
  return null;
}
