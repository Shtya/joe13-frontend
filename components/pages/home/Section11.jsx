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
  { key: 'Hero.innovativeSolutions', src: '/landing/icon-10-1.png' },
  { key: 'Hero.builtForBusinesses', src: '/landing/icon-10-2.png' },
  { key: 'Hero.realImpactFeature', src: '/landing/icon-10-3.png' },
  { key: 'Hero.continuousGrowth', src: '/landing/icon-10-4.png' },
];

export default function Section11({ data, loading }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = data?.title?.[locale] || t('Our Products');
  const subtitle = data?.content?.[locale] || t('section11');
  const description = pickUi(data, locale, 'body', t('Hero.productsDescription'));
  const items = getModalItems(data, locale);
  const featureLabels = pickUi(data, locale, 'features');
  const featureItems = FEATURES.map((item, index) => ({
    ...item,
    label: Array.isArray(featureLabels) ? featureLabels[index] : null,
  }));
  const eyebrowParts = pickUi(data, locale, 'eyebrowParts') || [
    t('Hero.eyebrowSolutions'),
    t('Hero.eyebrowThat'),
    t('Hero.eyebrowMatter'),
  ];

  return (
    <section
      id='products'
      aria-busy={loading || undefined}
      aria-labelledby={title ? 'home-products-heading' : undefined}
      className='relative isolate flex h-full min-h-screen flex-col overflow-hidden text-white'
    >
      <div className='hero-slide-bg pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        <Image
          src={cmsImage(data?.image?.url, '/landing/bg-10-section.png')}
          alt={data?.image?.alt || ''}
          fill
          sizes='100vw'
          className='img-overlay object-cover object-center max-md:object-[63%_center] max-[900px]:object-[60%_center]'
        />
        <div aria-hidden='true' className='bg-overlay' />
      </div>
      <div aria-hidden='true' className='hero-slide-veil pointer-events-none absolute inset-0 z-[1] bg-black/0' />

      <div className='relative z-10 flex min-h-screen flex-1 flex-col px-[22px] pb-[10vh] pt-[14%] pointer-events-auto max-md:justify-center max-md:px-4 max-md:py-[88px] max-[390px]:px-3 md:px-[5%] md:pt-[17%] xl:px-[5.9%] xl:pt-[19.6%]'>
        {loading ? (
          <>
            <p className='sr-only'>{t('loading')}</p>
            <ProductsSkeleton />
          </>
        ) : (
          <div className='hero-stage w-full max-w-[620px] text-start min-[1600px]:max-w-[650px] max-[1200px]:max-w-[560px] max-[900px]:max-w-[480px]'>
            <div
              className={`mb-6 flex h-4 items-center gap-[17px] whitespace-nowrap text-[#079fe7] [text-shadow:0_0_12px_rgba(0,163,240,0.28)] max-md:mb-5 max-md:h-auto max-md:gap-2.5 max-[900px]:gap-3 ${
                isAr
                  ? 'font-cairo text-[10px] font-medium tracking-[2px] max-md:text-[6.5px] max-[900px]:text-[8px] max-[390px]:text-[6px]'
                  : 'font-inter text-[10px] font-medium tracking-[5.7px] max-md:text-[6.5px] max-md:tracking-[2.9px] max-[900px]:text-[8px] max-[900px]:tracking-[4px] max-[390px]:text-[6px] max-[390px]:tracking-[2.4px]'
              }`}
            >
              {eyebrowParts.map((part) => (
                <span key={part}>{part}</span>
              ))}
              <i className='block h-px w-[93px] bg-[linear-gradient(90deg,rgba(12,170,240,0.95),rgba(12,170,240,0.18))] max-md:w-[38px] max-[900px]:w-[70px] max-[390px]:w-[30px] rtl:bg-[linear-gradient(90deg,rgba(12,170,240,0.18),rgba(12,170,240,0.95))]' />
            </div>

            {title ? (
              <ProductsTitle id='home-products-heading' title={title} locale={locale} className={bodyFont} />
            ) : null}

            {subtitle ? (
              <div className={`${bodyFont} mt-[9px] text-[30px] font-normal leading-[1.1] tracking-[-1px] text-[rgba(242,247,252,0.94)] [text-shadow:0_2px_8px_rgba(0,0,0,0.25)] max-md:text-[clamp(19px,5.5vw,28px)] max-md:tracking-[-0.7px] max-[1200px]:text-[26px] max-[900px]:text-[23px] max-[390px]:text-[18px] min-[1600px]:text-[31px]`}>
                {subtitle}
              </div>
            ) : null}

            {description ? (
              <p className={`${bodyFont} mt-[21px] text-[17px] font-normal leading-[1.55] tracking-[-0.25px] text-[rgba(224,235,247,0.82)] [text-shadow:0_2px_8px_rgba(0,0,0,0.25)] max-md:mt-[15px] max-md:text-[11.5px] max-md:leading-[1.48] max-[1200px]:text-[15px] max-[900px]:text-[13px] max-[390px]:text-[10.7px] min-[1600px]:text-lg`}>
                {description}
              </p>
            ) : null}

            <GlowFeatureGrid>
              {featureItems.map(({ key, src, label }) => (
                <GlowFeatureCard key={key} src={src} className={bodyFont}>
                  {label || t(key)}
                </GlowFeatureCard>
              ))}
            </GlowFeatureGrid>

            <GlowCtaButton className={`${bodyFont} mt-[29px] max-md:mt-[23px]`} onClick={() => setIsModalOpen(true)}>
              {pickUi(data, locale, 'cta', t('readMore'))}
            </GlowCtaButton>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={subtitle}
        items={items}
      />
    </section>
  );
}

function ProductsTitle({ id, title, locale, className }) {
  const titleClass = `${className} m-0 flex items-baseline whitespace-nowrap text-[clamp(26px,8vw,36px)] font-bold leading-[1.05] tracking-[-1.2px] text-[#f8fafc] [text-shadow:0_2px_12px_rgba(0,0,0,0.22)] max-md:block max-md:w-full max-[1200px]:md:text-[60px] max-[900px]:md:text-[52px] max-[900px]:md:tracking-[-2.7px] md:text-[68px] md:leading-[0.94] md:tracking-[-3.5px] min-[1600px]:text-[70px]`;
  const accentClass = `ms-[13px] ${TITLE_ACCENT} font-bold not-italic max-md:ms-[5px]`;

  if (locale !== 'ar') {
    const productIndex = title.search(/products/i);
    if (productIndex >= 0) {
      const before = title.slice(0, productIndex).trim();
      const word = title.slice(productIndex).split(/\s/)[0];
      const after = title.slice(productIndex + word.length).trim();
      return (
        <h2 id={id} className={titleClass}>
          {before ? <span>{before}</span> : null}
          <strong className={accentClass}>{word}</strong>
          {after ? <span className='ms-3'>{after}</span> : null}
        </h2>
      );
    }
  }

  return (
    <h2 id={id} className={titleClass}>
      <strong className={`${accentClass} ms-0`}>{title}</strong>
    </h2>
  );
}

function ProductsSkeleton() {
  return (
    <div className='w-full max-w-[620px]'>
      <div className='h-3 w-56 rounded skeleton-box bg-white/20' />
      <div className='mt-6 h-14 w-full max-w-[380px] rounded skeleton-box bg-white/20' />
      <div className='mt-3 h-8 w-full max-w-[420px] rounded skeleton-box bg-white/20' />
      <div className='mt-5 h-5 w-full max-w-[500px] rounded skeleton-box bg-white/20' />
      <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='min-h-[148px] rounded-[16px] skeleton-box bg-white/20' />
        ))}
      </div>
      <div className='mt-7 h-[53px] w-[202px] rounded-full skeleton-box bg-white/20' />
    </div>
  );
}

