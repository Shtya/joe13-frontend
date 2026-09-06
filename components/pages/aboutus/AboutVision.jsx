'use client';

import { pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const BG = '/landing/about-us-bg-3.png';
const TITLE_ACCENT =
  'bg-[linear-gradient(180deg,#62d9ff_0%,#10b7ff_34%,#087cf0_70%,#075fe4_100%)] bg-clip-text font-bold text-transparent [filter:drop-shadow(0_0_13px_rgba(0,129,255,0.18))]';

function splitTitle(raw) {
  const text = (raw || '').trim();
  if (!text) return { lead: '', accent: '' };
  const parts = text.split(/\s+/);
  if (parts.length === 1) return { lead: '', accent: parts[0] };
  return { lead: parts[0], accent: parts.slice(1).join(' ') };
}

function normalizeFeatures(raw, fallback) {
  const source = Array.isArray(raw) && raw.length ? raw : fallback;
  return (fallback || []).map((item, index) => {
    const entry = source[index];
    if (Array.isArray(entry)) return [entry[0] || item[0], entry[1] || item[1] || ''];
    if (typeof entry === 'string' && entry.trim()) {
      const parts = entry.trim().split(/\s+/);
      if (parts.length === 1) return [parts[0], item[1] || ''];
      return [parts[0], parts.slice(1).join(' ')];
    }
    return item;
  });
}

function IconInnovation() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className='relative size-[47px] fill-none stroke-[#e8f5ff] stroke-2 [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_5px_rgba(0,137,255,0.8))_drop-shadow(0_0_13px_rgba(0,103,255,0.45))] max-[600px]:size-10'>
      <path d='M32 7c-9.5 0-17 7.5-17 17 0 5.1 2.3 9.8 6.2 13v7h21.6v-7c3.9-3.2 6.2-7.9 6.2-13C49 14.5 41.5 7 32 7Z' />
      <path d='M24 51h16M26 57h12' />
      <path d='M32 16v13M25.5 22.5h13' />
    </svg>
  );
}

function IconGrowth() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className='relative size-[47px] fill-none stroke-[#e8f5ff] stroke-2 [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_5px_rgba(0,137,255,0.8))_drop-shadow(0_0_13px_rgba(0,103,255,0.45))] max-[600px]:size-10'>
      <path d='M11 51V39h9v12h-9ZM27 51V27h9v24h-9ZM43 51V15h9v36h-9Z' />
      <path d='M10 22l12-9 10 6 18-12' />
      <path d='M43 7h7v7' />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className='relative size-[47px] fill-none stroke-[#e8f5ff] stroke-2 [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_5px_rgba(0,137,255,0.8))_drop-shadow(0_0_13px_rgba(0,103,255,0.45))] max-[600px]:size-10'>
      <circle cx='32' cy='32' r='22' />
      <path d='M10 32h44M32 10c7 7 10 14 10 22s-3 15-10 22M32 10c-7 7-10 14-10 22s3 15 10 22' />
      <path d='M14 20h36M14 44h36' />
    </svg>
  );
}

const ICONS = [IconInnovation, IconGrowth, IconGlobe];

