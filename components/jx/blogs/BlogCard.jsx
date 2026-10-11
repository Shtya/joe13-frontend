'use client';

import { Link } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from '@/components/jx/SafeImage';
import { blogCover, blogTitle, excerpt, formatDate, readMinutes } from './utils';

/*
 * Blog card — editorial. A wide plate toned to silver that comes to life on
 * hover, then a dateline (date — reading time), the headline, a two-line
 * standfirst and the byline on a hairline.
 */
export default function BlogCard({ blog, priority = false }) {
    const locale = useLocale();
    const tj = useTranslations('Jx');
    const title = blogTitle(blog, locale);
    const cover = blogCover(blog);
    const dept = blog?.department?.name?.[locale] || blog?.department?.name?.en;
    const date = formatDate(blog?.published_at || blog?.created_at, locale, 'short');

    return (
        <article data-card className='h-full'>
            <Link
                href={`/blogs/${blog.slug}`}
                className='group relative flex h-full flex-col overflow-hidden rounded-[var(--jx-r-lg)] bg-[var(--jx-onyx)] shadow-[inset_0_0_0_1px_var(--jx-line),0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_1px_var(--jx-line-strong),0_40px_70px_-30px_rgba(0,0,0,0.95)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
            >
                <div className='relative aspect-[16/10] overflow-hidden bg-[var(--jx-graphite)]'>
                    {cover ? (
                        <Image
                            src={cover}
                            alt={blog?.image_alt || title}
                            fill
                            priority={priority}
                            sizes='(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 30vw'
                            quality={72}
                            className='object-cover [filter:grayscale(0.75)_brightness(0.8)] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:[filter:grayscale(0)_brightness(1)]'
                        />
                    ) : null}
                    <span aria-hidden='true' className='absolute inset-0 bg-[linear-gradient(to_top,rgba(11,12,14,0.85),rgba(11,12,14,0)_55%)]' />
                    {dept ? (
                        <span className='absolute start-4 top-4 max-w-[75%] truncate rounded-full bg-[rgba(5,5,6,0.6)] px-3 py-1.5 text-[12.5px] text-[var(--jx-platinum)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] backdrop-blur-md'>
                            {dept}
                        </span>
                    ) : null}
                </div>

                <div className='flex flex-1 flex-col px-6 pb-5 pt-5'>
                    <p className='m-0 flex items-center gap-2.5 text-[12.5px] text-[var(--jx-text-3)]'>
                        {date ? <time dateTime={blog?.published_at || blog?.created_at}>{date}</time> : null}
                        <i aria-hidden='true' className='block h-px w-3 bg-[var(--jx-line-strong)]' />
                        <span>{tj('readTime', { count: readMinutes(blog, locale) })}</span>
                    </p>
                    <h3 className='jx-display m-0 mt-3 line-clamp-2 text-[19px] font-[700] leading-[1.5] text-[var(--jx-platinum)] sm:text-[20px]'>{title}</h3>
                    <p className='m-0 mb-5 mt-2 line-clamp-2 text-[14px] leading-[1.8] text-[var(--jx-text-3)]'>{excerpt(blog, locale, 24)}</p>
                    <span className='mt-auto flex items-center justify-between border-t border-[var(--jx-line)] pt-4'>
                        <span className='truncate text-[13px] text-[var(--jx-text-2)]'>
                            {blog?.author ? (
                                <>
                                    <span className='text-[var(--jx-text-3)]'>{tj('by')} </span>
                                    {blog.author}
                                </>
                            ) : (
                                tj('readArticle')
                            )}
                        </span>
                        <span className='grid size-10 shrink-0 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color,box-shadow,transform] duration-500 group-hover:translate-x-1 group-hover:bg-[image:var(--jx-brushed)] group-hover:text-[var(--jx-ink)] group-hover:shadow-[var(--jx-shadow-metal)] rtl:group-hover:-translate-x-1'>
                            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] rtl:-scale-x-100'>
                                <path d='M5 12h14' />
                                <path d='m13 6 6 6-6 6' />
                            </svg>
                        </span>
                    </span>
                </div>

                <span
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-y-0 -start-1/2 w-1/3 -skew-x-12 bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-0 transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[420%] group-hover:opacity-100 rtl:group-hover:-translate-x-[420%]'
                />
            </Link>
        </article>
    );
}
