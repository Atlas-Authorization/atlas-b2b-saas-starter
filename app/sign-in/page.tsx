'use client';

import { SignIn } from '@atlasauth/react';

export default function SignInPage() {
  return (
    <main style={{ maxWidth: 420, margin: '4rem auto', padding: '0 1rem' }}>
      <SignIn />
    </main>
  );
}
