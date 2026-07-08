import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Allan Binu — Software Engineer / Security Researcher';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#F2EDE3',
          backgroundImage:
            'linear-gradient(to right, rgba(13,13,13,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,13,13,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            border: '3px solid #0D0D0D',
            background: '#FF2E63',
            color: '#F2EDE3',
            padding: '8px 18px',
            fontSize: 20,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 2,
            transform: 'rotate(-3deg)',
          }}
        >
          Tempe, Arizona
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 104,
            fontWeight: 800,
            color: '#0D0D0D',
            textTransform: 'uppercase',
            lineHeight: 0.95,
            marginTop: 28,
          }}
        >
          Allan Binu
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#0D0D0D',
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          Software Engineer · Blockchain Developer · Security Researcher
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 22,
            fontFamily: 'monospace',
            color: '#0D0D0D',
            background: '#D9FF00',
            border: '3px solid #0D0D0D',
            padding: '10px 20px',
            alignSelf: 'flex-start',
          }}
        >
          github.com/abinu2
        </div>
      </div>
    ),
    { ...size },
  );
}
