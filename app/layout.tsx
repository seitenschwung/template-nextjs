import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Project template demo',
  description: 'Demo page of the Next.js blueprint. It passes the pipeline checks and is meant to be replaced.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
