import { atlasMiddleware } from '@atlasauth/nextjs';
import { NextResponse, type NextRequest } from 'next/server';

// Protect everything except the marketing home + the sign-in route. The
// /dashboard route requires a signed-in user with an active organization.
const handle = atlasMiddleware({
  jwksUrl: process.env.ATLAS_JWKS_URL ?? process.env.NEXT_PUBLIC_ATLAS_JWKS_URL ?? '',
  issuer: process.env.ATLAS_ISSUER ?? process.env.NEXT_PUBLIC_ATLAS_ISSUER ?? '',
  publishableKey: process.env.NEXT_PUBLIC_ATLAS_PUBLISHABLE_KEY,
  signInUrl: '/sign-in',
  publicRoutes: ['/', '/sign-in(.*)'],
});

export function middleware(request: NextRequest) {
  return handle(
    request as unknown as Parameters<typeof handle>[0],
    NextResponse as unknown as Parameters<typeof handle>[1],
  );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
