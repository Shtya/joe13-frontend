'use client';

import { JxButton, JxHeading, JxScene, JxTag, splitTitle } from '@/components/jx/primitives';
import { useViewMotion, weightMorph } from '@/components/jx/motion';
import ProjectArchive from '@/components/jx/projects/ProjectArchive';
import ProjectDeck from '@/components/jx/projects/ProjectDeck';
import { parseFigure } from '@/components/jx/projects/utils';
import { cmsImage, pickUi } from '@/helpers/cms';
import { usePages } from '@/hooks/usePages';
import { useProjects } from '@/hooks/useProjects';
import { useLocale, useTranslations } from 'next-intl';
import gsap from 'gsap';
import { useMemo } from 'react';

/*
 * Projects — Black & Silver.
 *   1. Hero scene: chrome title (light sweep + weight morph), lede, a stats
 *      readout on hairlines, actions — and the featured deck as signature.
 *   2. Archive: department rail + project grid.
 */
export default function ClientPage({ initialData, initialProjects }) {
    const t = useTranslations();
    const tp = useTranslations('projects');
    const tj = useTranslations('Jx');
    const locale = useLocale();

    const { loading: loadingProjects, projects } = useProjects(initialProjects);
    const { loading, data } = usePages({ page_name: 'projects', initialData });
    const section1 = data?.sections?.find(e => e.id == 'sec1');
    const all = projects?.data || [];

    const featured = useMemo(() => {
        const products = all.filter(p => p.department?.id == 1);
        return (products.length ? products : all).slice(0, 10);
    }, [all]);

    const title = section1?.title?.[locale] || tp('h1');
    const description = section1?.content?.[locale] || tp('p');
    const parts = splitTitle(title);
    const single = parts.length === 1;
    const lines = parts.map((text, i) => ({
        text,
        tone: i === parts.length - 1 ? 'accent' : 'light',
        className: i === parts.length - 1 ? 'jx-morph' : '',
    }));

    const stats = useMemo(() => {
        const raw = section1?.objectData?.[locale];
        const entries = raw && typeof raw === 'object' ? Object.entries(raw).filter(([k]) => !String(k).startsWith('_')).slice(0, 4) : [];
        if (entries.length) return entries.map(([label, value]) => ({ label, value: String(value) }));
        return [
            { value: pickUi(section1, locale, 'projectsCount', all.length ? `+${all.length}` : tp('statProjectsValue')), label: tp('successfulProjects') },
            { value: pickUi(section1, locale, 'clientsCount', tp('statClientsValue')), label: tp('happyClients') },
            { value: pickUi(section1, locale, 'citiesCount', tp('statCitiesValue')), label: t('cities') },
            { value: pickUi(section1, locale, 'yearsCount', tp('statYearsValue')), label: tp('yearsExperience') },
        ];
    }, [section1, locale, all.length, t, tp]);

    const ref = useViewMotion({
        deps: [loading, locale, title, featured.length],
        threshold: 0.05,
        extend: (tl, root) => {
            weightMorph(tl, root.querySelector('.jx-morph'));
            dealDeck(tl, root);
        },
    });

    const toArchive = () => document.getElementById('all-projects')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <div className='jx-page bg-[var(--jx-ink)]'>
            <JxScene
                ref={ref}
                id='projects'
                labelledBy='projects-heading'
                busy={loading}
                priority
                image={cmsImage(section1?.image?.url, '/landing/bg-project-page.png')}
                shade='deep'
            >
                <div className='grid w-full items-center gap-x-[clamp(32px,6vw,110px)] gap-y-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
                    <div className='min-w-0 text-start'>
                        <JxTag parts={[pickUi(section1, locale, 'eyebrow', tp('realProjects')), pickUi(section1, locale, 'eyebrow2', tp('realImpact'))]} />
                        <JxHeading
                            as='h1'
                            id='projects-heading'
                            lines={lines}
                            className={`mt-5 ${single ? 'text-[length:var(--jx-fs-mega)] leading-[1.1]' : 'text-[length:var(--jx-fs-5xl)] leading-[1.12]'}`}
                        />
                        {description ? (
                            <div
                                data-jx='rise'
                                className='mt-6 max-w-[38rem] text-pretty text-[length:var(--jx-fs-lg)] leading-[1.8] text-[var(--jx-text-2)] [&_p]:m-0'
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        ) : null}

                        <div className='mt-9 flex flex-wrap gap-3'>
                            <JxButton href='/contact-us'>{tp('btn')}</JxButton>
                            <JxButton variant='ghost' icon='arrow' onClick={toArchive}>
                                {tj('browseProjects')}
                            </JxButton>
                        </div>

                        <dl data-jx='rise' className='m-0 mt-12 grid max-w-[640px] grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4'>
                            {stats.map(stat => {
                                const fig = parseFigure(stat.value);
                                return (
                                    <div key={stat.label} className='border-t border-[var(--jx-line-strong)] pt-3'>
                                        <dt className='sr-only'>{stat.label}</dt>
                                        <dd className='m-0'>
                                            <span dir='ltr' className='jx-display jx-accent block text-[clamp(1.9rem,1.2rem+1.6vw,2.6rem)] font-[300] leading-none tabular-nums'>
                                                {fig.prefix}
                                                {fig.number != null ? <span data-jx-count={fig.number}>{fig.number}</span> : null}
                                                {fig.suffix}
                                            </span>
                                            <span aria-hidden='true' className='mt-2 block whitespace-pre-line text-[13px] leading-[1.5] text-[var(--jx-text-3)]'>
                                                {stat.label}
                                            </span>
                                        </dd>
                                    </div>
                                );
                            })}
                        </dl>
                    </div>

                    <div data-deck className='mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end'>
                        {loadingProjects ? (
                            <div className='aspect-[4/5] rounded-[var(--jx-r-lg)] skeleton-box bg-white/5' />
                        ) : (
                            <ProjectDeck projects={featured} heading={t('our-proudcts')} onViewAll={toArchive} />
                        )}
                    </div>
                </div>
            </JxScene>

            <ProjectArchive projects={all} loading={loadingProjects} />
        </div>
    );
}

/* The deck is dealt onto the table: it rises and tips forward into place. */
function dealDeck(tl, root) {
    const deck = root.querySelector('[data-deck]');
    if (!deck) return;
    const from = { opacity: 0, y: 90, rotateX: 18, transformPerspective: 1200, transformOrigin: '50% 100%' };
    gsap.set(deck, from);
    tl.fromTo(deck, from, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'expo.out', immediateRender: false }, 0.35);
}
