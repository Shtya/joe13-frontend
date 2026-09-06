'use client';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { baseImage } from '@/helpers/baseUrl';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';

const BG = '/landing/bg-project-2.png';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(16,164,255,0.95)]';

const CAT_ARROW =
  `${FOCUS} absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(10,143,238,0.85)] bg-[rgba(5,28,50,0.9)] text-[#e6f4ff] shadow-[inset_0_0_10px_rgba(0,103,189,0.08)] transition duration-[250ms] hover:bg-[rgba(5,93,160,0.7)] hover:shadow-[0_0_16px_rgba(0,137,255,0.32)] max-[768px]:size-8`;

function plainText(html) {
  if (!html) return '';
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sentenceCase(value) {
  const text = String(value || '').trim();
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export default function Tabs({ loading, projects }) {
  const departmentsMap = new Map();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const t = useTranslations();
  const tp = useTranslations('projects');

  projects?.data?.forEach(project => {
    const deptId = project.department?.id;
    if (deptId != null && !departmentsMap.has(deptId)) {
      departmentsMap.set(deptId, project);
    }
  });

  const uniqueDepartmentProjects = Array.from(departmentsMap.values());
  const [activeDepartment, setActiveDepartment] = useState(uniqueDepartmentProjects[0]?.department?.id ?? 1);
  const [tabsOverflow, setTabsOverflow] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(0);

  const catTrackRef = useRef(null);
  const productSwiperRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const syncCatArrows = useCallback(() => {
    const el = catTrackRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const overflow = maxScroll > 2;
    setTabsOverflow(overflow);

    if (!overflow) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    const left = el.scrollLeft;
    // Chromium RTL often uses negative scrollLeft; normalize to [0, maxScroll].
    const pos = left < 0 ? Math.min(maxScroll, -left) : Math.min(maxScroll, Math.abs(left));
    setCanScrollPrev(pos > 2);
    setCanScrollNext(pos < maxScroll - 2);
  }, []);

  const scrollCats = dir => {
    const el = catTrackRef.current;
    if (!el) return;
    const step = Math.min(200, Math.max(120, el.clientWidth * 0.5));
    el.scrollBy({ left: isAr ? -dir * step : dir * step, behavior: 'smooth' });
  };

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const el = catTrackRef.current;
    if (!el) return;

    syncCatArrows();
    const onScroll = () => syncCatArrows();
    el.addEventListener('scroll', onScroll, { passive: true });
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncCatArrows) : null;
    ro?.observe(el);
    window.addEventListener('resize', syncCatArrows);

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro?.disconnect();
      window.removeEventListener('resize', syncCatArrows);
    };
  }, [syncCatArrows, uniqueDepartmentProjects.length, loading]);

  const filteredProjects = activeDepartment
    ? projects?.data?.filter(project => project.department?.id === activeDepartment)
    : projects?.data;

  useEffect(() => {
    if (!uniqueDepartmentProjects.length) return;
    const exists = uniqueDepartmentProjects.some(p => p.department?.id === activeDepartment);
    if (!exists) setActiveDepartment(uniqueDepartmentProjects[0].department.id);
  }, [projects]);

  const syncPages = swiper => {
    if (!swiper) return;
    setPageCount(Math.max(1, swiper.snapGrid?.length || 1));
    setActivePage(swiper.snapIndex ?? 0);
  };

  const goPage = index => {
    const swiper = productSwiperRef.current;
    if (!swiper) return;
    const count = Math.max(1, swiper.snapGrid?.length || 1);
    const next = ((index % count) + count) % count;
    swiper.slideTo(next);
  };

  return (
    <section
      id='all-projects'
      className={`relative isolate flex min-h-[100vh] flex-col justify-center overflow-hidden bg-[#020d1b] py-16 text-white max-[1100px]:min-h-[100vh] max-[1100px]:overflow-x-hidden max-[1100px]:overflow-y-auto max-[1100px]:py-14 max-[768px]:py-12 ${bodyFont}`}
    >
      <div className='pointer-events-none absolute inset-0 -z-[5]'>
        <Image src={BG} alt='' fill sizes='100vw' className='object-cover object-center' />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-[4] bg-[radial-gradient(ellipse_at_50%_45%,rgba(4,68,119,0.17),transparent_57%)]'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -start-[170px] -top-[190px] -z-[4] h-[420px] w-[620px] -rotate-[35deg] border-t border-[rgba(0,143,255,0.7)] shadow-[0_0_35px_rgba(0,111,255,0.12)]'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-[180px] -end-[180px] -z-[4] h-[420px] w-[630px] -rotate-[35deg] border-t border-[rgba(0,128,255,0.45)] shadow-[0_0_45px_rgba(0,111,255,0.08)]'
      />

      <div className='relative z-10 mx-auto w-[min(1538px,calc(100%-90px))] pt-6 text-center max-[1100px]:w-[calc(100%-70px)] max-[768px]:w-[calc(100%-40px)] max-[768px]:pt-4'>
        <div className={`mb-3 flex items-center justify-center gap-2.5 text-[12px] font-medium text-[#079df5] ${isAr ? 'tracking-[2px]' : 'tracking-[4px]'}`}>
          <i className='block h-px w-[60px] bg-[linear-gradient(90deg,transparent,#0aa8fa)] rtl:bg-[linear-gradient(270deg,transparent,#0aa8fa)]' />
          <span>{isAr ? t('our-proudcts') : sentenceCase(t('our-proudcts'))}</span>
          <i className='block h-px w-[60px] bg-[linear-gradient(90deg,#0aa8fa,transparent)] rtl:bg-[linear-gradient(270deg,#0aa8fa,transparent)]' />
        </div>
        <h2 className='m-0 text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.1] tracking-[-0.8px] text-[#f4f8fc]'>
          {tp('trustedHeading')} {tp('forA')}{' '}
          <span className='bg-[linear-gradient(100deg,#0ea9fb,#0982ed)] bg-clip-text text-transparent'>
            {tp('smarterTomorrow')}
          </span>
        </h2>
      </div>

      <div className='relative z-10 mx-auto mt-10 w-[min(1100px,calc(100%-48px))] max-[1100px]:mt-8 max-[768px]:mt-6 max-[768px]:w-[calc(100%-32px)]'>
        {loading ? (
          <SkeletonTabs />
        ) : (
          <div className='relative'>
            {tabsOverflow && canScrollPrev ? (
              <button
                type='button'
                aria-label={tp('prevCategory')}
                className={`${CAT_ARROW} start-0 -translate-x-1/2 rtl:translate-x-1/2`}
                onClick={() => scrollCats(-1)}
              >
                <svg viewBox='0 0 24 24' className='size-[18px] fill-none stroke-current stroke-[1.55] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180 max-[768px]:size-4'>
                  <path d='M15 6 9 12l6 6' />
                </svg>
              </button>
            ) : null}

            <div
              ref={catTrackRef}
              dir={isAr ? 'rtl' : 'ltr'}
              className={`flex w-full gap-2 overscroll-x-contain scroll-smooth py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                tabsOverflow
                  ? 'touch-pan-x justify-start overflow-x-auto'
                  : 'justify-center overflow-x-hidden'
              }`}
            >
              {uniqueDepartmentProjects.map(project => {
                const active = activeDepartment === project.department.id;
                return (
                  <button
                    key={project.department.id}
                    type='button'
                    onClick={() => setActiveDepartment(project.department.id)}
                    className={`${FOCUS} h-9 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-[13px] tracking-[0.01em] transition duration-[280ms] max-[768px]:h-8 max-[768px]:px-3 max-[768px]:text-[11px] ${
                      active
                        ? 'border-[rgba(15,174,255,0.95)] bg-[linear-gradient(105deg,#0c9bf7,#0879e9)] font-semibold text-white shadow-[0_0_14px_rgba(0,142,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.28)]'
                        : 'border-[rgba(70,140,190,0.35)] bg-[rgba(8,28,48,0.55)] font-medium text-[rgba(220,234,246,0.78)] hover:border-[rgba(17,165,250,0.7)] hover:bg-[rgba(10,55,90,0.65)] hover:text-white'
                    }`}
                  >
                    {project.department.name?.[locale]}
                  </button>
                );
              })}
            </div>

            {tabsOverflow && canScrollNext ? (
              <button
                type='button'
                aria-label={tp('nextCategory')}
                className={`${CAT_ARROW} end-0 translate-x-1/2 rtl:-translate-x-1/2`}
                onClick={() => scrollCats(1)}
              >
                <svg viewBox='0 0 24 24' className='size-[18px] fill-none stroke-current stroke-[1.55] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180 max-[768px]:size-4'>
                  <path d='m9 6 6 6-6 6' />
                </svg>
              </button>
            ) : null}
          </div>
        )}
      </div>

      <div className='relative z-10 mx-auto mt-9 w-[min(1538px,calc(100%-90px))] max-[1100px]:mt-7 max-[1100px]:w-[calc(100%-70px)] max-[768px]:mt-6 max-[768px]:w-[calc(100%-40px)]'>
        {loading ? (
          <div className='grid grid-cols-3 gap-8 max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1'>
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : !filteredProjects?.length ? (
          <p className='py-24 text-center text-[rgba(221,232,242,0.87)]'>{tp('noneFound')}</p>
        ) : (
          <Swiper
            key={activeDepartment}
            dir={isAr ? 'rtl' : 'ltr'}
            modules={[Autoplay]}
            onSwiper={swiper => {
              productSwiperRef.current = swiper;
              syncPages(swiper);
            }}
            onSlideChange={syncPages}
            onResize={syncPages}
            onUpdate={syncPages}
            slidesPerView={1}
            spaceBetween={32}
            breakpoints={{
              769: { slidesPerView: 2, spaceBetween: 22 },
              1101: { slidesPerView: 3, spaceBetween: 32 },
            }}
            autoplay={
              reduceMotion || (filteredProjects?.length || 0) <= 3
                ? false
                : { delay: 5200, disableOnInteraction: true, pauseOnMouseEnter: true }
            }
            speed={500}
            watchOverflow
            resistanceRatio={0.65}
            touchReleaseOnEdges
            className='!overflow-hidden'
          >
            {filteredProjects.map(project => (
              <SwiperSlide key={project.id} className='!h-auto'>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {pageCount > 1 ? (
        <div className='relative z-10 mt-9 flex items-center justify-center gap-3 max-[768px]:mt-7 max-[768px]:gap-2.5'>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type='button'
              aria-label={`${tp('nextProducts')} ${i + 1}`}
              aria-current={i === activePage ? 'true' : undefined}
              onClick={() => goPage(i)}
              className={`${FOCUS} rounded-full border-0 p-0 transition duration-300 ${
                i === activePage
                  ? 'size-[15px] bg-[#0796ff] shadow-[0_0_8px_#078cff,0_0_16px_rgba(0,133,255,0.45)]'
                  : 'size-[13px] bg-[#073a68] shadow-[inset_0_0_7px_rgba(0,0,0,0.35)] hover:bg-[#0a5a9a]'
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ProjectCard({ project }) {
  const locale = useLocale();
  const t = useTranslations();
  const images = project?.images?.length
    ? project.images
    : project?.image_url
      ? [{ url: project.image_url, alt: project.image_alt }]
      : [];
  const hasMultiple = images.filter(img => img?.url).length > 1;
  const [mainImage, setMainImage] = useState(images[0]);
  const miniImage = images.find(img => img?.url && img.url !== mainImage?.url) || images[0];

  useEffect(() => {
    setMainImage(images[0]);
  }, [project?.id]);

  return (
    <article className='group relative flex h-[540px] flex-col rounded-[17px] border border-[rgba(12,126,204,0.7)] bg-[linear-gradient(140deg,rgba(12,45,75,0.78),rgba(5,28,49,0.74))] px-6 pb-[19px] pt-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.055),inset_0_-30px_70px_rgba(0,0,0,0.12),0_12px_28px_rgba(0,0,0,0.17)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-[5px] hover:border-[rgba(15,165,245,0.94)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.07),0_15px_40px_rgba(0,0,0,0.2),0_0_20px_rgba(0,128,255,0.1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[1300px]:h-auto max-[1300px]:p-[17px] max-[1100px]:h-[525px] max-[768px]:h-[505px] max-[768px]:p-[15px] max-[480px]:h-[490px]'>
      <div className='relative mb-[17px] h-[318px] max-[1300px]:h-[275px] max-[768px]:h-[285px] max-[480px]:h-[255px]'>
        <div
          className={`absolute start-0 top-0 flex h-[312px] items-center justify-center overflow-hidden rounded-[17px] border-2 border-[rgba(148,191,224,0.67)] bg-[#090b0d] shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_0_15px_rgba(0,116,255,0.16)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[15px] after:shadow-[inset_0_0_20px_rgba(13,147,255,0.42),0_0_10px_rgba(0,128,255,0.3)] after:content-[""] max-[1300px]:h-[269px] max-[768px]:h-[279px] max-[480px]:h-[249px] ${
            hasMultiple
              ? 'w-[calc(100%-105px)] max-[1300px]:w-[calc(100%-82px)] max-[768px]:w-[calc(100%-83px)] max-[480px]:w-[calc(100%-72px)]'
              : 'w-full'
          }`}
        >
          {mainImage?.url ? (
            <img
              src={baseImage(mainImage.url)}
              alt={mainImage.alt || project.name?.[locale] || ''}
              onError={e => {
                e.currentTarget.src = '/not-image.jpg';
              }}
              className='size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.035] motion-reduce:transition-none'
            />
          ) : (
            <span className='text-4xl font-bold text-white/40'>{(project.name?.[locale] || 'P').charAt(0)}</span>
          )}
        </div>

        {hasMultiple ? (
          <button
            type='button'
            onClick={() => miniImage && setMainImage(miniImage)}
            className={`${FOCUS} absolute end-0 top-[3px] flex size-[100px] items-center justify-center overflow-hidden rounded-[14px] border-2 border-[#078de9] bg-[#070b0f] shadow-[0_0_10px_rgba(0,126,255,0.38),inset_0_0_8px_rgba(0,126,255,0.18)] max-[1300px]:size-[78px] max-[768px]:size-[76px] max-[480px]:size-[68px]`}
          >
            {miniImage?.url ? (
              <img
                src={baseImage(miniImage.url)}
                alt=''
                onError={e => {
                  e.currentTarget.src = '/not-image.jpg';
                }}
                className='size-full object-cover'
              />
            ) : null}
          </button>
        ) : null}
      </div>

      <h3 className='mb-[7px] truncate text-[25px] font-bold leading-[1.15] tracking-[-0.45px] text-white max-[768px]:text-[22px] max-[480px]:text-xl'>
        {project.name?.[locale]}
      </h3>
      <p className='min-h-[68px] text-[15px] font-normal leading-normal text-[rgba(221,232,242,0.87)] max-[1300px]:text-[13px] max-[480px]:min-h-[76px] max-[480px]:text-xs line-clamp-3'>
        {plainText(project?.description?.[locale])}
      </p>

      <div className='mt-[17px] flex items-center justify-between gap-[15px] max-[768px]:gap-2 max-[480px]:flex-col'>
        <span className='flex h-[46px] min-w-[193px] items-center justify-center gap-2.5 whitespace-nowrap rounded-3xl border border-[rgba(30,128,198,0.63)] bg-[linear-gradient(180deg,rgba(20,70,108,0.76),rgba(7,43,74,0.78))] px-4 text-sm text-[rgba(240,247,253,0.93)] max-[1300px]:min-w-[145px] max-[1300px]:text-xs max-[768px]:min-w-0 max-[768px]:flex-1 max-[768px]:px-2.5 max-[768px]:text-[11px] max-[480px]:w-full max-[480px]:flex-none'>
          <span className='text-[21px] font-normal leading-none'>#</span>
          <span className='truncate'>{project?.department?.name?.[locale]}</span>
        </span>

        <Link
          href={`projects/${project.slug}`}
          className={`${FOCUS} flex h-12 min-w-[166px] flex-1 items-center justify-between rounded-[26px] bg-[linear-gradient(100deg,#0da3fa,#086fe7)] py-0 ps-[21px] pe-2.5 text-base font-medium text-white no-underline shadow-[0_0_14px_rgba(0,139,255,0.33),inset_0_1px_1px_rgba(255,255,255,0.25)] transition duration-[250ms] hover:-translate-y-px hover:shadow-[0_0_22px_rgba(0,147,255,0.52),inset_0_1px_1px_rgba(255,255,255,0.3)] motion-reduce:transition-none max-[1300px]:min-w-[130px] max-[1300px]:text-[13px] max-[768px]:min-w-[125px] max-[768px]:ps-3.5 max-[768px]:text-[13px] max-[480px]:w-full max-[480px]:flex-none`}
        >
          <span>{t('show-more')}</span>
          <span className='flex size-[27px] items-center justify-center rounded-full bg-white text-[#087be9]'>
            <svg viewBox='0 0 24 24' className='size-4 fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180'>
              <path d='M5 12h13' />
              <path d='m13 6 6 6-6 6' />
            </svg>
          </span>
        </Link>
      </div>
    </article>
  );
}

function SkeletonTabs() {
  return (
    <div className='flex items-center justify-center gap-2'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='h-9 w-[120px] rounded-full skeleton-box' />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className='h-[540px] rounded-[17px] border border-[rgba(12,126,204,0.4)] bg-[rgba(5,28,49,0.6)] p-5'>
      <div className='mb-[17px] h-[312px] rounded-[17px] skeleton-box' />
      <div className='mb-2 h-7 w-2/3 rounded skeleton-box' />
      <div className='mb-2 h-4 w-full rounded skeleton-box' />
      <div className='h-4 w-4/5 rounded skeleton-box' />
      <div className='mt-5 flex gap-3'>
        <div className='h-12 flex-1 rounded-3xl skeleton-box' />
        <div className='h-12 flex-1 rounded-3xl skeleton-box' />
      </div>
    </div>
  );
}
