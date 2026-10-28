# atlas-b2b-saas-starter

A multi-tenant **B2B** starter on Next.js (App Router) + Atlas **organizations**.

## What's wired

- **`proxy.ts`** — `atlasProxy()` (`@atlasauth/nextjs`) protects every
  route except `/` and `/sign-in`.
- **`app/page.tsx`** — `<OrganizationSwitcher>` (pick / create / leave an org),
  `<UserButton>`, and `useOrganization()` to show the active org. The chosen org
  becomes the active org in the session claims.
- **`app/dashboard/page.tsx`** — a protected server component. `auth()` gives the
  verified `userId` + `orgId` + `orgRole`; the member list is loaded from the
  Backend API via `atlasClient().organizations.memberships.list(orgId)`.
- **`app/sign-in/page.tsx`** — the hosted `<SignIn>` flow.

## Run

```sh
npm install
cp .env.example .env.local     # set the NEXT_PUBLIC_* + ATLAS_* values
npm run dev
```

Open http://localhost:3000, sign in, create/select an organization in the
switcher, then open `/dashboard`.

Set `ATLAS_SECRET_KEY` to populate the member list; without it the dashboard
still renders the verified org identity.

## Packages

- `@atlasauth/nextjs` — `atlasMiddleware`, `auth`, `atlasClient` (`/server`)
- `@atlasauth/react` — `AtlasProvider`, `SignIn`, `UserButton`,
  `OrganizationSwitcher`, `SignedIn`/`SignedOut`, `useOrganization`, `useUser`
