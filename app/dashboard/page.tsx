import { auth, atlasClient } from '@atlasauth/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

/**
 * A protected ORG dashboard (server component).
 *
 * `auth()` verifies the session from the ambient request. We defend in depth
 * past the proxy: signed-out visitors go to sign-in, and a signed-in user
 * with no ACTIVE organization is asked to pick one on the home page.
 *
 * Member listing uses the Backend API (`atlasClient().organizations`) with the
 * server-only secret key — never exposed to the browser.
 */
export default async function Dashboard() {
  const { userId, orgId, orgRole } = await auth();
  if (!userId) redirect('/sign-in');

  if (!orgId) {
    return (
      <main style={{ maxWidth: 640, margin: '4rem auto', padding: '0 1rem' }}>
        <h1>No organization selected</h1>
        <p>
          Pick or create an organization from the <Link href="/">home page</Link> switcher first.
        </p>
      </main>
    );
  }

  const hasSecret = Boolean(process.env.ATLAS_SECRET_KEY);
  let orgName = orgId;
  let members: { user_id: string; role: string }[] = [];

  if (hasSecret) {
    const atlas = atlasClient();
    const org = await atlas.organizations.get(orgId);
    orgName = org.name;
    const page = await atlas.organizations.memberships.list(orgId);
    members = page.data.map((m) => ({ user_id: m.user_id, role: m.role }));
  }

  return (
    <main style={{ maxWidth: 640, margin: '4rem auto', padding: '0 1rem' }}>
      <h1>{orgName} — dashboard</h1>
      <p>
        You are signed in as <code>{userId}</code> with org role <code>{orgRole ?? 'member'}</code>.
      </p>

      <h2>Members</h2>
      {!hasSecret ? (
        <p>
          Set <code>ATLAS_SECRET_KEY</code> to load the member list from the Backend API.
        </p>
      ) : (
        <ul>
          {members.map((m) => (
            <li key={m.user_id}>
              <code>{m.user_id}</code> — {m.role}
            </li>
          ))}
        </ul>
      )}

      <p>
        <Link href="/">← Back</Link>
      </p>
    </main>
  );
}
