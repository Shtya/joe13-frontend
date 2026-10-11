'use client';

import { Link } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from '@/components/jx/SafeImage';
import { plainText, projectImages, projectName } from './utils';

/*
 * Project card — a cinematic plate.
 * The photo rests toned to silver and comes to life on hover (colour, slow
 * zoom); a specular band crosses the card; the action orb turns metal.
 */
export default function ProjectCard({ project, priority = false, className = '' }) {
    const locale = useLocale();
    const tj = useTranslations('Jx');
    const name = projectName(project, locale);
    const images = projectImages(project);
    const cover = images[0];
    const dept = project?.department?.name?.[locale] || project?.department?.name?.en;
    const excerpt = plainText(project?.description?.[locale] || project?.description?.en);

    return (
        <article data-card className={`h-full ${className}`}>
            <Link
                href={`/projects/${project.slug}`}
                className='group relative flex h-full flex-col overflow-hidden rounded-[var(--jx-r-lg)] bg-[var(--jx-onyx)] shadow-[inset_0_0_0_1px_var(--jx-line),0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_1px_var(--jx-line-strong),0_40px_70px_-30px_rgba(0,0,0,0.95),0_0_40px_-10px_rgba(255,255,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
            >
                <div className='relative aspect-[4/3] overflow-hidden bg-[var(--jx-graphite)]'>
                    {cover ? (
                        <Image
                            src={cover.src}
                            alt={cover.alt || name}
                            fill
                            priority={priority}
                            sizes='(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 30vw'
                            quality={72}
                            className='object-cover [filter:grayscale(0.7)_brightness(0.82)_contrast(1.05)] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:[filter:grayscale(0)_brightness(1)_contrast(1)]'
                        />
                    ) : (
                        <span className='jx-display jx-accent absolute inset-0 grid place-items-center text-[64px] font-[800]'>{name.charAt(0)}</span>
                    )}
                    <span aria-hidden='true' className='absolute inset-0 bg-[linear-gradient(to_top,rgba(11,12,14,0.92)_0%,rgba(11,12,14,0.2)_45%,rgba(11,12,14,0)_70%)]' />
                    {dept ? (
                        <span className='absolute start-4 top-4 max-w-[70%] truncate rounded-full bg-[rgba(5,5,6,0.6)] px-3 py-1.5 text-[12.5px] text-[var(--jx-platinum)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] backdrop-blur-md'>
                            {dept}
                        </span>
                    ) : null}
                    {images.length > 1 ? (
                        <span className='absolute end-4 top-4 flex items-center gap-1.5 rounded-full bg-[rgba(5,5,6,0.6)] px-2.5 py-1.5 text-[12px] text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line)] backdrop-blur-md'>
                            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-3.5 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]'>
                                <rect x='3' y='5' width='14' height='14' rx='2' />
                                <path d='M7 5V3h14v14h-2' />
                            </svg>
                            {tj('photos', { count: images.length })}
                        </span>
                    ) : null}
                </div>

                <div className='relative flex flex-1 flex-col px-6 pb-5 pt-5'>
                    <h3 className='jx-display m-0 line-clamp-2 text-[19px] font-[700] leading-[1.45] text-[var(--jx-platinum)] sm:text-[20px]'>{name}</h3>
                    {excerpt ? <p className='m-0 mb-5 mt-2 line-clamp-2 text-[14px] leading-[1.75] text-[var(--jx-text-3)]'>{excerpt}</p> : null}
                    <span className='mt-auto flex items-center justify-between border-t border-[var(--jx-line)] pt-4'>
                        <span className='text-[14px] font-[700] text-[var(--jx-text-2)] transition-colors duration-300 group-hover:text-white'>{tj('viewProject')}</span>
                        <span className='grid size-10 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[background,color,box-shadow,transform] duration-500 group-hover:bg-[image:var(--jx-brushed)] group-hover:text-[var(--jx-ink)] group-hover:shadow-[var(--jx-shadow-metal)] group-hover:[transform:translateX(4px)] rtl:group-hover:[transform:translateX(-4px)]'>
                            <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] rtl:-scale-x-100'>
                                <path d='M5 12h14' />
                                <path d='m13 6 6 6-6 6' />
                            </svg>
                        </span>
                    </span>
                </div>

                {/* specular band */}
                <span
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-y-0 -start-1/2 w-1/3 -skew-x-12 bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-0 transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[420%] group-hover:opacity-100 rtl:group-hover:-translate-x-[420%]'
                />
            </Link>
        </article>
    );
}