export default function AboutVision({ data, loading }) {
  const ta = useTranslations('aboutUs');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const title = data?.title?.[locale] || ta('ourVisionTitle');
  const { lead, accent } = splitTitle(title);
  const description = data?.content?.[locale] || ta('ourVision');
  const eyebrow = pickUi(data, locale, 'eyebrow', ta('visionEyebrow'));
  const features = normalizeFeatures(pickUi(data, locale, 'features'), ta.raw('visionFeatures'));

  return (
    <section
      id='vision'
      dir={isAr ? 'rtl' : 'ltr'}
      aria-busy={loading || undefined}
      className={`relative isolate h-full min-h-screen w-full overflow-hidden bg-[#020914] text-white max-[1200px]:min-h-[700px] max-[850px]:h-auto max-[850px]:min-h-[760px] max-[600px]:min-h-[700px] ${bodyFont}`}
    >
      <div className='pointer-events-none absolute inset-0 -z-[10]'>
        <Image
          src={BG}
          alt={data?.image?.alt || ''}
          fill
          sizes='100vw'
          className='object-cover object-center max-[600px]:object-[63%_center]'
        />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(90deg,rgba(1,9,18,0.15)_0%,rgba(1,9,18,0.02)_52%,rgba(1,9,18,0)_100%)] max-[600px]:bg-[linear-gradient(90deg,rgba(1,9,18,0.55),rgba(1,9,18,0.22))] rtl:bg-[linear-gradient(270deg,rgba(1,9,18,0.15)_0%,rgba(1,9,18,0.02)_52%,rgba(1,9,18,0)_100%)] rtl:max-[600px]:bg-[linear-gradient(270deg,rgba(1,9,18,0.55),rgba(1,9,18,0.22))]'
      />

      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-[390px] -start-[430px] z-[2] h-[600px] w-[1250px] rotate-[12deg] rounded-full border border-[rgba(8,135,242,0.43)] border-e-[rgba(8,135,242,0.1)] border-t-[rgba(8,135,242,0.08)] shadow-[0_0_7px_rgba(0,123,255,0.14)] max-[600px]:-bottom-[250px] max-[600px]:-start-[330px] max-[600px]:h-[360px] max-[600px]:w-[700px]'
      >
        <span className='absolute end-[19%] top-[9%] size-[7px] rounded-full bg-[#a5e5ff] shadow-[0_0_7px_#1aaeff,0_0_18px_#008dff,0_0_38px_rgba(0,132,255,0.9)]' />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-[330px] -end-[410px] z-[2] h-[630px] w-[1100px] -rotate-[14deg] rounded-full border border-[rgba(8,135,242,0.43)] border-s-[rgba(8,135,242,0.2)] border-t-[rgba(8,135,242,0.05)] max-[600px]:-bottom-[220px] max-[600px]:-end-[340px] max-[600px]:h-[380px] max-[600px]:w-[650px]'
      >
        <span className='absolute start-[21%] top-[17%] size-[7px] rounded-full bg-[#a5e5ff] shadow-[0_0_7px_#1aaeff,0_0_18px_#008dff,0_0_38px_rgba(0,132,255,0.9)]' />
      </div>

      <div className='relative z-[5] flex h-full min-h-screen items-center max-[850px]:min-h-[760px] max-[850px]:items-start max-[600px]:min-h-[700px]'>
        <div className='ms-[clamp(60px,6.55vw,126px)] w-[min(690px,42vw)] min-[1600px]:w-[720px] max-[1200px]:ms-[5vw] max-[1200px]:w-[46vw] max-[850px]:mx-auto max-[850px]:w-[calc(100%-70px)] max-[850px]:px-0 max-[850px]:py-[130px] max-[850px]:text-center max-[600px]:w-[calc(100%-34px)] max-[600px]:py-[90px] max-[600px]:pb-[125px] max-[390px]:pt-[75px]'>
          {loading ? (
            <VisionSkeleton />
          ) : (
            <>
              <div className='mb-6 flex items-center gap-[17px] max-[850px]:justify-center max-[600px]:mb-5 max-[600px]:gap-[11px]'>
                <span
                  className={`whitespace-nowrap text-[clamp(11px,0.85vw,15px)] font-medium leading-none text-[#079df5] [text-shadow:0_0_12px_rgba(0,153,255,0.3)] max-[600px]:text-[9px] ${
                    isAr ? 'tracking-[4px] max-[600px]:tracking-[3px]' : 'tracking-[clamp(5px,0.55vw,9px)] max-[600px]:tracking-[4px]'
                  }`}
                >
                  {eyebrow}
                </span>
                <i className='block h-px w-[clamp(100px,7.8vw,150px)] bg-[linear-gradient(90deg,#08a5ff,rgba(8,165,255,0.2))] shadow-[0_0_7px_rgba(0,145,255,0.5)] max-[600px]:w-[45px] rtl:bg-[linear-gradient(270deg,#08a5ff,rgba(8,165,255,0.2))]' />
              </div>

              {title ? (
                <h2 className='m-0 text-[clamp(58px,5.15vw,98px)] font-bold leading-[0.98] tracking-[clamp(-4px,-0.25vw,-2px)] text-[#f7f9fc] [text-shadow:0_3px_15px_rgba(0,0,0,0.28)] max-[600px]:text-[49px] max-[600px]:tracking-[-2px] max-[390px]:text-[42px]'>
                  {lead ? `${lead} ` : ''}
                  {accent ? <strong className={TITLE_ACCENT}>{accent}</strong> : null}
                </h2>
              ) : null}

              {description ? (
                <p className='mt-[29px] w-full max-w-[675px] text-[clamp(16px,1.3vw,24px)] font-normal leading-[1.47] tracking-[-0.2px] text-[rgba(246,248,252,0.94)] [text-shadow:0_2px_9px_rgba(0,0,0,0.45)] min-[1600px]:max-w-[700px] max-[1200px]:text-[18px] max-[850px]:mx-auto max-[850px]:max-w-[650px] max-[600px]:mt-[22px] max-[600px]:text-sm max-[600px]:leading-[1.65] max-[390px]:text-[13px]'>
                  {description}
                </p>
              ) : null}

              <div className='mt-[43px] flex w-max max-w-full items-center min-[1600px]:mt-12 max-[850px]:w-full max-[850px]:justify-center max-[600px]:mt-8 max-[600px]:grid max-[600px]:w-full max-[600px]:grid-cols-3 max-[600px]:gap-3 max-[390px]:gap-1.5'>
                {features.map((lines, index) => {
                  const Icon = ICONS[index] || IconInnovation;
                  return (
                    <div key={`${lines[0]}-${index}`} className='contents'>
                      {index > 0 ? (
                        <div className='mx-[26px] h-[52px] w-px bg-[linear-gradient(180deg,transparent,rgba(119,171,211,0.62),transparent)] max-[1200px]:mx-[15px] max-[600px]:hidden' />
                      ) : null}
                      <div className='flex min-w-[170px] items-center gap-[17px] max-[1200px]:min-w-[145px] max-[1200px]:gap-2.5 max-[600px]:min-w-0 max-[600px]:flex-col max-[600px]:justify-center max-[600px]:gap-[5px] max-[600px]:text-center'>
                        <div className="relative flex h-14 w-12 shrink-0 items-center justify-center before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle,rgba(0,111,255,0.15),transparent_68%)] before:blur-[4px] before:content-[''] max-[600px]:h-12 max-[600px]:w-[42px]">
                          <Icon />
                        </div>
                        <div className='flex flex-col gap-1'>
                          <span className='whitespace-nowrap text-[clamp(14px,1vw,18px)] font-normal leading-[1.2] text-[rgba(248,250,253,0.95)] max-[600px]:whitespace-normal max-[600px]:text-[11px] max-[390px]:text-[10px]'>
                            {lines[0]}
                          </span>
                          {lines[1] ? (
                            <span className='whitespace-nowrap text-[clamp(14px,1vw,18px)] font-normal leading-[1.2] text-[rgba(248,250,253,0.95)] max-[600px]:whitespace-normal max-[600px]:text-[11px] max-[390px]:text-[10px]'>
                              {lines[1]}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function VisionSkeleton() {
  return (
    <div className='flex flex-col gap-5 max-[850px]:items-center'>
      <div className='h-4 w-[180px] rounded skeleton-box' />
      <div className='h-[70px] w-[min(100%,420px)] rounded-lg skeleton-box' />
      <div className='h-5 w-full max-w-[620px] rounded skeleton-box' />
      <div className='h-5 w-4/5 max-w-[540px] rounded skeleton-box' />
      <div className='mt-6 flex gap-8 max-[600px]:grid max-[600px]:w-full max-[600px]:grid-cols-3 max-[600px]:gap-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='h-14 w-[160px] rounded skeleton-box max-[600px]:w-full' />
        ))}
      </div>
    </div>
  );
}
