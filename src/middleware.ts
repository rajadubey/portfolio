import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─── Configuration ──────────────────────────────────────────────────
const VARIANT_KEYS = ['v0', 'v1', 'v2', 'v3', 'v4'];
const COOKIE_NAME = 'portfolio_variant';
const COOKIE_TS_NAME = 'portfolio_variant_ts';

// Set to true to lock each variant for 10 minutes before rotating.
// Set to false to rotate on every page reload.
const USE_TIMED_ROTATION = false;
const ROTATION_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const currentVariant = request.cookies.get(COOKIE_NAME)?.value;

  if (USE_TIMED_ROTATION) {
    // ── Timed mode: keep variant for 10 minutes, then rotate ──
    const timestampCookie = request.cookies.get(COOKIE_TS_NAME)?.value;
    const now = Date.now();

    if (currentVariant && timestampCookie) {
      const savedTimestamp = parseInt(timestampCookie, 10);
      if (!isNaN(savedTimestamp) && now - savedTimestamp < ROTATION_INTERVAL_MS && VARIANT_KEYS.includes(currentVariant)) {
        return response;
      }
    }

    const currentIndex = currentVariant ? VARIANT_KEYS.indexOf(currentVariant) : -1;
    const nextVariant = VARIANT_KEYS[(currentIndex + 1) % VARIANT_KEYS.length] ?? 'v0';
    const maxAge = Math.ceil(ROTATION_INTERVAL_MS / 1000);

    response.cookies.set(COOKIE_NAME, nextVariant, { path: '/', maxAge, httpOnly: true, sameSite: 'lax' });
    response.cookies.set(COOKIE_TS_NAME, now.toString(), { path: '/', maxAge, httpOnly: true, sameSite: 'lax' });
  } else {
    // ── Reload mode: rotate to next variant on every request ──
    const currentIndex = currentVariant ? VARIANT_KEYS.indexOf(currentVariant) : -1;
    const nextVariant = VARIANT_KEYS[(currentIndex + 1) % VARIANT_KEYS.length] ?? 'v0';

    response.cookies.set(COOKIE_NAME, nextVariant, { path: '/', httpOnly: true, sameSite: 'lax' });
  }

  return response;
}

export const config = {
  matcher: '/',
};
