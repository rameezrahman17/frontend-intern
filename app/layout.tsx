import type { Metadata } from 'next';
import { Quicksand, Fredoka, Dancing_Script } from 'next/font/google';
import './globals.css';

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  display: 'swap',
});

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  display: 'swap',
});

const dancingScript = Dancing_Script({
  variable: '--font-dancing-script',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'For Sanskrtiti 💗',
  description: 'A special birthday surprise, just for you.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${quicksand.variable} ${fredoka.variable} ${dancingScript.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
