'use client';

import { pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const BG = '/landing/about-us-bg-4.png';
const TITLE_ACCENT =
  'bg-[linear-gradient(180deg,#5edcff_0%,#12baff_34%,#087ff1_72%,#075ce0_100%)] bg-clip-text font-bold text-transparent [filter:drop-shadow(0_0_14px_rgba(0,132,255,0.22))]';
const ICON =
  'relative size-[49px] fill-none stroke-[#ecf8ff] stroke-[2.2] [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_5px_rgba(0,150,255,0.95))_drop-shadow(0_0_14px_rgba(0,105,255,0.5))] max-[600px]:size-[39px]';

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

function normalizeLines(raw, fallback) {
  if (Array.isArray(raw) && raw.length) return raw.map(String);
  return fallback || [];
}

function IconPeople() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={ICON}>
      <circle cx='32' cy='18' r='8' />
      <circle cx='17' cy='25' r='6' />
      <circle cx='47' cy='25' r='6' />
      <path d='M19 47c0-9 5-14 13-14s13 5 13 14' />
      <path d='M5 45c0-7 4-11 10-11 4 0 7 2 9 5' />
      <path d='M59 45c0-7-4-11-10-11-4 0-7 2-9 5' />
    </svg>
  );
}

function IconGrowth() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={ICON}>
      <path d='M9 50V38h9v12H9Z' />
      <path d='M25 50V29h9v21h-9Z' />
      <path d='M41 50V18h9v32h-9Z' />
      <path d='M10 27l13-9 9 6 19-16' />
      <path d='M43 8h8v8' />
    </svg>
  );
}

function IconIdea() {
  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className={ICON}>
      <path d='M32 7c-10 0-17 7-17 17 0 6 3 10 7 14v7h20v-7c4-4 7-8 7-14 0-10-7-17-17-17Z' />
      <path d='M24 51h16' />
      <path d='M26 57h12' />
      <path d='M27 27c3-3 8-3 11 0' />
      <path d='M32 21v11' />
    </svg>
  );
}

const ICONS = [IconPeople, IconGrowth, IconIdea];

