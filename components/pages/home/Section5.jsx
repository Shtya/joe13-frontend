'use client';

import Modal, { getModalItems } from '@/components/molecules/Modal';
import GlowCtaButton from '@/components/atoms/GlowCtaButton';
import { TITLE_ACCENT } from '@/components/atoms/titleAccent';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

export default function Section5({ data, loading }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = data?.title?.[locale] || t('Marketing');
  const description = data?.content?.[locale] || t('section5');
  const items = getModalItems(data, locale);

  return (
    <section
      id='marketing'
      aria-busy={loading || undefined}
      aria-labelledby={title ? 'home-marketing-heading' : undefined}
      className='relative isolate flex h-full min-h-screen flex-col overflow-x-clip overflow-y-hidden text-white'
    >
      <div className='hero-slide-bg pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <Image
          src={cmsImage(data?.image?.url, '/landing/bg-5-section.png')}
          alt={data?.image?.alt || ''}
          fill
          sizes='100vw'
          className='img-overlay object-cover object-center'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div aria-hidden='true' className='hero-slide-veil pointer-events-none absolute inset-0 z-[1] bg-black/0' />

      <div className='relative z-10 flex min-h-screen flex-1 flex-col items-center justify-center px-5 py-[12%] pointer-events-auto max-md:px-4 max-md:py-[88px] max-[390px]:px-3 md:px-[6%] xl:px-[7.25%]'>
        {loading ? (
          <>
            <p className='sr-only'>{t('loading')}</p>
            <MarketingSkeleton />
          </>
        ) : (
          <div className='hero-stage flex w-full max-w-[860px] flex-col items-center text-center min-[1600px]:max-w-[920px]'>
            <div className='mb-8 flex items-center justify-center gap-[18px] max-md:mb-[25px] max-md:gap-3'>
              <i className='block h-px w-[72px] bg-[linear-gradient(90deg,transparent,rgba(74,194,248,0.95))] max-md:w-[40px]' />
              <span
                className={`whitespace-nowrap text-[#1da6ed] [text-shadow:0_0_12px_rgba(0,160,240,0.25)] ${
                  isAr
                    ? 'font-cairo text-[11px] font-medium tracking-[2px] max-md:text-[8px]'
                    : 'font-inter text-[13px] font-medium tracking-[6px] max-md:text-[8px] max-md:tracking-[3.6px]'
                }`}
              >
                {pickUi(data, locale, 'eyebrow', t('Hero.digitalGrowth'))}
              </span>
              <i className='block h-px w-[72px] bg-[linear-gradient(90deg,rgba(74,194,248,0.95),transparent)] max-md:w-[40px]' />
            </div>

            {title ? (
              <h2
                id='home-marketing-heading'
                className={`${bodyFont} ${TITLE_ACCENT} m-0 overflow-visible py-[0.08em] text-[clamp(32px,9vw,42px)] font-bold leading-[1.12] tracking-[-1.4px] md:text-[clamp(72px,6.4vw,100px)] md:leading-[1.14] md:tracking-[-3.4px] min-[1600px]:text-[104px]`}
              >
                {title}
              </h2>
            ) : null}

            {description ? (
              <p
                className={`${bodyFont} mx-auto mt-[18px] max-w-[38ch] text-[clamp(15px,4.1vw,19px)] font-normal leading-[1.45] tracking-[-0.3px] text-[rgba(237,241,248,0.84)] [text-shadow:0_2px_9px_rgba(0,0,0,0.22)] max-[390px]:text-sm md:mt-[22px] md:max-w-[42rem] md:text-[clamp(20px,1.6vw,26px)] md:leading-[1.45] md:tracking-[-0.45px] min-[1600px]:text-[26px]`}
              >
                {description}
              </p>
            ) : null}

            <GlowCtaButton className={`${bodyFont} mx-auto mt-6 md:mt-[30px]`} onClick={() => setIsModalOpen(true)}>
              {pickUi(data, locale, 'cta', t('readMore'))}
            </GlowCtaButton>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        items={items}
      />
    </section>
  );
}

function MarketingSkeleton() {
  return (
    <div className='flex w-full max-w-[760px] flex-col items-center'>
      <div className='h-3 w-40 rounded skeleton-box bg-white/20' />
      <div className='mt-8 h-16 w-full max-w-[420px] rounded skeleton-box bg-white/20' />
      <div className='mt-6 h-5 w-full max-w-[520px] rounded skeleton-box bg-white/20' />
      <div className='mt-5 h-5 w-full max-w-[380px] rounded skeleton-box bg-white/20' />
      <div className='mt-8 h-[55px] w-[207px] rounded-full skeleton-box bg-white/20' />
    </div>
  );
}
