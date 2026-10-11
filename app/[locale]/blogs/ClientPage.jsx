'use client';

import JxArchive from '@/components/jx/JxArchive';
import BlogCard from '@/components/jx/blogs/BlogCard';
import { blogCover, blogTitle, excerpt, formatDate, readMinutes } from '@/components/jx/blogs/utils';
import { JxButton, JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useViewMotion, weightMorph } from '@/components/jx/motion';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useBlogs } from '@/hooks/useblogs';
import { usePages } from '@/hooks/usePages';
import { Link } from '@/navigation';
import gsap from 'gsap';
import { useLocale, useTranslations } from 'next-intl';
import Image from '@/components/jx/SafeImage';

/*
 * Blog — Black & Silver, a magazine.
 *   1. Hero: chrome title + lede; the signature is the cover — the latest
 *      article printed in with a wipe — and an index of the next stories.
 *   2. Archive: department rail + editorial cards.
 */
export default function ClientPage({ initialData, initialBlogs }) {
    const tb = useTranslations('Blogs');
    const tj = useTranslations('Jx');
    const locale = useLocale();

    const { loading: loadingBlogs, blogs } = useBlogs(initialBlogs);
    const { loading, data } = usePages({ page_name: 'blogs', initialData });
    const section1 = data?.sections?.find(e => e.id == 'sec1');
    const all = blogs?.data || [];
    const [lead, ...rest] = all;

    const title = section1?.title?.[locale] || tb('blogs');
    const description = section1?.content?.[locale] || tb('blogsDescription');
    const parts = splitTitle(title);
    const lines = parts.map((text, i) => ({ text, tone: i === parts.length - 1 ? 'accent' : 'light', className: i === parts.length - 1 ? 'jx-morph' : '' }));

    const ref = useViewMotion({
        deps: [loading, locale, all.length],
        threshold: 0.05,
        extend: (tl, root) => {
            weightMorph(tl, root.querySelector('.jx-morph'));
            printCover(tl, root);
        },
    });

    const toArchive = () => document.getElementById('all-blogs')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div className='jx-page bg-[var(--jx-ink)]'>
            <JxScene ref={ref} id='blogs' labelledBy='blogs-heading' busy={loading} priority image={cmsImage(section1?.image?.url, '/landing/hero-blogs.png')} shade='deep'>
                <div className='grid w-full items-center gap-x-[clamp(32px,5vw,96px)] gap-y-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]'>
                    <div className='min-w-0 text-start'>
                        <JxTag parts={[pickUi(section1, locale, 'eyebrow', tb('eyebrow')), pickUi(section1, locale, 'eyebrow2', tb('impact'))]} />
                        <JxHeading as='h1' id='blogs-heading' lines={lines} className='mt-5 text-[length:var(--jx-fs-mega)] leading-[1.1]' />
                        {description ? (
                            <p data-jx='rise' className='m-0 mt-6 line-clamp-5 max-w-[38rem] text-pretty text-[length:var(--jx-fs-lg)] leading-[1.85] text-[var(--jx-text-2)]'>
                                {description.replace(/<[^>]+>/g, ' ')}
                            </p>
                        ) : null}
                        <div className='mt-9 flex flex-wrap gap-3'>
                            <JxButton icon='arrow' onClick={toArchive}>
                                {tj('allArticles')}
                            </JxButton>
                            <JxButton href='/contact-us' variant='ghost'>
                                {tb('contactTeam')}
                            </JxButton>
                        </div>
                    </div>

                    <div className='min-w-0'>
                        {loadingBlogs ? (
                            <div className='aspect-[4/3] rounded-[var(--jx-r-lg)] skeleton-box bg-white/5' />
                        ) : lead ? (
                            <>
                                <Cover blog={lead} locale={locale} tj={tj} />
                                {rest.length ? (
                                    <div className='mt-6'>
                                        <p data-jx='rise' className='m-0 mb-1 text-[13px] text-[var(--jx-text-3)]'>
                                            {tj('latest')}
                                        </p>
                                        <ol className='m-0 list-none p-0'>
                                            {rest.slice(0, 3).map(blog => (
                                                <li key={blog.id || blog.slug} data-jx='rise' className='border-b border-[var(--jx-line)] last:border-b-0'>
                                                    <Link href={`/blogs/${blog.slug}`} className='group flex items-center gap-4 py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                                                        <span className='relative h-14 w-20 shrink-0 overflow-hidden rounded-[10px] bg-[var(--jx-graphite)]'>
                                                            {blogCover(blog) ? (
                                                                <Image src={blogCover(blog)} alt='' fill sizes='80px' className='object-cover [filter:grayscale(1)] transition-[filter] duration-500 group-hover:[filter:grayscale(0)]' />
                                                            ) : null}
                                                        </span>
                                                        <span className='min-w-0 flex-1'>
                                                            <span className='jx-display line-clamp-1 text-[15px] font-[700] text-[var(--jx-text-2)] transition-colors group-hover:text-white'>{blogTitle(blog, locale)}</span>
                                                            <span className='mt-1 block text-[12.5px] text-[var(--jx-text-3)]'>
                                                                {formatDate(blog.published_at || blog.created_at, locale, 'short')} — {tj('readTime', { count: readMinutes(blog, locale) })}
                                                            </span>
                                                        </span>
                                                        <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 shrink-0 fill-none stroke-current stroke-[1.8] text-[var(--jx-steel)] transition-[transform,color] duration-300 [stroke-linecap:round] [stroke-linejoin:round] group-hover:translate-x-1 group-hover:text-white rtl:-scale-x-100 rtl:group-hover:-translate-x-1'>
                                                            <path d='M5 12h14' />
                                                            <path d='m13 6 6 6-6 6' />
                                                        </svg>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            <p className='text-[var(--jx-text-3)]'>{tb('noneFound')}</p>
                        )}
                    </div>
                </div>
            </JxScene>

            <JxArchive
                id='all-blogs'
                items={all}
                loading={loadingBlogs}
                tag={tj('allArticles')}
                title={tj('archiveBlogs')}
                emptyText={tb('noneFound')}
                skeletonClass='aspect-[4/4.4]'
                renderCard={(blog, i) => <BlogCard key={blog.id || blog.slug} blog={blog} priority={i < 3} />}
            />
        </div>
    );
}

/* The cover story: a full plate with headline, standfirst and dateline. */
function Cover({ blog, locale, tj }) {
    const title = blogTitle(blog, locale);
    const cover = blogCover(blog);
    const dept = blog?.department?.name?.[locale] || blog?.department?.name?.en;
    return (
        <Link
            href={`/blogs/${blog.slug}`}
            data-cover
            className='group relative block aspect-[16/11] overflow-hidden rounded-[var(--jx-r-lg)] bg-[var(--jx-onyx)] shadow-[inset_0_0_0_1px_var(--jx-line-strong),0_60px_100px_-50px_rgba(0,0,0,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-sm:aspect-[4/5]'
        >
            {cover ? (
                <span data-cover-img className='absolute inset-0 block'>
                    <Image
                        src={cover}
                        alt={blog?.image_alt || title}
                        fill
                        priority
                        sizes='(max-width: 1023px) 92vw, 50vw'
                        quality={80}
                        className='object-cover [filter:grayscale(0.35)_brightness(0.85)] transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:[filter:grayscale(0)_brightness(0.95)]'
                    />
                </span>
            ) : null}
            <span aria-hidden='true' className='absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,6,0.96)_0%,rgba(5,5,6,0.55)_42%,rgba(5,5,6,0)_72%)]' />
            <span className='absolute inset-x-0 bottom-0 flex flex-col p-6 text-start sm:p-8'>
                {dept ? <span className='jx-tag !text-[12.5px]'>{dept}</span> : null}
                <span className='jx-display mt-3 line-clamp-3 text-[clamp(1.4rem,1rem+1.3vw,2.2rem)] font-[700] leading-[1.35] text-white'>{title}</span>
                <span className='mt-2 line-clamp-2 max-w-[36rem] text-[14.5px] leading-[1.75] text-[var(--jx-text-2)] max-sm:hidden'>{excerpt(blog, locale, 30)}</span>
                <span className='mt-5 flex flex-wrap items-center justify-between gap-4'>
                    <span className='flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[var(--jx-text-3)]'>
                        <time dateTime={blog.published_at || blog.created_at}>{formatDate(blog.published_at || blog.created_at, locale)}</time>
                        <i aria-hidden='true' className='block h-px w-3 bg-[var(--jx-line-strong)]' />
                        {tj('readTime', { count: readMinutes(blog, locale) })}
                    </span>
                    <span className='inline-flex items-center gap-3 text-[14px] font-[700] text-[var(--jx-platinum)]'>
                        {tj('readArticle')}
                        <span className='grid size-10 place-items-center rounded-full bg-[image:var(--jx-brushed)] text-[var(--jx-ink)] shadow-[var(--jx-shadow-metal)] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1'>
                            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] rtl:-scale-x-100'>
                                <path d='M5 12h14' />
                                <path d='m13 6 6 6-6 6' />
                            </svg>
                        </span>
                    </span>
                </span>
            </span>
        </Link>
    );
}

/* The cover is printed in: a wipe from the reading edge while the photo settles. */
function printCover(tl, root) {
    const cover = root.querySelector('[data-cover]');
    if (!cover) return;
    const rtl = document.documentElement.dir === 'rtl';
    const from = { clipPath: rtl ? 'inset(0% 0% 0% 100% round 22px)' : 'inset(0% 100% 0% 0% round 22px)' };
    gsap.set(cover, from);
    tl.fromTo(cover, from, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.4, ease: 'expo.inOut', immediateRender: false, clearProps: 'clipPath' }, 0.3);
    const img = cover.querySelector('[data-cover-img]');
    if (img) {
        gsap.set(img, { scale: 1.18 });
        tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 2, ease: 'expo.out', immediateRender: false }, 0.3);
    }
}
