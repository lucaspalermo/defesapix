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

  // Envia para GA4 se disponível
  if (typeof (window as unknown as Record<string, unknown>).gtag === 'function') {
    const gtag = (window as unknown as Record<string, unknown>).gtag as (...args: unknown[]) => void;
    gtag('event', tipo, dados ?? {});
  }

  // Envia para Meta Pixel se disponível
  if (typeof (window as unknown as Record<string, unknown>).fbq === 'function') {
    const fbq = (window as unknown as Record<string, unknown>).fbq as (...args: unknown[]) => void;
    fbq('trackCustom', tipo, dados ?? {});
  }
}

/** Trackeia clique em CTA */
export function trackCTA(label: string, destination?: string) {
  track('cta_click', { label, destination });
}

/** Trackeia início de pagamento */
export function trackCheckoutStart(produto: string, valor: number) {
  track('checkout_start', { produto, valor });
  // Google Ads conversion — início de checkout
  if (typeof (window as unknown as Record<string, unknown>).gtag === 'function') {
    const gtag = (window as unknown as Record<string, unknown>).gtag as (...args: unknown[]) => void;
    gtag('event', 'begin_checkout', { currency: 'BRL', value: valor, items: [{ item_name: produto }] });
  }
  // Meta Pixel — InitiateCheckout
  if (typeof (window as unknown as Record<string, unknown>).fbq === 'function') {
    const fbq = (window as unknown as Record<string, unknown>).fbq as (...args: unknown[]) => void;
    fbq('track', 'InitiateCheckout', { currency: 'BRL', value: valor, content_name: produto });
  }
}

/** Trackeia pagamento confirmado — CONVERSÃO PRINCIPAL */
export function trackPurchase(produto: string, valor: number, paymentId?: string) {
  track('purchase', { produto, valor, paymentId });
  // Google Ads conversion — compra
  if (typeof (window as unknown as Record<string, unknown>).gtag === 'function') {
    const gtag = (window as unknown as Record<string, unknown>).gtag as (...args: unknown[]) => void;
    // GA4 purchase event
    gtag('event', 'purchase', { transaction_id: paymentId, currency: 'BRL', value: valor, items: [{ item_name: produto }] });
    // Google Ads conversion — SEMPRE dispara com send_to hardcoded
    gtag('event', 'conversion', {
      send_to: 'AW-18009766174/YXheCOne84YcEJ7y3ItD',
      value: valor,
      currency: 'BRL',
      transaction_id: paymentId || '',
    });
  }
  // Meta Pixel — Purchase
  if (typeof (window as unknown as Record<string, unknown>).fbq === 'function') {
    const fbq = (window as unknown as Record<string, unknown>).fbq as (...args: unknown[]) => void;
    fbq('track', 'Purchase', { currency: 'BRL', value: valor, content_name: produto });
  }
}

/** Trackeia diagnóstico gratuito concluído */
export function trackDiagnostico(tipoGolpe: string) {
  track('diagnostico_completo', { tipoGolpe });
  // Meta Pixel — Lead
  if (typeof (window as unknown as Record<string, unknown>).fbq === 'function') {
    const fbq = (window as unknown as Record<string, unknown>).fbq as (...args: unknown[]) => void;
    fbq('track', 'Lead', { content_name: tipoGolpe });
  }
}

/** Trackeia download/geração de PDF */
export function trackPDFGerado(tipo: string) {
  track('pdf_gerado', { tipo });
}

/** Trackeia lead capturado (email) */
export function trackLead(origem: string) {
  track('lead_capturado', { origem });
  // Meta Pixel — CompleteRegistration
  if (typeof (window as unknown as Record<string, unknown>).fbq === 'function') {
    const fbq = (window as unknown as Record<string, unknown>).fbq as (...args: unknown[]) => void;
    fbq('track', 'CompleteRegistration', { content_name: origem });
  }
}

/** Trackeia quando modal de pagamento é exibido */
export function trackPaymentModalShown(produto: string, valor: number) {
  track('payment_modal_shown', { produto, valor });
}

/** Trackeia quando código PIX é copiado */
export function trackPixCopied() {
  track('pix_code_copied');
}

/** Trackeia formulário iniciado */
export function trackFormStarted(formulario: string) {
  track('form_started', { formulario });
}
