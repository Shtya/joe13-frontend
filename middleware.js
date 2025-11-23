// import createMiddleware from 'next-intl/middleware';
// import { localePrefix, locales } from '@/navigation';
// export default createMiddleware({
//   locales,
//   localePrefix,
//   defaultLocale: 'ar' , 
// });

// // only applies this middleware to files in the app directory
// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)' , "/(ar|en)/:path*", "/"]
// };



import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales } from '@/navigation';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'ar',
});

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the URL includes '/departments/undefined'
  if (pathname.includes('/departments/undefined')) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
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




