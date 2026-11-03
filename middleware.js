import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { DEFAULT_LOCALE, normalizePath } from '@/helpers/url';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  localePrefix: 'as-needed',
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
});

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the URL includes '/departments/undefined'
  if (pathname.includes('/departments/undefined')) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // One permanent hop to the canonical URL for legacy links: lowercase path,
  // no /ar prefix (Arabic is the root locale), no trailing slash.
  const canonical = normalizePath(pathname).replace(/^\/ar(?=\/|$)/, '') || '/';
  if (canonical !== pathname) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = canonical;
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Call the original next-intl middleware
  return intlMiddleware(request);
}

// Apply middleware to all locale-prefixed routes and root
export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
    '/(ar|en)/:path*',
    '/',
  ],
};
