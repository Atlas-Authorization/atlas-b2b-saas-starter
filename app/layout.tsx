import type { ReactNode } from 'react';
import { Providers } from './providers';

export const metadata = {
  title: 'Atlas B2B SaaS starter',
  description: 'A multi-tenant B2B starter powered by Atlas organizations.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
