import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Called by the dashboard after SEO saves so Port 3000 reflects changes
 * without waiting for the fetch revalidate window.
 *
 * POST { secret?, slug?, paths?: string[] }
 */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const expected = process.env.REVALIDATE_SECRET || process.env.NEXT_PUBLIC_REVALIDATE_SECRET;
    if (expected && body.secret !== expected) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const slug = body.slug ? String(body.slug) : '';
    if (slug) {
      revalidateTag(`page-seo-${slug}`);
      // service detail also invalidates listing tag
      if (slug.startsWith('services/')) revalidateTag('page-seo-services');
    }

    const paths = Array.isArray(body.paths) && body.paths.length
      ? body.paths.map(normalizePath)
      : defaultPathsForSlug(slug);
    for (const path of paths) {
      revalidatePath(path);
      // App Router locale segment (ar has no prefix)
      if (path === '/') {
        revalidatePath('/en');
      } else {
        revalidatePath(`/en${path}`);
        revalidatePath(path);
      }
    }

    return NextResponse.json({ ok: true, slug, paths });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error?.message || error) }, { status: 500 });
  }
}

function normalizePath(path) {
  const p = String(path || '');
  if (!p || p === '/') return '/';
  return p.startsWith('/') ? p : `/${p}`;
}

function defaultPathsForSlug(slug) {
  if (!slug || slug === 'home-page') return ['/'];
  if (slug.startsWith('services/')) return [`/${slug}`, '/services'];
  if (slug === 'services') return ['/services'];
  if (slug.startsWith('blogs/') || slug.startsWith('projects/')) return [`/${slug}`];
  return [`/${slug}`];
}
