import { NextResponse, type NextRequest } from 'next/server';
import { atlasProxy, withAtlasHeaders } from '@atlasauth/nextjs';

// Protect everything except the marketing home + the sign-in route. The
// /dashboard route requires a signed-in user with an active organization.
const atlas = atlasProxy({
  jwksUrl: process.env.ATLAS_JWKS_URL ?? process.env.NEXT_PUBLIC_ATLAS_JWKS_URL ?? '',
  issuer: process.env.ATLAS_ISSUER ?? process.env.NEXT_PUBLIC_ATLAS_ISSUER ?? '',
  publishableKey: process.env.NEXT_PUBLIC_ATLAS_PUBLISHABLE_KEY,
  signInUrl: '/sign-in',
  publicRoutes: ['/', '/sign-in(.*)'],
});

export async function proxy(request: NextRequest) {
  return (await atlas(request)) ?? withAtlasHeaders(request, NextResponse.next());
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
