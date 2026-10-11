'use client';

import BlogCard from '@/components/jx/blogs/BlogCard';
import { ReadingProgress, ShareBar } from '@/components/jx/blogs/ReadingKit';
import { blogCover, blogTitle, formatDate, isHtml, paragraphsOf, readMinutes } from '@/components/jx/blogs/utils';
import { JxButton, JxHeading, JxScene, splitTitle } from '@/components/jx/primitives';
import { useViewMotion } from '@/components/jx/motion';
import { useBlog } from '@/hooks/useBlog';
import { Link } from '@/navigation';
import gsap from 'gsap';
import { notFound, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from '@/components/jx/SafeImage';

/*
 * Article — Black & Silver, built for reading.
 *   1. Editorial header over the cover's aura: breadcrumb, chrome headline,
 *      byline (author · date · reading time · views) and tags; the cover
 *      frame unveils beneath it.
 *   2. Body: a comfortable column (opening paragraph larger) beside a sticky
 *      share panel; a silver hairline at the top tracks reading progress.
 *   3. More articles.
 */
export default function BlogArticle({ initialData, more = [] }) {
    const { slug } = useParams();
    const { blog, loading } = useBlog({ slug_name: slug, initialData });
    const locale = useLocale();
    const tb = useTranslations('Blogs');
    const tj = useTranslations('Jx');

    const headRef = useViewMotion({ deps: [locale, blog?.slug], threshold: 0.05, extend: unveilCover });
    const bodyRef = useViewMotion({ deps: [locale, blog?.slug], threshold: 0.05 });
    const moreRef = useViewMotion({ deps: [locale, blog?.slug] });

    if (loading) return <div className='min-h-screen bg-[var(--jx-ink)]' aria-busy='true' />;
    if (!blog) notFound();

    const title = blogTitle(blog, locale);
    const cover = blogCover(blog);
    const dept = blog.department?.name?.[locale] || blog.department?.name?.en || '';
    const body = blog.content?.[locale] || blog.content?.en || '';
    const html = isHtml(body);
    const paras = html ? [] : paragraphsOf(body);
    const date = blog.published_at || blog.created_at;
    const views = Number(blog.views_count || 0);
    const tags = Array.isArray(blog.tags) ? blog.tags.slice(0, 6) : [];
    const parts = splitTitle(title);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 ? 'accent' : 'light' }));
    const longest = Math.max(...parts.map(p => p.length), 0);
    const titleSize = longest > 26 ? 'text-[length:var(--jx-fs-3xl)]' : 'text-[length:var(--jx-fs-4xl)]';

    return (
        <div className='jx-page bg-[var(--jx-ink)]'>
            <ReadingProgress targetId='article-body' />

            <JxScene ref={headRef} labelledBy='article-heading' priority image={cover || '/landing/blog-details-hero.png'} aura shade='center' bodyClassName='items-center text-center !pb-0'>
                <div className='mx-auto flex w-full max-w-[980px] flex-col items-center'>
                    <nav aria-label={tj('blogs')} data-jx='rise' className='flex flex-wrap items-center justify-center gap-2 text-[13px] text-[var(--jx-text-3)]'>
                        <Link href='/blogs' className='transition-colors hover:text-white'>
                            {tj('blogs')}
                        </Link>
                        {dept ? (
                            <>
                                <i aria-hidden='true' className='block h-px w-4 bg-[var(--jx-line-strong)]' />
                                <span className='text-[var(--jx-silver)]'>{dept}</span>
                            </>
                        ) : null}
                    </nav>

                    <JxHeading as='h1' id='article-heading' lines={lines} className={`mt-6 text-balance leading-[1.3] ${titleSize}`} />

                    <p data-jx='rise' className='m-0 mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px] text-[var(--jx-text-2)]'>
                        {blog.author ? (
                            <span>
                                <span className='text-[var(--jx-text-3)]'>{tj('by')} </span>
                                <span className='font-[700] text-[var(--jx-platinum)]'>{blog.author}</span>
                            </span>
                        ) : null}
                        {date ? (
                            <>
                                <Dot />
                                <time dateTime={date}>{formatDate(date, locale)}</time>
                            </>
                        ) : null}
                        <Dot />
                        <span>{tj('readTime', { count: readMinutes(blog, locale) })}</span>
                        {views ? (
                            <>
                                <Dot />
                                <span>{tj('viewsCount', { count: views.toLocaleString('en-US') })}</span>
                            </>
                        ) : null}
                    </p>

                    {tags.length ? (
                        <ul data-jx='rise' className='m-0 mt-5 flex list-none flex-wrap justify-center gap-2 p-0' aria-label='Tags'>
                            {tags.map(tag => (
                                <li key={tag} className='rounded-full px-3.5 py-1.5 text-[12.5px] text-[var(--jx-text-2)] shadow-[inset_0_0_0_1px_var(--jx-line)]'>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {cover ? (
                        <figure data-cover className='relative m-0 mt-[clamp(36px,6vh,64px)] aspect-[16/8] w-full overflow-hidden rounded-t-[var(--jx-r-lg)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] max-sm:aspect-[4/3]'>
                            <Image src={cover} alt={blog.image_alt || title} fill priority sizes='(max-width: 1024px) 94vw, 980px' quality={82} className='object-cover' />
                            <span aria-hidden='true' className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,6,0)_55%,rgba(5,5,6,0.9)_100%)]' />
                        </figure>
                    ) : null}
                </div>
            </JxScene>

            <section ref={bodyRef} className='jx relative pb-[clamp(72px,11vh,128px)]'>
                <div className='mx-auto grid w-full max-w-[1180px] gap-x-[clamp(28px,5vw,80px)] gap-y-8 px-[clamp(20px,5vw,72px)] pt-[clamp(40px,7vh,72px)] lg:grid-cols-[minmax(0,1fr)_120px]'>
                    <article id='article-body' className='mx-auto w-full max-w-[68ch]'>
                        {html ? (
                            <div
                                data-jx='rise'
                                className='jx-prose text-[length:var(--jx-fs-lg)] leading-[1.95] text-[var(--jx-text-2)]'
                                dangerouslySetInnerHTML={{ __html: body }}
                            />
                        ) : (
                            paras.map((text, i) => (
                                <p
                                    key={i}
                                    data-jx='rise'
                                    className={`m-0 mb-7 ${
                                        i === 0
                                            ? 'jx-display text-[length:var(--jx-fs-xl)] font-[400] leading-[1.8] text-[var(--jx-platinum)]'
                                            : 'text-[length:var(--jx-fs-lg)] leading-[1.95] text-[var(--jx-text-2)]'
                                    }`}
                                >
                                    {text}
                                </p>
                            ))
                        )}

                        <div data-jx='rise' className='mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--jx-line)] pt-8'>
                            <JxButton href='/contact-us'>{tb('contactTeam')}</JxButton>
                            <Link href='/blogs' className='text-[14px] text-[var(--jx-text-2)] underline decoration-[var(--jx-line-strong)] underline-offset-[6px] transition-colors hover:text-white hover:decoration-white'>
                                {tj('allArticles')}
                            </Link>
                        </div>
                    </article>

                    <aside data-jx='rise' className='lg:sticky lg:top-32 lg:self-start max-lg:order-first max-lg:mx-auto max-lg:w-full max-lg:max-w-[68ch]'>
                        <ShareBar title={title} />
                    </aside>
                </div>
            </section>

            {more.length ? (
                <section ref={moreRef} aria-labelledby='more-heading' className='jx relative border-t border-[var(--jx-line)] py-[clamp(72px,11vh,128px)]'>
                    <div className='mx-auto w-full max-w-[1400px] px-[clamp(20px,5vw,72px)]'>
                        <div className='flex flex-wrap items-end justify-between gap-6'>
                            <JxHeading id='more-heading' lines={[{ text: tj('moreArticles'), tone: 'accent' }]} className='text-[length:var(--jx-fs-3xl)] leading-[1.25]' />
                            <Link href='/blogs' data-jx='rise' className='text-[14px] text-[var(--jx-text-2)] underline decoration-[var(--jx-line-strong)] underline-offset-[6px] hover:text-white hover:decoration-white'>
                                {tj('allArticles')}
                            </Link>
                        </div>
                        <div data-jx='rise' className='mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8'>
                            {more.map(b => (
                                <BlogCard key={b.id || b.slug} blog={b} />
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}
        </div>
    );
}

function Dot() {
    return <i aria-hidden='true' className='block size-1 rounded-full bg-[var(--jx-steel)]' />;
}

/* The cover rises out of the page as the header settles. */
function unveilCover(tl, root) {
    const cover = root.querySelector('[data-cover]');
    if (!cover) return;
    const from = { clipPath: 'inset(100% 0% 0% 0% round 22px 22px 0 0)', y: 40 };
    gsap.set(cover, from);
    tl.fromTo(cover, from, { clipPath: 'inset(0% 0% 0% 0% round 22px 22px 0 0)', y: 0, duration: 1.5, ease: 'expo.inOut', immediateRender: false, clearProps: 'clipPath,transform' }, 0.45);
}
