import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D0D0D',
          border: '2px solid #0D0D0D',
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#D9FF00',
            fontFamily: 'sans-serif',
          }}
        >
          A
        </span>
      </div>
    ),
    { ...size },
  );
}
