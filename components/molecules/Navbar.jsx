'use client';

import { Link, usePathname } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import SwitchLang from '../atoms/SwitchLang';
import { useValues } from '@/app/context';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

export default function Navbar({ isclick, handleClick }) {
  const t = useTranslations('Navbar');
  const tFooter = useTranslations('Footer');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const bodyFont = isAr ? 'font-cairo' : 'font-inter';
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { projects, services, settings } = useValues();
  const menuTitleId = useId();

  const ourProduct = projects?.data?.filter(e => e.department?.id == 1);
  const serviceLinks = (services?.data || [])
    .filter(e => e?.slug && (e?.title?.[locale] || e?.title?.en))
    .map(e => ({
      name: e?.title?.[locale],
      value: `/services/${e.slug}`,
    }));
  const productLinks = (ourProduct || [])
    .filter(e => e?.slug && (e?.name?.[locale] || e?.name?.en))
    .map(e => ({
      name: e?.name?.[locale],
      value: `/projects/${e.slug}`,
    }));
  const socials = Object.entries(settings?.social_media || {}).filter(([, value]) => value);

  const links = [
    { id: 'home', value: '/?section=home', name: t('home') },
    { id: 'departments', value: '/projects', name: t('our-department') },
    serviceLinks.length
      ? {
          id: 'services',
          value: '/projects',
          name: t('our-services'),
          list: serviceLinks,
        }
      : null,
    productLinks.length
      ? {
          id: 'products',
          value: '/projects',
          name: ourProduct?.[0]?.department?.name?.[locale] || t('our-products'),
          list: productLinks,
        }
      : null,
    { id: 'partners', value: '/?section=partners', name: t('our-partners') },
    { id: 'blogs', value: '/blogs', name: t('blogs') },
    { id: 'join', value: '/join-us', name: t('join-us') },
    { id: 'about', value: '/about-us', name: t('about-us') },
    { id: 'contact', value: '/contact-us', name: t('contact-us') },
  ].filter(Boolean);

  const [addBg, setaddBg] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    // Listing pages stay transparent at top; bg only after scroll (see scrolled).
    setaddBg(
      pathname?.startsWith('/blogs/') ||
        (pathname?.startsWith('/projects/') && pathname !== '/projects')
    );
  }, [pathname]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (
          window.scrollY > 50 &&
          (pathname?.startsWith('/services') ||
            pathname?.startsWith('/projects') ||
            pathname?.startsWith('/blogs'))
        ) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (!isclick) {
      setOpenSubmenu(null);
      return;
    }

    const onKeyDown = event => {
      if (event.key === 'Escape') handleClick();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isclick]);

  const section = searchParams.get('section');

  const isLinkActive = link => {
    if (link.id === 'home') return pathname === '/' && section !== 'partners';
    if (link.id === 'partners') return pathname === '/' && section === 'partners';
    if (link.id === 'departments') return pathname === '/projects';
    if (link.list) return link.list.some(item => pathname === item.value || pathname.startsWith(`${item.value}/`));
    return pathname === link.value || pathname.startsWith(`${link.value}/`);
  };

  const closeMenu = () => {
    if (isclick) handleClick();
  };

  return (
    <nav className={`relative z-[100000] text-white scroll-style-2 ${bodyFont}`}>
      <div
        className={`second-nav fixed top-0 flex h-[76px] w-full items-center duration-300 md:h-[85px] lg:h-[100px] ${
          isclick
            ? 'ltr:left-[320px] rtl:right-[320px] max-[360px]:ltr:left-[280px] max-[360px]:rtl:right-[280px]'
            : 'ltr:left-0 rtl:right-0'
        } ${scrolled ? '!bg-black/40 backdrop-blur-[2px]' : ''} ${addBg ? 'bg-black/30' : 'bg-transparent'}`}
      >
        <div className='flex w-full items-center justify-between px-5 md:px-[30px] lg:px-[clamp(28px,3vw,52px)]'>
          <div className='flex items-center'>
            <button
              type='button'
              onClick={handleClick}
              aria-expanded={isclick}
              aria-controls='joe13-mobile-menu'
              data-menu-open
              aria-label={isAr ? 'القائمة' : 'Menu'}
              className={`group flex h-11 w-11 cursor-pointer items-center justify-center bg-transparent ${focusRing}`}
            >
              <span className='flex h-[27px] w-[27px] flex-col justify-between py-[3px] max-md:h-6 max-md:w-[25px]'>
                <span
                  className={`block h-[2px] rounded-[10px] bg-white/95 transition duration-[250ms] ease-out max-md:w-[23px] ${
                    isclick ? 'w-[25px] translate-y-[7.5px] rotate-45' : 'w-[25px]'
                  }`}
                />
                <span
                  className={`block h-[2px] rounded-[10px] bg-white/95 transition duration-[250ms] ease-out max-md:w-[23px] ${
                    isclick ? 'w-[25px] opacity-0' : 'w-[25px] group-hover:w-[18px]'
                  }`}
                />
                <span
                  className={`block h-[2px] rounded-[10px] bg-white/95 transition duration-[250ms] ease-out max-md:w-[23px] ${
                    isclick ? 'w-[25px] -translate-y-[7.5px] -rotate-45' : 'w-[25px]'
                  }`}
                />
              </span>
            </button>
            <div className='ms-[25px] md:ms-[35px] lg:ms-[45px]'>
              <SwitchLang cn='text-white/90' />
            </div>
          </div>
          <Link
            href='/?section=home'
            className={`outline-none ${focusRing}`}
            aria-label='Joe13'
          >
            <div
              className={`relative h-[60px] w-[160px] duration-500 max-md:h-[38px] max-md:w-[100px] ${
                scrolled ? 'scale-[1.3] ltr:-translate-x-5 rtl:translate-x-5' : 'scale-100'
              }`}
            >
              <Image
                className='object-contain'
                src='/assets/svg/logo-white.svg'
                alt='Joe13'
                fill
                sizes='(max-width: 768px) 100px, 160px'
              />
            </div>
          </Link>
        </div>
      </div>

      <aside
        id='joe13-mobile-menu'
        aria-labelledby={menuTitleId}
        className={`fixed inset-y-0 start-0 z-[100050] flex h-screen w-[320px] flex-col overflow-visible border-e border-[rgba(16,130,203,0.82)] bg-[linear-gradient(180deg,#031a2d_0%,#02182b_44%,#031d34_100%)] py-3 font-inter text-white shadow-[12px_0_45px_rgba(0,0,0,0.48),inset_-1px_0_rgba(41,162,229,0.1)] transition-[transform] duration-300 before:pointer-events-none before:absolute before:-start-[110px] before:-bottom-[70px] before:-z-[1] before:h-[310px] before:w-[410px] before:-rotate-[12deg] before:rounded-full before:bg-[radial-gradient(ellipse_at_center,rgba(7,92,162,0.34)_0%,rgba(2,42,76,0.19)_44%,transparent_72%)] after:pointer-events-none after:absolute after:-start-[120px] after:-bottom-3 after:-z-[1] after:h-px after:w-[440px] after:-rotate-[30deg] after:bg-[linear-gradient(90deg,transparent,rgba(19,153,229,0.75),rgba(19,153,229,0.05))] after:shadow-[0_0_8px_rgba(0,148,239,0.38)] motion-reduce:transition-none max-[360px]:w-[280px] rtl:shadow-[-12px_0_45px_rgba(0,0,0,0.48),inset_1px_0_rgba(41,162,229,0.1)] ${
          isclick ? 'translate-x-0' : 'pointer-events-none -translate-x-full rtl:translate-x-full'
        }`}
      >
          <div className='relative flex h-[70px] shrink-0 items-center px-5'>
            <Link
              href='/?section=home'
              onClick={closeMenu}
              id={menuTitleId}
              className={`relative block w-[114px] text-[#f5f9fd] no-underline ${focusRing}`}
            >
              <span className='inline-block font-sans text-[29px] font-bold leading-[0.82] tracking-[-2.8px]'>JOE</span>
              <b className='ms-px inline-block font-sans text-[29px] font-bold leading-[0.82] tracking-[-2.8px] text-[#099ee9]'>
                13
              </b>
              <small className='mt-[5px] block whitespace-nowrap font-sans text-[4.2px] font-medium leading-none tracking-[1.25px] text-[rgba(239,247,252,0.83)]'>
                {tFooter('tomorrowMade')}
              </small>
            </Link>
          </div>

          <nav className='relative w-full shrink-0 border-t border-[rgba(22,109,163,0.1)]'>
            {links.map(link => {
              const active = isLinkActive(link);
              const expanded = openSubmenu === link.id;
              const itemClass = `relative flex h-9 w-full items-center border-0 border-b border-[rgba(20,104,158,0.22)] bg-transparent px-5 text-start text-[rgba(237,244,249,0.92)] no-underline transition duration-[220ms] hover:bg-[rgba(7,75,119,0.42)] hover:text-white motion-reduce:transition-none ${focusRing} ${
                active
                  ? 'border border-[rgba(11,151,232,0.76)] bg-[linear-gradient(100deg,rgba(8,99,164,0.72),rgba(5,52,87,0.7))] shadow-[inset_0_1px_1px_rgba(125,210,255,0.09),0_0_12px_rgba(0,128,217,0.1)]'
                  : ''
              }`;

              const inner = (
                <>
                  <span
                    className={`flex size-[26px] shrink-0 items-center justify-center ${
                      active ? 'text-[#50b8f4] [filter:drop-shadow(0_0_5px_rgba(0,150,240,0.42))]' : 'text-[#8fcdf2]'
                    }`}
                  >
                    <NavIcon id={link.id} active={active} />
                  </span>
                  <span className={`${bodyFont} ms-[13px] min-w-0 flex-1 whitespace-nowrap text-[13px] font-normal leading-none`}>
                    {link.name}
                  </span>
                  {link.list ? (
                    <svg
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                      className='ms-auto size-3.5 shrink-0 fill-none stroke-[#79bce7] stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180'
                    >
                      <path d='m9 5 7 7-7 7' />
                    </svg>
                  ) : null}
                </>
              );

              return (
                <div key={link.id} className='group relative'>
                  {link.list ? (
                    <button
                      type='button'
                      className={itemClass}
                      aria-expanded={expanded}
                      onClick={() => setOpenSubmenu(expanded ? null : link.id)}
                    >
                      {inner}
                    </button>
                  ) : (
                    <Link href={link.value} className={itemClass} onClick={closeMenu} aria-current={active ? 'page' : undefined}>
                      {inner}
                    </Link>
                  )}

                  {link.list ? (
                    <div
                      className={`absolute start-full top-0 z-[10001] hidden ps-4 group-hover:block ${
                        expanded ? '!block' : ''
                      }`}
                    >
                      <ul className='m-0 min-w-[220px] list-none overflow-hidden rounded-[12px] border border-[rgba(16,130,203,0.75)] bg-[linear-gradient(180deg,#031a2d_0%,#02182b_100%)] p-0 shadow-[8px_10px_28px_rgba(0,0,0,0.35)] rtl:shadow-[-8px_10px_28px_rgba(0,0,0,0.35)]'>
                      {link.list.map(item => {
                        const childActive = pathname === item.value || pathname.startsWith(`${item.value}/`);
                        return (
                          <li key={item.value}>
                            <Link
                              href={item.value}
                              onClick={closeMenu}
                              aria-current={childActive ? 'page' : undefined}
                              className={`${bodyFont} ${focusRing} flex min-h-10 items-center border-b border-[rgba(20,104,158,0.22)] px-4 text-[13px] leading-[1.3] text-[rgba(220,236,247,0.9)] transition-colors duration-200 last:border-b-0 hover:bg-[rgba(7,75,119,0.45)] hover:text-white ${
                                childActive ? 'bg-[rgba(8,99,164,0.45)] text-[#19a9f1]' : ''
                              }`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                      </ul>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <Link
            href='/contact-us'
            onClick={closeMenu}
            className={`relative mx-5 mt-4 flex h-[90px] shrink-0 items-center rounded-[11px] border border-[rgba(9,143,222,0.74)] bg-[linear-gradient(140deg,rgba(5,74,122,0.8),rgba(3,38,67,0.77))] px-[11px] py-3 text-white no-underline shadow-[inset_0_1px_2px_rgba(159,224,255,0.08),0_0_16px_rgba(0,108,193,0.1)] transition duration-[250ms] hover:-translate-y-0.5 hover:border-[rgba(18,173,241,0.95)] hover:shadow-[0_0_20px_rgba(0,136,226,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
          >
            <span className='flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-[linear-gradient(145deg,#0c9de8,#075fae)] shadow-[0_0_12px_rgba(0,154,241,0.25)]'>
              <svg
                viewBox='0 0 24 24'
                aria-hidden='true'
                className='size-[23px] fill-none stroke-[#dff5ff] stroke-[1.55] [stroke-linecap:round] [stroke-linejoin:round] [filter:drop-shadow(0_0_4px_rgba(255,255,255,0.35))]'
              >
                <path d='M8 18a7 7 0 1 1 8 0' />
                <path d='M9 18v-4a3 3 0 0 1 6 0v4' />
                <path d='M7 17h2v3H7zM15 17h2v3h-2z' />
              </svg>
            </span>
            <span className={`${bodyFont} ms-2.5 flex min-w-0 flex-col`}>
              <small className='text-[6px] font-medium leading-none tracking-[1.2px] text-[#0ba5ee]'>{tFooter('letsTalk')}</small>
              <strong className='mt-1 text-[11px] font-semibold leading-[1.15] text-[#f5f9fc]'>{t('haveProject')}</strong>
              <em className='mt-[7px] text-[7.5px] not-italic leading-[1.35] text-[rgba(208,229,243,0.75)]'>{t('talkHelp')}</em>
            </span>
            <span className='ms-auto flex size-7 shrink-0 items-center justify-center rounded-full border border-[rgba(17,161,236,0.74)] bg-[rgba(6,69,111,0.56)]'>
              <svg
                viewBox='0 0 24 24'
                aria-hidden='true'
                className='size-4 fill-none stroke-[#e8f7ff] stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180'
              >
                <path d='M4 12h15' />
                <path d='m13 5 7 7-7 7' />
              </svg>
            </span>
          </Link>

          {socials.length > 0 ? (
            <div className='mx-5 mt-4 grid w-[calc(100%-40px)] grid-flow-col auto-cols-fr gap-2'>
              {socials.map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={key}
                  className={`flex aspect-square w-full items-center justify-center rounded-[7px] border border-[rgba(11,120,188,0.46)] bg-[linear-gradient(145deg,rgba(9,76,124,0.84),rgba(3,40,68,0.86))] text-[#f3f8fc] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] no-underline transition duration-200 hover:-translate-y-0.5 hover:border-[rgba(13,169,241,0.9)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
                >
                  <SocialIcon name={key} />
                </a>
              ))}
            </div>
          ) : null}

          <div className='mx-5 mt-3 flex items-center gap-2 text-[#078ed8]'>
            <span className='me-[5px] block h-px w-5 bg-[linear-gradient(90deg,rgba(19,166,239,0.8),rgba(19,166,239,0.25))] rtl:bg-[linear-gradient(90deg,rgba(19,166,239,0.25),rgba(19,166,239,0.8))]' />
            <small className='text-[5.5px] font-medium leading-none tracking-[1.25px] text-[#078fd9]'>{tFooter('connect')}</small>
            <b className='text-[5px] font-semibold text-[#079de8]'>•</b>
            <small className='text-[5.5px] font-medium leading-none tracking-[1.25px] text-[#078fd9]'>{tFooter('create')}</small>
            <b className='text-[5px] font-semibold text-[#079de8]'>•</b>
            <small className='text-[5.5px] font-medium leading-none tracking-[1.25px] text-[#078fd9]'>{tFooter('grow')}</small>
          </div>
      </aside>
    </nav>
  );
}

function iconClass(active) {
  return active
    ? 'size-[18px] fill-current stroke-none'
    : 'size-[19px] fill-none stroke-current stroke-[1.55] [stroke-linecap:round] [stroke-linejoin:round]';
}

function NavIcon({ id, active }) {
  const cls = iconClass(active && id === 'home');

  if (id === 'home') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={cls}>
        <path d='m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z' />
      </svg>
    );
  }

  const stroke = 'size-[19px] fill-none stroke-current stroke-[1.55] [stroke-linecap:round] [stroke-linejoin:round]';

  if (id === 'departments') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
        <circle cx='9' cy='7' r='3' />
        <circle cx='17' cy='8' r='2.5' />
        <path d='M3 19c0-3.2 2.4-5 6-5s6 1.8 6 5' />
        <path d='M14 14c3.2-.1 5.8 1.4 6 4.8' />
      </svg>
    );
  }

  if (id === 'services') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
        <path d='m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z' />
        <path d='m4 7.5 8 4.5 8-4.5' />
        <path d='M12 12v9' />
      </svg>
    );
  }

  if (id === 'products') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
        <path d='M4 8h10v9H8l-4 3V8Z' />
        <path d='M14 10h4l2 2v5l-3 2h-3' />
        <path d='M7 12h4' />
      </svg>
    );
  }

  if (id === 'partners') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
        <path d='M8.5 12.5 5 16l-2-2 4-4' />
        <path d='m15.5 12.5 3.5 3.5 2-2-4-4' />
        <path d='m8 10 2-2 4 4-2 2' />
        <path d='m16 10-2-2-4 4 2 2' />
      </svg>
    );
  }

  if (id === 'blogs') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
        <rect x='5' y='3' width='14' height='18' rx='1' />
        <path d='M9 8h6M9 12h6M9 16h4' />
      </svg>
    );
  }

  if (id === 'join') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
        <rect x='4' y='7' width='16' height='14' rx='2' />
        <path d='M8 7V5h8v2M4 12h16M10 12v3h4v-3' />
      </svg>
    );
  }

  if (id === 'about') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
        <circle cx='12' cy='12' r='9' />
        <path d='M12 10v6' />
        <circle cx='12' cy='7' r='.8' fill='currentColor' stroke='none' />
      </svg>
    );
  }

  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
      <rect x='3' y='5' width='18' height='14' rx='2' />
      <path d='m4 7 8 6 8-6' />
    </svg>
  );
}

