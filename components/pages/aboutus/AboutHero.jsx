'use client';

import { pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const BG = '/landing/about-us-bg-1.png';

function splitTitle(raw) {
  const text = (raw || '').trim();
  if (!text) return { lead: '', accent: '' };
  const parts = text.split(/\s+/);
  if (parts.length === 1) return { lead: '', accent: parts[0] };
  return { lead: parts[0], accent: parts.slice(1).join(' ') };
}

export default function AboutHero({ data, loading }) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const title = data?.title?.[locale] || '';
  const { lead, accent } = splitTitle(title);
  const description = data?.content?.[locale] || '';
  const eyebrow = pickUi(data, locale, 'eyebrow', t('Hero.aboutEyebrow'));
  const slogan = pickUi(data, locale, 'slogan', t('Hero.tagline'));

  return (
    <section
      id='about'
      aria-busy={loading || undefined}
      className={`relative isolate flex h-full min-h-[793px] w-full items-center justify-center overflow-hidden text-white max-[1200px]:min-h-[700px] max-[768px]:min-h-[680px] max-[480px]:min-h-[620px] ${bodyFont}`}
    >
      <div className='pointer-events-none absolute inset-0 -z-[5]'>
        <Image
          src={BG}
          alt={data?.image?.alt || ''}
          fill
          priority
          sizes='100vw'
          className='object-cover object-center'
        />
      </div>

      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-[4] bg-[radial-gradient(ellipse_at_50%_15%,rgba(8,75,130,0.17),transparent_48%),radial-gradient(ellipse_at_0%_45%,rgba(4,67,122,0.15),transparent_35%)]'
      />

      <div
        aria-hidden='true'
        className='about-hero-glow pointer-events-none absolute -start-[240px] top-[90px] -z-[2] size-[420px] rounded-full bg-[rgba(0,106,255,0.5)] blur-[70px] max-[480px]:size-[250px] max-[480px]:blur-[55px]'
      />
      <div
        aria-hidden='true'
        className='about-hero-glow pointer-events-none absolute -bottom-[150px] -end-[190px] -z-[2] size-[420px] rounded-full bg-[rgba(0,116,255,0.62)] blur-[70px] max-[480px]:size-[250px] max-[480px]:blur-[55px]'
      />

      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-[75px] -end-[70px] -z-[1] h-[260px] w-[650px] -rotate-45 border-t border-[rgba(12,131,235,0.75)] shadow-[0_-3px_16px_rgba(0,119,255,0.16),0_-1px_40px_rgba(0,119,255,0.12)]'
      />

      <div className='relative z-[5] mt-[-40px] w-[min(1100px,calc(100%-80px))] text-center min-[1600px]:mt-[-55px] min-[1600px]:w-[1200px] max-[1200px]:w-[calc(100%-100px)] max-[768px]:mt-[-50px] max-[768px]:w-[calc(100%-40px)] max-[480px]:mt-[-55px] max-[480px]:w-[calc(100%-28px)]'>
        {loading ? (
          <div className='flex flex-col items-center gap-5'>
            <div className='h-4 w-[180px] rounded skeleton-box' />
            <div className='h-[70px] w-[min(100%,420px)] rounded-lg skeleton-box' />
            <div className='h-5 w-full max-w-[720px] rounded skeleton-box' />
            <div className='h-5 w-4/5 max-w-[640px] rounded skeleton-box' />
          </div>
        ) : (
          <>
            <div className='mb-7 flex items-center justify-center gap-12 max-[768px]:mb-[22px] max-[768px]:gap-[18px] max-[480px]:gap-3'>
              <span className='block h-px w-[105px] bg-[linear-gradient(90deg,transparent,#078fff)] shadow-[0_0_5px_rgba(0,142,255,0.45)] max-[768px]:w-[55px] max-[480px]:w-8' />
              <p className={`m-0 whitespace-nowrap text-[14px] font-medium text-[#069af4] [text-shadow:0_0_12px_rgba(0,148,255,0.25)] max-[768px]:text-[10px] max-[480px]:text-[8px] ${isAr ? 'tracking-[4px] max-[768px]:tracking-[3px]' : 'tracking-[7px] max-[768px]:tracking-[4px] max-[480px]:tracking-[3px]'}`}>
                {eyebrow}
              </p>
              <span className='block h-px w-[105px] bg-[linear-gradient(90deg,#078fff,transparent)] shadow-[0_0_5px_rgba(0,142,255,0.45)] max-[768px]:w-[55px] max-[480px]:w-8' />
            </div>

            {title ? (
              <h2 className='m-0 text-[clamp(64px,5.5vw,94px)] font-bold leading-[0.98] tracking-[-4px] text-[#f5f8fc] [text-shadow:0_4px_25px_rgba(0,0,0,0.2)] max-[768px]:text-[55px] max-[768px]:tracking-[-2.5px] max-[480px]:text-[43px] max-[480px]:tracking-[-2px]'>
                {lead ? lead : ''}
                {accent ? (
                  <span className='inline-block bg-[linear-gradient(180deg,#8cdbff_0%,#16b9ff_35%,#0876ed_100%)] bg-clip-text text-transparent [filter:drop-shadow(0_0_18px_rgba(0,126,255,0.12))] ms-[18px] max-[768px]:ms-[7px] max-[480px]:ms-1'>
                    {accent}
                  </span>
                ) : null}
              </h2>
            ) : null}

            {description ? (
              <p className='mx-auto mt-[26px] max-w-[1100px] text-[clamp(17px,1.42vw,23px)] font-normal leading-[1.65] tracking-[-0.25px] text-[rgba(242,246,250,0.91)] [text-shadow:0_2px_8px_rgba(0,0,0,0.3)] min-[1600px]:max-w-[1160px] max-[1200px]:max-w-[920px] max-[768px]:mt-[22px] max-[768px]:text-[15px] max-[768px]:leading-[1.7] max-[480px]:mt-[19px] max-[480px]:text-[13px] max-[480px]:leading-[1.65]'>
                {description}
              </p>
            ) : null}

            <div className='mt-[42px] flex items-center justify-center gap-[30px] max-[768px]:mt-[30px] max-[768px]:gap-[17px] max-[480px]:mt-[25px] max-[480px]:gap-3'>
              <span className='block h-px w-[60px] bg-[#087de9] shadow-[0_0_7px_rgba(0,139,255,0.55)] max-[768px]:w-[45px] max-[480px]:w-[35px]' />
              <i className='block size-[11px] rounded-full bg-[#0c7bf1] shadow-[0_0_6px_#078cff,0_0_18px_rgba(0,125,255,0.65)] max-[480px]:size-2' />
              <span className='block h-px w-[60px] bg-[#087de9] shadow-[0_0_7px_rgba(0,139,255,0.55)] max-[768px]:w-[45px] max-[480px]:w-[35px]' />
            </div>
          </>
        )}
      </div>

      {loading ? null : (
        <div className={`pointer-events-none absolute bottom-[84px] left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-light text-[rgba(15,62,105,0.58)] text-[clamp(26px,2.6vw,42px)] tracking-[clamp(12px,1.3vw,25px)] min-[1600px]:bottom-[87px] max-[1200px]:bottom-[60px] max-[1200px]:text-[28px] max-[1200px]:tracking-[15px] max-[768px]:bottom-10 max-[768px]:text-base max-[768px]:tracking-[7px] max-[480px]:bottom-7 max-[480px]:text-[11px] max-[480px]:tracking-[4px] ${isAr ? 'tracking-[10px] max-[1200px]:tracking-[8px]' : ''}`}>
          {slogan}
        </div>
      )}
    </section>
  );
}
