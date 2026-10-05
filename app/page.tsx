'use client';

import {
  SignedIn,
  SignedOut,
  UserButton,
  OrganizationSwitcher,
  useOrganization,
  useUser,
} from '@atlasauth/react';
import Link from 'next/link';

export default function Home() {
  const { user } = useUser();
  const { organization } = useOrganization();

  return (
    <main style={{ maxWidth: 640, margin: '4rem auto', padding: '0 1rem' }}>
      <h1>Acme B2B</h1>
      <p>A multi-tenant SaaS starter built on Atlas organizations.</p>

      <SignedOut>
        <p>
          <Link href="/sign-in">Sign in</Link> to access your workspace.
        </p>
      </SignedOut>

      <SignedIn>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          {/* The org switcher lets a member pick, create, or leave an organization.
              Picking one sets the active org, which flows into the session claims. */}
          <OrganizationSwitcher />
          <UserButton />
        </div>
        <p>Signed in as {user?.first_name ?? user?.id}.</p>
        <p>
          Active organization: <strong>{organization?.name ?? 'none selected'}</strong>
        </p>
        <p>
          <Link href="/dashboard">Open the org dashboard →</Link>
        </p>
      </SignedIn>
    </main>
  );
}
