'use client';

import { AtlasProvider } from '@atlasauth/react';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AtlasProvider
      publishableKey={process.env.NEXT_PUBLIC_ATLAS_PUBLISHABLE_KEY ?? ''}
      frontendApi={process.env.NEXT_PUBLIC_ATLAS_FRONTEND_API ?? 'https://atlasauth.net'}
    >
      {children}
    </AtlasProvider>
  );
}