function SocialIcon({ name }) {
  const key = String(name || '').toLowerCase();
  const fill = 'size-[52%] fill-current';
  const stroke = 'size-[52%] fill-none stroke-current stroke-[1.7]';

  if (key.includes('tiktok')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M14.2 3c.5 2.6 2 4.2 4.8 4.5v3.1c-1.7-.1-3.3-.6-4.7-1.6v6.5c0 3.5-2.5 5.7-5.7 5.7C5.4 21.2 3 19 3 15.9c0-3 2.3-5.4 5.5-5.7v3.2c-1.3.2-2.2 1.1-2.2 2.4 0 1.4 1 2.3 2.4 2.3 1.5 0 2.4-1 2.4-2.5V3h3.1Z' />
      </svg>
    );
  }

  if (key.includes('twitter') || key === 'x') {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M5 4h3.9l4.1 5.4L17.5 4H20l-5.9 7 5.9 9h-3.9l-4.4-5.9L6.5 20H4l6.2-7.5L5 4Z' />
      </svg>
    );
  }

  if (key.includes('facebook')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z' />
      </svg>
    );
  }

  if (key.includes('linkedin')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M5 8H2v13h3V8Zm.2-4.1C5.2 2.8 4.4 2 3.5 2S1.8 2.8 1.8 3.9s.8 1.9 1.7 1.9 1.7-.8 1.7-1.9ZM22 13.5c0-3.9-2.1-5.7-4.9-5.7-2.3 0-3.3 1.3-3.9 2.2V8H10v13h3.2v-7.2c0-1.9.4-3.7 2.7-3.7 2.2 0 2.2 2 2.2 3.8V21H21v-7.5h1Z' />
      </svg>
    );
  }

  if (key.includes('snap')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M12 2.5c-3.4 0-5.7 2.5-5.7 6v2.3c0 .8-.4 1.2-1.3 1.5l-1.2.4c-.5.2-.6.8-.2 1.1.7.6 1.7 1 2.5 1.2.4.1.6.4.5.8-.2.7.2 1.2.9 1.2.5 0 1-.1 1.4-.3.5-.2.9-.1 1.3.3.5.6 1.2 1.1 2 1.3.5.1.9.2 1.3.2.4 0 .8-.1 1.3-.2.8-.2 1.5-.7 2-1.3.4-.4.8-.5 1.3-.3.4.2.9.3 1.4.3.7 0 1.1-.5.9-1.2-.1-.4.1-.7.5-.8.8-.2 1.8-.6 2.5-1.2.4-.3.3-.9-.2-1.1l-1.2-.4c-.9-.3-1.3-.7-1.3-1.5V8.5c0-3.5-2.3-6-5.7-6Z' />
      </svg>
    );
  }

  if (key.includes('instagram')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
        <rect x='3' y='3' width='18' height='18' rx='5' />
        <circle cx='12' cy='12' r='4' />
        <circle cx='17.4' cy='6.7' r='1' />
      </svg>
    );
  }

  if (key.includes('youtube')) {
    return (
      <svg viewBox='0 0 24 24' aria-hidden='true' className={fill}>
        <path d='M22 8.2a3 3 0 0 0-2.1-2.1C18.2 5.6 12 5.6 12 5.6s-6.2 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.5 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.7.5 7.9.5 7.9.5s6.2 0 7.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22.5 12 31 31 0 0 0 22 8.2ZM10 15.5v-7l6 3.5-6 3.5Z' />
      </svg>
    );
  }

  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className={stroke}>
      <circle cx='12' cy='12' r='8' />
      <path d='M8 12h8M12 8v8' />
    </svg>
  );
}
