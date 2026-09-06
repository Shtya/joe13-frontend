'use client';

import { baseImage } from '@/helpers/baseUrl';
import { useTeamMemeberData } from '@/hooks/useTeamMemeber';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const BG = '/landing/bg-project-2.png';
const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(16,164,255,0.95)]';

function visibleCount() {
  const width = window.innerWidth;
  if (width <= 600) return 1;
  if (width <= 900) return 2;
  if (width <= 1300) return 3;
  return 4;
}

function splitTitle(raw) {
  const parts = String(raw || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return { lead: '', accent: '' };
  if (parts.length === 1) return { lead: '', accent: parts[0] };
  return { lead: parts.slice(0, -1).join(' '), accent: parts[parts.length - 1] };
}

function linkedinUrl(member) {
  const value =
    member?.linkedin ||
    member?.linkedin_url ||
    member?.linkedinUrl ||
    member?.social_linkedin ||
    member?.social?.linkedin;
  return typeof value === 'string' && /^https?:\/\//i.test(value.trim()) ? value.trim() : '';
}

export default function Board() {
  const { data, loading } = useTeamMemeberData();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations();
  const ta = useTranslations('aboutUs');
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const title = t('MEET OUR TEAM');
  const { lead, accent } = splitTitle(title);

  const members = useMemo(
    () =>
      [...(data?.data || [])].sort((a, b) => (b.order || 0) - (a.order || 0)),
    [data],
  );

  const trackRef = useRef(null);
  const pageRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, currentX: 0 });
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll('[data-team-card]');
    const count = cards.length;
    if (!count) {
      pageRef.current = 0;
      setPage(0);
      setPages(1);
      track.style.transform = 'translate3d(0,0,0)';
      return;
    }

    const visible = visibleCount();
    const maxPage = Math.max(0, count - visible);
    const nextPage = Math.min(pageRef.current, maxPage);
    pageRef.current = nextPage;
    setPage(nextPage);
    setPages(maxPage + 1);

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = cards[0].offsetWidth + gap;
    const offset = nextPage * step;
    track.style.transform = isAr ? `translate3d(${offset}px,0,0)` : `translate3d(-${offset}px,0,0)`;
  }, [isAr]);

  const goTo = useCallback(
    index => {
      pageRef.current = Math.max(0, index);
      applyTransform();
    },
    [applyTransform],
  );

  const go = useCallback(
    delta => {
      const track = trackRef.current;
      const count = track?.querySelectorAll('[data-team-card]').length || 0;
      const visible = visibleCount();
      const maxPage = Math.max(0, count - visible);
      if (maxPage === 0) return;
      let next = pageRef.current + delta;
      if (next > maxPage) next = 0;
      if (next < 0) next = maxPage;
      pageRef.current = next;
      applyTransform();
    },
    [applyTransform],
  );

  useEffect(() => {
    applyTransform();
  }, [applyTransform, members.length, loading]);

  useEffect(() => {
    const onResize = () => applyTransform();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [applyTransform]);

  const onPointerDown = event => {
    if (event.target.closest('button, a')) return;
    dragRef.current = { active: true, startX: event.clientX, currentX: event.clientX };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = event => {
    if (!dragRef.current.active) return;
    dragRef.current.currentX = event.clientX;
  };

  const onPointerUp = () => {
    if (!dragRef.current.active) return;
    const difference = dragRef.current.currentX - dragRef.current.startX;
    dragRef.current.active = false;
    if (Math.abs(difference) < 45) return;
    if ((difference < 0 && !isAr) || (difference > 0 && isAr)) go(1);
    else go(-1);
  };

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      aria-busy={loading || undefined}
      className={`relative isolate flex h-full max-h-screen w-full flex-col justify-center overflow-hidden bg-[#020b15] pb-12 pt-[calc(100px+12px)] text-white max-[900px]:pt-[calc(85px+12px)] max-[600px]:pb-10 max-[600px]:pt-[calc(76px+10px)] ${bodyFont}`}
    >
      <div className='pointer-events-none absolute inset-0 -z-[5]'>
        <Image src={BG} alt='' fill sizes='100vw' className='object-cover object-center' />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-[4] bg-[radial-gradient(circle_at_50%_35%,rgba(3,57,101,0.22),transparent_42%),radial-gradient(circle_at_5%_0%,rgba(0,95,180,0.24),transparent_25%),linear-gradient(180deg,rgba(3,17,31,0.55)_0%,rgba(2,12,23,0.62)_55%,rgba(1,9,20,0.72)_100%)]'
      />

      <div
        aria-hidden='true'
        className={`pointer-events-none absolute left-1/2 top-[-105px] -z-[4] w-full -translate-x-1/2 select-none whitespace-nowrap text-center text-[clamp(280px,31vw,530px)] font-extrabold leading-none text-[rgba(16,50,82,0.3)] [text-shadow:0_0_35px_rgba(0,72,130,0.08)] max-[600px]:top-[-10px] max-[600px]:text-[170px] ${
          isAr ? 'tracking-[-8px] max-[600px]:tracking-[-4px]' : 'tracking-[-35px] max-[600px]:tracking-[-15px]'
        }`}
      >
        {ta('teamWord')}
      </div>

      <div
        aria-hidden='true'
        className='pointer-events-none absolute -start-[410px] -top-[510px] -z-[2] h-[650px] w-[920px] -rotate-[23deg] rounded-full border border-[rgba(10,133,238,0.35)] border-b-transparent border-s-transparent shadow-[0_0_10px_rgba(0,133,255,0.2),0_0_28px_rgba(0,110,255,0.08)]'
      >
        <span className='absolute bottom-10 end-[130px] h-[3px] w-[230px] -rotate-[28deg] rounded-full bg-[#08a1ff] blur-[1px] shadow-[0_0_7px_#0799ff,0_0_20px_#087eff,0_0_55px_rgba(0,125,255,0.8)]' />
      </div>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-[500px] -end-[500px] -z-[2] h-[660px] w-[1050px] -rotate-[18deg] rounded-full border border-[rgba(10,133,238,0.35)] border-e-transparent border-t-transparent shadow-[0_0_14px_rgba(0,133,255,0.25),0_0_40px_rgba(0,110,255,0.08)]'
      >
        <span className='absolute start-20 top-[50px] h-[3px] w-[230px] -rotate-[22deg] rounded-full bg-[#08a1ff] blur-[1px] shadow-[0_0_7px_#0799ff,0_0_20px_#087eff,0_0_55px_rgba(0,125,255,0.8)]' />
      </div>

      <header className='relative z-[5] shrink-0 text-center'>
        <div className='mb-4 flex items-center justify-center gap-6 max-[600px]:mb-3.5 max-[600px]:gap-3'>
          <span className='block h-px w-[115px] bg-[linear-gradient(90deg,transparent,#078eff)] shadow-[0_0_6px_rgba(0,144,255,0.4)] max-[600px]:w-[38px]' />
          <p
            className={`m-0 whitespace-nowrap text-[14px] font-medium text-[#079eff] max-[600px]:text-[9px] ${
              isAr ? 'tracking-[4px] max-[600px]:tracking-[3px]' : 'tracking-[7px] max-[600px]:tracking-[4px]'
            }`}
          >
            {ta('peopleEyebrow')}
          </p>
          <span className='block h-px w-[115px] bg-[linear-gradient(90deg,#078eff,transparent)] shadow-[0_0_6px_rgba(0,144,255,0.4)] max-[600px]:w-[38px]' />
        </div>

        <h2 className='m-0 text-[clamp(44px,4.6vw,68px)] font-bold leading-none tracking-[-2px] text-[#f7f9fc] max-[600px]:text-[38px] max-[600px]:tracking-[-1.5px] max-[380px]:text-[34px]'>
          {lead ? `${lead} ` : ''}
          {accent ? (
            <strong className='bg-[linear-gradient(180deg,#62d8ff_0%,#079ff7_48%,#075de8_100%)] bg-clip-text font-bold text-transparent [filter:drop-shadow(0_0_12px_rgba(0,127,255,0.13))]'>
              {accent}
            </strong>
          ) : null}
        </h2>

        <p className='mx-auto mt-2.5 text-[clamp(15px,1.1vw,18px)] font-normal leading-[1.4] text-[rgba(232,239,248,0.86)] max-[600px]:px-5 max-[600px]:text-sm'>
          {ta('teamSubtitle')}
        </p>
        <div className='mx-auto mt-3.5 h-[3px] w-14 bg-[linear-gradient(90deg,#078cff,#11baff)] shadow-[0_0_8px_rgba(0,145,255,0.7)] max-[600px]:mt-3 max-[600px]:h-0.5 max-[600px]:w-[42px]' />
      </header>

      <div
        className='relative z-[5] mx-auto mt-4 w-[min(1390px,calc(100%-160px))] touch-pan-x overflow-x-hidden overflow-y-visible px-1 py-4 max-[1300px]:w-[calc(100%-150px)] max-[900px]:mt-3.5 max-[900px]:w-[calc(100%-120px)] max-[600px]:mt-3 max-[600px]:w-[calc(100%-82px)] max-[600px]:py-3 max-[380px]:w-[calc(100%-70px)]'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          className='flex w-max items-start gap-[30px] transition-transform duration-[750ms] ease-[cubic-bezier(.22,.61,.36,1)] motion-reduce:transition-none max-[600px]:gap-[15px]'
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : members.map(member => <TeamCard key={member.id ?? member.image_url} member={member} />)}
        </div>
      </div>

      {!loading && !members.length ? (
        <p className='relative z-[5] px-8 py-8 text-center text-[rgba(227,235,246,0.88)]'>{ta('teamEmpty')}</p>
      ) : null}

      {pages > 1 ? (
        <div className='relative z-10 mt-1 flex shrink-0 items-center justify-center gap-[18px] max-[600px]:gap-3'>
          {Array.from({ length: pages }).map((_, index) => (
            <button
              key={index}
              type='button'
              aria-label={`${ta('teamSlide')} ${index + 1}`}
              aria-current={index === page ? 'true' : undefined}
              onClick={() => goTo(index)}
              className={`${FOCUS} rounded-full border-0 p-0 transition duration-300 ${
                index === page
                  ? 'size-[15px] bg-[#0796ff] shadow-[0_0_8px_#078cff,0_0_16px_rgba(0,133,255,0.45)] max-[600px]:size-[13px]'
                  : 'size-[14px] bg-[#073a68] shadow-[inset_0_0_7px_rgba(0,0,0,0.35)] max-[600px]:size-[11px]'
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function TeamCard({ member }) {
  const locale = useLocale();
  const name = member.name?.[locale] || '';
  const role = member.position?.[locale] || '';
  const bio = member.bio?.[locale] || '';
  const social = linkedinUrl(member);

  return (
    <article
      data-team-card
      className="group relative flex h-fit w-[320px] min-w-[320px] flex-col overflow-hidden rounded-[18px] border border-[rgba(120,170,210,0.22)] bg-[linear-gradient(155deg,rgba(8,42,72,0.72),rgba(3,16,30,0.92))] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_28px_rgba(0,0,0,0.22)] transition duration-[350ms] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(135deg,rgba(20,167,255,0.08),transparent_30%,transparent_70%,rgba(0,100,255,0.05))] before:content-[''] hover:-translate-y-[4px] hover:border-[rgba(90,170,230,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_14px_36px_rgba(0,40,80,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-[1300px]:w-[300px] max-[1300px]:min-w-[300px] max-[900px]:w-[310px] max-[900px]:min-w-[310px] max-[600px]:w-[calc(100vw-82px)] max-[600px]:min-w-[calc(100vw-82px)] max-[600px]:rounded-[15px] max-[380px]:w-[calc(100vw-70px)] max-[380px]:min-w-[calc(100vw-70px)]"
    >
      <div className='relative aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-[rgba(210,230,255,0.28)] bg-white shadow-[0_0_12px_rgba(40,130,220,0.12)]'>
        {member.image_url ? (
          <Image
            src={baseImage(member.image_url)}
            alt={member.image_alt || name}
            fill
            sizes='320px'
            className='object-contain object-center transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none'
          />
        ) : null}
      </div>

      <div className='relative z-[2] flex flex-col gap-1.5 px-3 pb-3 pt-3.5 max-[600px]:px-2.5 max-[600px]:pb-2.5 max-[600px]:pt-3'>
        <div className='flex items-start justify-between gap-2'>
          <div className='min-w-0 flex-1'>
            <h3 className='m-0 truncate text-[20px] font-bold leading-[1.2] text-[#f7f9fc] max-[600px]:text-lg' title={name}>
              {name}
            </h3>
            {role ? (
              <div className='mt-1 text-[15px] font-medium leading-[1.2] text-[#079cf5] max-[600px]:text-sm'>{role}</div>
            ) : null}
          </div>

          {social ? (
            <a
              href={social}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
              className={`${FOCUS} flex size-9 shrink-0 items-center justify-center rounded-[9px] border border-[rgba(90,160,220,0.35)] bg-[linear-gradient(145deg,rgba(12,90,150,0.85),rgba(6,40,75,0.9))] no-underline transition duration-200 hover:border-[rgba(90,180,255,0.65)] hover:shadow-[0_0_12px_rgba(0,140,255,0.25)] max-[600px]:size-8`}
            >
              <svg viewBox='0 0 24 24' className='size-5 fill-none stroke-white stroke-2 [stroke-linecap:round] [stroke-linejoin:round]'>
                <path d='M6 8.5V18M6 5.5V5M10 18V8.5M10 12.5C10 10.3 11.4 8.5 13.6 8.5C15.8 8.5 18 9.8 18 13V18M10 12.5V18' />
              </svg>
            </a>
          ) : null}
        </div>

        {bio ? (
          <p className='m-0 line-clamp-3 text-[14px] font-normal leading-[1.45] text-[rgba(227,235,246,0.88)] max-[600px]:text-[13px]'>
            {bio}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div
      data-team-card
      className='flex h-fit w-[320px] min-w-[320px] flex-col rounded-[18px] border border-[rgba(120,170,210,0.18)] bg-[linear-gradient(155deg,rgba(8,42,72,0.5),rgba(3,16,30,0.8))] p-2.5 max-[1300px]:w-[300px] max-[1300px]:min-w-[300px] max-[900px]:w-[310px] max-[900px]:min-w-[310px] max-[600px]:w-[calc(100vw-82px)] max-[600px]:min-w-[calc(100vw-82px)] max-[380px]:w-[calc(100vw-70px)] max-[380px]:min-w-[calc(100vw-70px)]'
    >
      <div className='mb-3 aspect-[4/3] rounded-[12px] bg-white/90 skeleton-box' />
      <div className='mb-2 h-5 w-3/4 rounded skeleton-box' />
      <div className='mb-2 h-4 w-1/2 rounded skeleton-box' />
      <div className='h-3.5 w-full rounded skeleton-box' />
    </div>
  );
}
