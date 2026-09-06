'use client';

import { TITLE_ACCENT } from '@/components/atoms/titleAccent';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const cardShadow =
  'shadow-[inset_0_1px_1px_rgba(210,235,255,0.16),inset_0_0_25px_rgba(0,117,205,0.08),0_8px_20px_rgba(0,0,0,0.16)]';

const cardShadowHover =
  'hover:shadow-[inset_0_1px_1px_rgba(210,235,255,0.2),inset_0_0_25px_rgba(0,137,228,0.13),0_0_20px_rgba(0,132,228,0.15),0_10px_25px_rgba(0,0,0,0.2)]';

export default function Section3({ data, loading }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const title = data?.title?.[locale] || t('Our Partners');
  const description = data?.content?.[locale] || t('Hero.partnersSubtitle');
  const logos = fillLogoSet(data?.list);

  return (
    <section
      id='ourPartners'
      aria-busy={loading || undefined}
      aria-labelledby={title ? 'home-partners-heading' : undefined}
      className='relative isolate flex min-h-screen flex-col overflow-x-clip overflow-y-hidden text-white'
    >
      <div className='hero-slide-bg pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <Image
          src={cmsImage(data?.image?.url, '/landing/bg-3-section.png')}
          alt={data?.image?.alt || ''}
          fill
          sizes='100vw'
          className='img-overlay object-cover object-center'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div aria-hidden='true' className='hero-slide-veil pointer-events-none absolute inset-0 z-[1] bg-black/0' />

      <div className='relative z-10 flex min-h-screen flex-1 flex-col items-center justify-center gap-8 py-[85px] pointer-events-auto max-md:py-[70px]'>
        {loading ? (
          <>
            <p className='sr-only'>{t('loading')}</p>
            <PartnersSkeleton />
          </>
        ) : (
          <div className='hero-stage flex w-full flex-1 flex-col items-center justify-center gap-12 md:gap-16'>
            <div className='w-full max-w-[900px] px-4 text-center md:px-8'>
              <div className='mb-[17px] flex items-center justify-center gap-5 max-md:mb-[19px] max-md:gap-2.5'>
                <span className='h-px w-[72px] bg-[linear-gradient(90deg,transparent,rgba(53,185,247,0.95))] max-md:w-[35px]' />
                <div
                  className={`flex h-8 min-w-[165px] items-center justify-center rounded-[22px] border border-[rgba(0,159,241,0.72)] bg-[linear-gradient(180deg,rgba(4,52,84,0.28),rgba(1,18,32,0.14))] px-4 text-[#25b2f2] shadow-[0_0_10px_rgba(0,135,230,0.08),inset_0_0_12px_rgba(0,125,220,0.06)] max-md:text-[7px] max-md:tracking-[2.5px] md:h-10 md:min-w-[229px] ${
                    isAr ? 'font-cairo text-[10px] font-medium tracking-[2px]' : 'font-orbitron text-[11px] font-medium tracking-[4px]'
                  }`}
                >
                  {pickUi(data, locale, 'eyebrow', t('Hero.trusted'))}
                </div>
                <span className='h-px w-[72px] bg-[linear-gradient(90deg,rgba(53,185,247,0.95),transparent)] max-md:w-[35px]' />
              </div>

              {title ? <PartnersTitle id='home-partners-heading' title={title} locale={locale} className={bodyFont} /> : null}

              {description ? (
                <p className={`${bodyFont} mt-[13px] text-[clamp(13px,1.45vw,23px)] font-normal leading-[1.25] tracking-[-0.25px] text-[rgba(221,231,243,0.78)] max-md:mt-[11px] max-md:leading-[1.35]`}>
                  {description}
                </p>
              ) : null}
            </div>

            <div className='w-full min-w-0'>
              {logos.length ? (
                <div
                  dir='ltr'
                  className='min-w-0 w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,#000_4%,#000_96%,transparent_100%)]'
                >
                  <div
                    className={`flex w-max will-change-transform has-[article:hover]:[animation-play-state:paused] motion-reduce:[animation-play-state:paused] ${
                      isAr
                        ? 'animate-partners-marquee-rtl max-md:animate-partners-marquee-rtl-fast'
                        : 'animate-partners-marquee-ltr max-md:animate-partners-marquee-ltr-fast'
                    }`}
                  >
                    <LogoSet logos={logos} />
                    <LogoSet logos={logos} hidden />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PartnersTitle({ id, title, locale, className }) {
  const accent = locale === 'ar' ? 'شركاؤنا' : 'Partners';
  const titleClass = `${className} m-0 text-[clamp(47px,15vw,68px)] font-bold leading-[0.95] tracking-[-3px] text-[#f8f9fc] [text-shadow:0_3px_18px_rgba(0,0,0,0.22)] md:text-[clamp(70px,6.15vw,96px)] md:tracking-[-4px]`;
  const accentClass = `${TITLE_ACCENT} font-bold`;

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
      <strong className={accentClass}>{accent}</strong>
      {title.slice(start + accent.length)}
    </h2>
  );
}

function LogoSet({ logos, hidden }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className='grid shrink-0 grid-flow-col auto-cols-[125px] gap-2 pe-2 [grid-template-rows:repeat(2,79px)] md:auto-cols-[185px] md:gap-[11px] md:pe-[11px] md:[grid-template-rows:repeat(2,108px)] xl:auto-cols-[224px] xl:gap-3.5 xl:pe-3.5 xl:[grid-template-rows:repeat(2,126px)]'
    >
      {logos.map((logo, i) => (
        <article
          key={`${logo.url}-${i}`}
          className={`relative flex h-[79px] w-[125px] items-center justify-center overflow-x-clip rounded-[11px] border border-[rgba(94,154,202,0.52)] bg-[linear-gradient(145deg,rgba(27,63,96,0.7)_0%,rgba(11,32,54,0.78)_48%,rgba(8,24,42,0.72)_100%)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(125deg,rgba(91,188,249,0.11),transparent_31%,transparent_70%,rgba(42,137,212,0.05))] after:pointer-events-none after:absolute after:-start-[45px] after:-top-[45px] after:h-[100px] after:w-[130px] after:rounded-full after:bg-[rgba(0,130,230,0.08)] after:blur-[25px] transition-[border-color,box-shadow,transform] duration-[350ms] hover:-translate-y-[3px] hover:border-[rgba(46,173,247,0.82)] motion-reduce:transition-none md:h-[108px] md:w-[185px] md:rounded-[14px] xl:h-[126px] xl:w-[224px] ${cardShadow} ${cardShadowHover}`}
        >
          <Image
            src={cmsImage(logo.url, logo.url)}
            alt={hidden ? '' : logo.alt || ''}
            width={160}
            height={80}
            className='relative z-[2] h-auto max-h-[70%] w-auto max-w-[78%] object-contain'
          />
        </article>
      ))}
    </div>
  );
}

function fillLogoSet(list) {
  if (!list?.length) return [];
  const out = [...list];
  while (out.length < 16) out.push(...list);
  return out.slice(0, Math.max(16, list.length));
}

function PartnersSkeleton() {
  return (
    <div className='flex w-full flex-1 flex-col items-center justify-between gap-8'>
      <div className='flex flex-col items-center'>
        <div className='h-10 w-56 rounded-full skeleton-box bg-white/20' />
        <div className='mt-4 h-16 w-[min(70vw,420px)] rounded skeleton-box bg-white/20' />
        <div className='mt-3 h-5 w-64 rounded skeleton-box bg-white/20' />
      </div>
      <div className='grid w-full grid-cols-3 gap-2 md:grid-cols-6'>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className='h-[88px] rounded-[14px] skeleton-box bg-white/15 md:h-[108px]' />
        ))}
      </div>
    </div>
  );
}