export default function AboutMission({ data, loading }) {
  const ta = useTranslations('aboutUs');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const title = data?.title?.[locale] || ta('ourMissionTitle');
  const { lead, accent } = splitTitle(title);
  const description = data?.content?.[locale] || ta('ourMission');
  const eyebrow = pickUi(data, locale, 'eyebrow', ta('missionEyebrow'));
  const caption = pickUi(data, locale, 'slogan', ta('missionCaption'));
  const watermark = pickUi(data, locale, 'watermark', ta('missionWord'));
  const features = normalizeFeatures(pickUi(data, locale, 'features'), ta.raw('missionFeatures'));
  const sideLeft = normalizeLines(pickUi(data, locale, 'sideLeft'), ta.raw('missionSideLeft'));
  const sideRight = normalizeLines(pickUi(data, locale, 'sideRight'), ta.raw('missionSideRight'));

  return (
    <section
      id='mission'
      dir={isAr ? 'rtl' : 'ltr'}
      aria-busy={loading || undefined}
      className={`relative isolate h-full min-h-screen w-full overflow-hidden bg-[#020914] text-white max-[1200px]:min-h-[680px] max-[850px]:h-auto max-[850px]:min-h-[760px] max-[600px]:min-h-[700px] ${bodyFont}`}
    >
      <div className='pointer-events-none absolute inset-0 -z-[10]'>
        <Image src={BG} alt={data?.image?.alt || ''} fill sizes='100vw' className='object-cover object-center' />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(1,7,15,0.08)_0%,rgba(1,7,15,0.02)_38%,rgba(1,7,15,0.08)_100%)] max-[600px]:bg-[linear-gradient(180deg,rgba(1,7,15,0.25),rgba(1,7,15,0.05)_45%,rgba(1,7,15,0.2))]'
      />

      <div
        aria-hidden='true'
        className={`pointer-events-none absolute left-1/2 top-[40%] z-[-2] w-full -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[clamp(150px,19vw,365px)] font-bold leading-[0.8] text-[rgba(14,38,61,0.34)] max-[1200px]:top-[45%] max-[1200px]:text-[18vw] max-[850px]:top-[55%] max-[850px]:text-[24vw] max-[600px]:top-[54%] max-[600px]:text-[25vw] ${
          isAr ? 'tracking-[8px] max-[600px]:tracking-[4px]' : 'tracking-[clamp(8px,1vw,20px)] max-[600px]:tracking-[4px]'
        }`}
      >
        {watermark}
      </div>

      {!loading && sideLeft.length ? (
        <div className={`pointer-events-none absolute start-[2.8%] top-[15%] z-[4] hidden flex-col gap-[13px] ps-[30px] text-[11px] font-medium leading-[1.1] text-[rgba(14,123,198,0.42)] before:absolute before:start-0 before:top-[-7px] before:h-[109px] before:w-px before:bg-[linear-gradient(180deg,#009eff,rgba(0,158,255,0.15))] before:content-[''] min-[1201px]:flex ${isAr ? 'tracking-[2px]' : 'tracking-[6px]'}`}>
          {sideLeft.map(line => (
            <span key={line} className='whitespace-nowrap'>
              {line}
            </span>
          ))}
        </div>
      ) : null}

      {!loading && sideRight.length ? (
        <div className={`pointer-events-none absolute end-[2.8%] top-[15%] z-[4] hidden flex-col gap-[13px] pe-[30px] text-end text-[11px] font-medium leading-[1.1] text-[rgba(14,123,198,0.42)] before:absolute before:end-0 before:top-[-7px] before:h-[109px] before:w-px before:bg-[linear-gradient(180deg,#009eff,rgba(0,158,255,0.15))] before:content-[''] min-[1201px]:flex ${isAr ? 'tracking-[2px]' : 'tracking-[6px]'}`}>
          {sideRight.map(line => (
            <span key={line} className='whitespace-nowrap'>
              {line}
            </span>
          ))}
        </div>
      ) : null}

      <div
        aria-hidden='true'
        className='pointer-events-none absolute bottom-[17%] left-1/2 z-[3] h-px w-[46%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(8,137,255,0.7),transparent)] blur-[0.2px] shadow-[0_0_12px_rgba(0,129,255,0.65)] max-[600px]:w-[70%]'
      />

      <div className='relative z-10 mx-auto w-[min(1250px,80vw)] pt-[calc(4.2%+36px)] text-center min-[1600px]:w-[1300px] max-[1200px]:w-[82vw] max-[1200px]:pt-[calc(5%+36px)] max-[850px]:w-[calc(100%-40px)] max-[850px]:px-0 max-[850px]:pb-[150px] max-[850px]:pt-[calc(5rem+36px)] max-[600px]:w-[calc(100%-28px)] max-[600px]:pb-[125px] max-[600px]:pt-[calc(65px+36px)] max-[390px]:pt-[calc(55px+36px)]'>
        {loading ? (
          <MissionSkeleton />
        ) : (
          <>
            <div className='mb-[11px] flex items-center justify-center gap-[23px] max-[600px]:mb-[15px] max-[600px]:gap-[11px]'>
              <span className='block h-px w-[clamp(70px,4.8vw,95px)] bg-[linear-gradient(90deg,#08a8ff,rgba(7,157,245,0.35))] shadow-[0_0_7px_rgba(0,145,255,0.45)] max-[600px]:w-[38px]' />
              <span
                className={`whitespace-nowrap text-[clamp(10px,0.75vw,15px)] font-medium leading-none text-[#079df5] [text-shadow:0_0_12px_rgba(0,150,255,0.3)] max-[600px]:text-[9px] ${
                  isAr ? 'tracking-[4px] max-[600px]:tracking-[3px]' : 'tracking-[clamp(5px,0.55vw,9px)] max-[600px]:tracking-[4px]'
                }`}
              >
                {eyebrow}
              </span>
              <span className='block h-px w-[clamp(70px,4.8vw,95px)] bg-[linear-gradient(90deg,rgba(7,157,245,0.35),#08a8ff)] shadow-[0_0_7px_rgba(0,145,255,0.45)] max-[600px]:w-[38px]' />
            </div>

            {title ? (
              <h2 className='m-0 text-[clamp(58px,5.4vw,103px)] font-bold leading-[0.95] tracking-[-4px] text-[#f8faff] [text-shadow:0_4px_20px_rgba(0,0,0,0.35)] max-[600px]:text-[46px] max-[600px]:tracking-[-2px] max-[390px]:text-4xl'>
                {lead ? `${lead} ` : ''}
                {accent ? <strong className={TITLE_ACCENT}>{accent}</strong> : null}
              </h2>
            ) : null}

            {description ? (
              <p className='mx-auto mt-[22px] w-full max-w-[1200px] text-[clamp(15px,1.15vw,22px)] font-normal leading-[1.55] text-[rgba(246,249,253,0.94)] [text-shadow:0_2px_10px_rgba(0,0,0,0.5)] min-[1600px]:max-w-[1230px] max-[1200px]:max-w-[950px] max-[1200px]:text-[17px] max-[850px]:max-w-[700px] max-[850px]:text-[15px] max-[600px]:mt-5 max-[600px]:text-[13px] max-[600px]:leading-[1.65] max-[390px]:text-xs'>
                {description}
              </p>
            ) : null}

            <div className='mt-6 flex items-center justify-center min-[1600px]:mt-7 max-[850px]:mt-[30px] max-[850px]:flex-wrap max-[850px]:gap-5 max-[600px]:grid max-[600px]:w-full max-[600px]:grid-cols-3 max-[600px]:gap-2.5'>
              {features.map((lines, index) => {
                const Icon = ICONS[index] || IconPeople;
                return (
                  <div key={`${lines[0]}-${index}`} className='contents'>
                    {index > 0 ? (
                      <div className='mx-[38px] h-[42px] w-px bg-[linear-gradient(180deg,transparent,rgba(31,145,222,0.85),transparent)] shadow-[0_0_5px_rgba(0,133,255,0.25)] min-[1600px]:mx-[45px] max-[1200px]:mx-5 max-[850px]:hidden' />
                    ) : null}
                    <div className='flex min-w-[220px] items-center gap-[17px] text-start min-[1600px]:min-w-[240px] max-[1200px]:min-w-[180px] max-[1200px]:gap-[11px] max-[850px]:min-w-[190px] max-[850px]:justify-center max-[600px]:min-w-0 max-[600px]:flex-col max-[600px]:justify-start max-[600px]:gap-[7px] max-[600px]:text-center'>
                      <div className="relative flex size-[55px] shrink-0 items-center justify-center before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle,rgba(0,118,255,0.18),transparent_68%)] before:blur-[5px] before:content-[''] max-[600px]:h-[47px] max-[600px]:w-[43px]">
                        <Icon />
                      </div>
                      <div className='flex flex-col gap-[3px] max-[600px]:text-center'>
                        <span className='whitespace-nowrap text-[clamp(14px,1vw,19px)] font-normal leading-[1.2] text-[rgba(248,250,253,0.97)] max-[600px]:whitespace-normal max-[600px]:text-[11px] max-[390px]:text-[10px]'>
                          {lines[0]}
                        </span>
                        {lines[1] ? (
                          <span className='whitespace-nowrap text-[clamp(14px,1vw,19px)] font-normal leading-[1.2] text-[rgba(248,250,253,0.97)] max-[600px]:whitespace-normal max-[600px]:text-[11px] max-[390px]:text-[10px]'>
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

      {loading ? null : (
        <div className='pointer-events-none absolute bottom-[3.5%] left-1/2 z-[8] flex w-full -translate-x-1/2 items-center justify-center gap-[25px] max-[850px]:bottom-[35px] max-[600px]:bottom-7 max-[600px]:gap-2.5'>
          <span className='block h-px w-[clamp(70px,5vw,100px)] bg-[linear-gradient(90deg,transparent,rgba(86,161,208,0.7))] max-[600px]:w-8' />
          <p
            className={`m-0 whitespace-nowrap text-[clamp(9px,0.7vw,13px)] font-medium text-[rgba(187,215,237,0.72)] max-[600px]:text-[7px] ${
              isAr ? 'tracking-[3px] max-[600px]:tracking-[2px] max-[390px]:tracking-[2px]' : 'tracking-[clamp(5px,0.55vw,9px)] max-[600px]:tracking-[3px] max-[390px]:tracking-[2px]'
            }`}
          >
            {caption}
          </p>
          <span className='block h-px w-[clamp(70px,5vw,100px)] bg-[linear-gradient(90deg,rgba(86,161,208,0.7),transparent)] max-[600px]:w-8' />
        </div>
      )}
    </section>
  );
}

function MissionSkeleton() {
  return (
    <div className='flex flex-col items-center gap-5'>
      <div className='h-4 w-[180px] rounded skeleton-box' />
      <div className='h-[70px] w-[min(100%,480px)] rounded-lg skeleton-box' />
      <div className='h-5 w-full max-w-[720px] rounded skeleton-box' />
      <div className='h-5 w-4/5 max-w-[640px] rounded skeleton-box' />
      <div className='mt-4 flex gap-8 max-[600px]:grid max-[600px]:w-full max-[600px]:grid-cols-3 max-[600px]:gap-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='h-14 w-[180px] rounded skeleton-box max-[600px]:w-full' />
        ))}
      </div>
    </div>
  );
}
