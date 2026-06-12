import type { Metadata } from 'next';
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

const display = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-abinu2s-projects.vercel.app'),
  title: 'ALLAN BINU — Software Engineer / Security Researcher',
  description:
    'Blockchain developer, cybersecurity researcher, and full-stack engineer. CS student at Arizona State University. No templates were harmed.',
  openGraph: {
    title: 'ALLAN BINU',
    description: 'Blockchain · Cybersecurity · AI — a neo-brutalist portfolio',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
