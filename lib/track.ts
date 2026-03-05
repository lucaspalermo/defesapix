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

  // Também envia para GA4 se disponível
  if (typeof (window as Record<string, unknown>).gtag === 'function') {
    const gtag = (window as Record<string, unknown>).gtag as (...args: unknown[]) => void;
    gtag('event', tipo, dados ?? {});
  }
}

/** Trackeia clique em CTA */
export function trackCTA(label: string, destination?: string) {
  track('cta_click', { label, destination });
}

/** Trackeia início de pagamento */
export function trackCheckoutStart(produto: string, valor: number) {
  track('checkout_start', { produto, valor });
}

/** Trackeia pagamento confirmado */
export function trackPurchase(produto: string, valor: number, paymentId?: string) {
  track('purchase', { produto, valor, paymentId });
}

/** Trackeia diagnóstico gratuito concluído */
export function trackDiagnostico(tipoGolpe: string) {
  track('diagnostico_completo', { tipoGolpe });
}

/** Trackeia download/geração de PDF */
export function trackPDFGerado(tipo: string) {
  track('pdf_gerado', { tipo });
}

/** Trackeia lead capturado (email) */
export function trackLead(origem: string) {
  track('lead_capturado', { origem });
}
