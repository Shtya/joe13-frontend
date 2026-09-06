'use client';

import GlowCtaButton from '@/components/atoms/GlowCtaButton';
import { TITLE_ACCENT } from '@/components/atoms/titleAccent';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const unitCardShadow =
  'shadow-[inset_0_1px_1px_rgba(140,214,255,0.12),0_8px_20px_rgba(0,0,0,0.16)]';

const unitCardShadowHover =
  'hover:shadow-[0_0_18px_rgba(0,140,230,0.2),0_10px_24px_rgba(0,0,0,0.2)]';

function hasValidUnit(unit, locale) {
  if (!unit?.data) return false;
  if (typeof unit.slideIndex !== 'number' || unit.slideIndex < 0) return false;
  const title = unit.data.title?.[locale] || unit.data.title?.en;
  return Boolean(String(title || '').trim());
}

function goToSlide(index) {
  const swiper = document.querySelector('.mySwiper')?.swiper;
  if (!swiper) return;
  swiper.slideTo(index);
}

export default function Section4({ data, loading, units = [] }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const title = data?.title?.[locale] || t('section4');
  const description = data?.content?.[locale] || t('Hero.unitsDescription');
  const visibleUnits = units.filter(unit => hasValidUnit(unit, locale));

  const goToUnits = event => {
    const swiper = document.querySelector('.mySwiper')?.swiper;
    if (!swiper || swiper.isEnd) return;
    event.preventDefault();
    swiper.slideNext();
  };

  return (
    <section
      id='business-units'
      aria-busy={loading || undefined}
      aria-labelledby={title ? 'home-units-heading' : undefined}
      className='relative isolate flex h-full min-h-screen flex-col overflow-x-clip overflow-y-hidden text-white'
    >
      <div className='hero-slide-bg pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <Image
          src={cmsImage(data?.image?.url, '/landing/bg-4-section.png')}
          alt={data?.image?.alt || ''}
          fill
          sizes='100vw'
          className='img-overlay object-cover object-center'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div aria-hidden='true' className='hero-slide-veil pointer-events-none absolute inset-0 z-[1] bg-black/0' />

      <div
        aria-hidden='true'
        className='pointer-events-none absolute -start-[620px] -top-[475px] z-[3] size-[1050px] rotate-[18deg] rounded-full border border-[rgba(32,143,223,0.3)] border-b-transparent border-s-transparent opacity-55 max-md:-start-[430px] max-md:-top-[210px] max-md:size-[650px]'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-[650px] -start-[345px] z-[3] size-[960px] -rotate-[25deg] rounded-full border border-[rgba(32,143,223,0.3)] border-b-transparent border-s-transparent opacity-30 max-md:-bottom-[390px] max-md:-start-[250px] max-md:size-[600px]'
      />

      <div className='relative z-10 flex min-h-screen flex-1 flex-col justify-center px-5 py-[90px] pointer-events-auto max-md:justify-center max-md:px-4 max-md:py-[88px] max-[390px]:px-3 md:px-[7%] xl:px-[9.45%]'>
        {loading ? (
          <>
            <p className='sr-only'>{t('loading')}</p>
            <UnitsSkeleton />
          </>
        ) : (
          <div className='hero-stage flex w-full items-center justify-between gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-8 max-md:gap-5'>
            <div className='w-full max-w-[600px] text-start min-[1600px]:max-w-[650px]'>
              <div className='mb-[31px] flex items-center gap-[25px] max-md:mb-6 max-md:gap-[15px] max-[390px]:gap-3'>
                <span
                  className={`whitespace-nowrap text-[#119ee8] [text-shadow:0_0_10px_rgba(0,151,240,0.25)] ${
                    isAr
                      ? 'font-cairo text-[11px] font-medium tracking-[2px] max-md:text-[9px]'
                      : 'font-inter text-[13px] font-medium tracking-[5.8px] max-md:text-[9px] max-md:tracking-[3.5px] max-[390px]:text-[8px] max-[390px]:tracking-[3px]'
                  }`}
                >
                  {pickUi(data, locale, 'eyebrow', t('Hero.expertise'))}
                </span>
                <i className='block h-px w-20 bg-[linear-gradient(90deg,#28b5f3,rgba(34,164,233,0.25))] max-md:w-12 max-[390px]:w-10 rtl:bg-[linear-gradient(90deg,rgba(34,164,233,0.25),#28b5f3)]' />
              </div>

              {title ? (
                <UnitsTitle id='home-units-heading' title={title} locale={locale} className={bodyFont} />
              ) : null}

              {description ? (
                <p className={`${bodyFont} mt-[27px] text-[21px] font-normal leading-[1.55] tracking-[-0.35px] text-[rgba(223,232,242,0.77)] max-md:mt-5 max-md:text-sm max-md:leading-[1.45] max-[1100px]:text-lg max-[390px]:text-[13px]`}>
                  {description}
                </p>
              ) : null}

              <GlowCtaButton
                href='/projects'
                onClick={goToUnits}
                className={`${bodyFont} mt-9 max-md:mt-6`}
              >
                {pickUi(data, locale, 'cta', t('Hero.exploreUnits'))}
              </GlowCtaButton>
            </div>

            {visibleUnits.length ? (
              <ul className='m-0 hidden w-full max-w-[360px] list-none flex-col gap-2.5 p-0 md:flex max-lg:max-w-full min-[1600px]:max-w-[400px]'>
                {visibleUnits.map(unit => {
                  const unitTitle = unit.data.title?.[locale] || unit.data.title?.en;
                  return (
                    <li key={`${unit.slideIndex}-${unitTitle}`}>
                      <button
                        type='button'
                        onClick={() => goToSlide(unit.slideIndex)}
                        className={`${bodyFont} ${unitCardShadow} ${unitCardShadowHover} ${focusRing} group relative flex w-full items-center justify-between gap-3 rounded-[14px] border border-[rgba(70,160,220,0.45)] bg-[linear-gradient(145deg,rgba(12,48,82,0.72),rgba(6,24,45,0.7))] px-4 py-3.5 text-start backdrop-blur-[4px] transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(46,173,247,0.85)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-md:gap-2.5 max-md:rounded-[12px] max-md:px-3 max-md:py-2.5`}
                      >
                        <span className='line-clamp-2 text-[15px] font-medium leading-[1.3] tracking-[-0.2px] text-[#f3f7fb] max-md:text-sm'>
                          {unitTitle}
                        </span>
                        <svg
                          viewBox='0 0 28 20'
                          aria-hidden='true'
                          className='h-4 w-5 shrink-0 fill-none stroke-current stroke-[1.8] text-[#7ec8f4] [stroke-linecap:round] [stroke-linejoin:round] transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5'
                        >
                          <path d='M2 10h22' />
                          <path d='M17 3l7 7-7 7' />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

function UnitsTitle({ id, title, locale, className }) {
  const accent = locale === 'ar' ? 'وحدات أعمالنا' : 'Business Units';
  const titleClass = `${className} m-0 text-[clamp(26px,8vw,36px)] font-bold leading-[1.12] tracking-[-1.2px] text-[#f5f7fa] [text-shadow:0_3px_15px_rgba(0,0,0,0.24)] md:text-[clamp(52px,4.15vw,67px)] md:leading-[1.04] md:tracking-[-2.7px] max-[1100px]:md:text-[49px] min-[1600px]:text-[67px]`;
  const accentClass = TITLE_ACCENT;

  const start = title.indexOf(accent);
  if (start < 0) {
    return (
      <h2 id={id} className={titleClass}>
        {title}
      </h2>
    );
  }

  return (
    <h2 id={id} className={titleClass}>
      {title.slice(0, start)}
      <span className={accentClass}>{accent}</span>
      {title.slice(start + accent.length)}
    </h2>
  );
}

function UnitsSkeleton() {
  return (
    <div className='w-full max-w-[600px]'>
      <div className='h-3 w-40 rounded skeleton-box bg-white/20' />
      <div className='mt-8 h-12 w-full max-w-[420px] rounded skeleton-box bg-white/20' />
      <div className='mt-3 h-12 w-full max-w-[360px] rounded skeleton-box bg-white/20' />
      <div className='mt-6 h-5 w-full max-w-[480px] rounded skeleton-box bg-white/20' />
      <div className='mt-8 h-[56px] w-[285px] rounded-full skeleton-box bg-white/20' />
    </div>
  );
}
