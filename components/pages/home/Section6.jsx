'use client';

import Modal, { getModalItems } from '@/components/molecules/Modal';
import GlowCtaButton from '@/components/atoms/GlowCtaButton';
import { TITLE_ACCENT } from '@/components/atoms/titleAccent';
import GlowFeatureCard, { GlowFeatureGrid } from '@/components/atoms/GlowFeatureCard';
import { cmsImage, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const FEATURES = [
  { key: 'Hero.customSoftware', src: '/landing/icon-6-1.png' },
  { key: 'Hero.aiSolutions', src: '/landing/icon-6-2.png' },
  { key: 'Hero.systemIntegration', src: '/landing/icon-6-3.png' },
  { key: 'Hero.ongoingSupport', src: '/landing/icon-6-4.png' },
];

export default function Section6({ data, loading }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = data?.title?.[locale] || t('Software & AI');
  const description = data?.content?.[locale] || t('section6');
  const items = getModalItems(data, locale);
  const featureLabels = pickUi(data, locale, 'features');
  const featureItems = FEATURES.map((item, index) => ({
    ...item,
    label: Array.isArray(featureLabels) ? featureLabels[index] : null,
  }));

  return (
    <section
      id='software-ai'
      aria-busy={loading || undefined}
      aria-labelledby={title ? 'home-software-heading' : undefined}
      className='relative isolate flex min-h-screen flex-col overflow-x-clip overflow-y-hidden text-white'
    >
      <div className='hero-slide-bg pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <Image
          src={cmsImage(data?.image?.url, '/landing/bg-6-section.png')}
          alt={data?.image?.alt || ''}
          fill
          sizes='100vw'
          className='img-overlay object-cover object-center'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div aria-hidden='true' className='hero-slide-veil pointer-events-none absolute inset-0 z-[1] bg-black/0' />

      <div className='relative z-10 flex min-h-screen flex-1 flex-col justify-center px-5 py-[12%] pointer-events-auto max-[390px]:px-5 md:px-[5%] xl:px-[6.72%]'>
        {loading ? (
          <>
            <p className='sr-only'>{t('loading')}</p>
            <SoftwareSkeleton />
          </>
        ) : (
          <div className='hero-stage w-full max-w-[760px] text-start min-[1600px]:max-w-[820px]'>
            <div className='mb-[31px] flex items-center gap-[25px] max-md:mb-[22px] max-md:gap-3.5'>
              <span
                className={`whitespace-nowrap text-[#18a9ee] [text-shadow:0_0_12px_rgba(0,163,242,0.25)] ${
                  isAr
                    ? 'font-cairo text-[11px] font-medium tracking-[2px] max-md:text-[8px]'
                    : 'font-inter text-[13px] font-medium tracking-[5.9px] max-md:text-[8px] max-md:tracking-[3.3px] max-[390px]:text-[7px] max-[390px]:tracking-[2.8px]'
                }`}
              >
                {pickUi(data, locale, 'eyebrow', t('Hero.smarterTomorrow'))}
              </span>
              <i className='block h-px w-[83px] bg-[linear-gradient(90deg,rgba(82,194,247,0.95),rgba(41,160,222,0.2))] max-md:w-[45px] max-[390px]:w-9 rtl:bg-[linear-gradient(90deg,rgba(41,160,222,0.2),rgba(82,194,247,0.95))]' />
            </div>

            {title ? <SoftwareTitle id='home-software-heading' title={title} locale={locale} className={bodyFont} /> : null}

            {description ? (
              <p className={`${bodyFont} mt-5 max-w-[640px] text-[21px] font-normal leading-[1.55] tracking-[-0.35px] text-[rgba(227,235,245,0.9)] [text-shadow:0_2px_9px_rgba(0,0,0,0.28)] max-md:mt-[17px] max-md:max-w-none max-md:text-sm max-md:leading-[1.45] max-[1100px]:max-w-[540px] max-[1100px]:text-[17px] max-[390px]:text-[13px] min-[1600px]:max-w-[660px]`}>
                {description}
              </p>
            ) : null}

            <GlowFeatureGrid className='mt-9 max-md:mt-[25px] min-[1600px]:max-w-[740px]'>
              {featureItems.map(({ key, src, label }) => (
                <GlowFeatureCard key={key} src={src} className={bodyFont}>
                  {label || t(key)}
                </GlowFeatureCard>
              ))}
            </GlowFeatureGrid>

            <GlowCtaButton className={`${bodyFont} mt-8 max-md:mt-6`} onClick={() => setIsModalOpen(true)}>
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

function SoftwareTitle({ id, title, locale, className }) {
  const accent = locale === 'ar' ? 'الذكاء الاصطناعي' : 'AI';
  const titleClass = `${className} m-0 overflow-visible py-[0.08em] text-[clamp(48px,14vw,72px)] font-bold leading-[1.08] tracking-[-2.6px] text-[#f7f9fc] [text-shadow:0_3px_14px_rgba(0,0,0,0.18)] max-[390px]:text-[47px] max-[390px]:tracking-[-2.4px] md:text-[clamp(64px,5.6vw,88px)] md:tracking-[-3.6px] min-[1600px]:text-[88px] ${
    locale === 'ar' ? '' : 'md:whitespace-nowrap'
  }`;
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

function SoftwareSkeleton() {
  return (
    <div className='w-full max-w-[760px]'>
      <div className='h-3 w-64 rounded skeleton-box bg-white/20' />
      <div className='mt-8 h-16 w-full max-w-[480px] rounded skeleton-box bg-white/20' />
      <div className='mt-6 h-5 w-full max-w-[520px] rounded skeleton-box bg-white/20' />
      <div className='mt-3 h-5 w-full max-w-[420px] rounded skeleton-box bg-white/20' />
      <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='min-h-[148px] rounded-[16px] skeleton-box bg-white/20' />
        ))}
      </div>
      <div className='mt-8 h-[55px] w-[207px] rounded-full skeleton-box bg-white/20' />
    </div>
  );
}

