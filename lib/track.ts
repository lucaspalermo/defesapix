/** Fire-and-forget analytics event */
export function track(
  tipo: string,
  dados?: Record<string, unknown>,
) {
  if (typeof window === 'undefined') return;

  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tipo,
      pagina: window.location.pathname,
      dados,
    }),
  }).catch(() => {}); // silent
}
