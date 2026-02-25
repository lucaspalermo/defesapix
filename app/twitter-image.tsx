import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DefesaPix — Recupere seu Dinheiro após Golpe Pix';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #09090F 0%, #0F1029 50%, #09090F 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            display: 'flex',
          }}
        />

        {/* Green glow accent */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Shield icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            boxShadow: '0 0 40px rgba(16,185,129,0.4)',
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-2px',
            marginBottom: '16px',
            display: 'flex',
          }}
        >
          Defesa
          <span style={{ color: '#10B981' }}>Pix</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '700px',
            textAlign: 'center',
            lineHeight: 1.4,
            display: 'flex',
          }}
        >
          Recupere seu dinheiro após golpe digital
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(90deg, #10B981, #059669, #10B981)',
            display: 'flex',
          }}
        />

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.4)',
            display: 'flex',
          }}
        >
          defesapix.com.br
        </div>
      </div>
    ),
    { ...size },
  );
}
