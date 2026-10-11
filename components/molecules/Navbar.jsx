'use client';

import { Link, usePathname } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import CmsFillImage from '@/components/atoms/CmsFillImage';
import { useEffect, useId, useState } from 'react';
import SwitchLang from '../atoms/SwitchLang';
import { useValues } from '@/app/context';
import SocialIcon from '@/components/jx/SocialIcon';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

export default function Navbar({ isclick, handleClick }) {
  const t = useTranslations('Navbar');
  const tFooter = useTranslations('Footer');
  const tj = useTranslations('Jx');
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
          list: [{ name: tj('allServices'), value: '/services' }, ...serviceLinks],
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
              <CmsFillImage
                className='object-contain'
                url='/assets/svg/logo-white.svg'
                fallback='/assets/svg/logo-white.svg'
                alt={settings?.site_logo?.alt || 'Joe13'}
                priority
                sizes='(max-width: 768px) 100px, 160px'
              />
            </div>
          </Link>
        </div>
      </div>

      <aside
        id='joe13-mobile-menu'
        aria-labelledby={menuTitleId}
        className={`jx fixed inset-y-0 start-0 z-[100050] flex h-[100dvh] w-[320px] flex-col overflow-y-auto overflow-x-hidden bg-[var(--jx-ink)] text-[var(--jx-text)] shadow-[inset_-1px_0_0_var(--jx-line-strong),24px_0_60px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [scrollbar-width:none] motion-reduce:transition-none max-[360px]:w-[280px] rtl:shadow-[inset_1px_0_0_var(--jx-line-strong),-24px_0_60px_rgba(0,0,0,0.6)] ${
          isclick ? 'translate-x-0' : 'pointer-events-none -translate-x-full rtl:translate-x-full'
        }`}
      >
        <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(90%_40%_at_0%_100%,rgba(199,203,209,0.09),transparent_70%)] rtl:bg-[radial-gradient(90%_40%_at_100%_100%,rgba(199,203,209,0.09),transparent_70%)]' />

        <div className='flex shrink-0 items-end justify-between border-b border-[var(--jx-line)] px-6 pb-5 pt-7'>
          <Link href='/?section=home' onClick={closeMenu} id={menuTitleId} aria-label='JOE13' className={`relative block h-9 w-[132px] ${focusRing}`}>
            <CmsFillImage className='object-contain object-left rtl:object-right' url='/assets/svg/logo-white.svg' fallback='/assets/svg/logo-white.svg' alt='JOE13' sizes='132px' />
          </Link>
          <span className='pb-0.5 text-[12px] text-[var(--jx-steel)]'>{tFooter('tomorrowMade')}</span>
        </div>

        <nav className='shrink-0 px-3 py-4'>
          <ul className='m-0 grid list-none gap-0.5 p-0'>
            {links.map((link, index) => {
              const active = isLinkActive(link);
              const expanded = openSubmenu === link.id;
              const enter = { transitionDelay: isclick ? `${120 + index * 35}ms` : '0ms' };
              const rowClass = `group relative flex h-12 w-full items-center gap-3.5 rounded-[12px] px-3.5 text-start transition-[background,color,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--jx-graphite)] ${focusRing} ${
                active ? 'bg-[var(--jx-graphite)] text-white' : 'text-[var(--jx-text-2)] hover:text-white'
              } ${isclick ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0 rtl:translate-x-3'}`;

              const inner = (
                <>
                  {active ? <span aria-hidden='true' className='absolute inset-y-3 start-0 w-[2px] rounded-full bg-white shadow-[var(--jx-glint-glow)]' /> : null}
                  <span className={`grid size-6 shrink-0 place-items-center transition-colors ${active ? 'text-white' : 'text-[var(--jx-steel)] group-hover:text-[var(--jx-silver)]'}`}>
                    <NavIcon id={link.id} active={false} />
                  </span>
                  <span className={`min-w-0 flex-1 truncate text-[15px] leading-none ${active ? 'font-[700]' : 'font-[400]'}`}>{link.name}</span>
                  {link.list ? (
                    <svg
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                      className={`size-4 shrink-0 fill-none stroke-current stroke-[1.6] text-[var(--jx-steel)] transition-transform duration-300 [stroke-linecap:round] [stroke-linejoin:round] ${expanded ? 'rotate-180' : ''}`}
                    >
                      <path d='m6 9 6 6 6-6' />
                    </svg>
                  ) : null}
                </>
              );

              return (
                <li key={link.id}>
                  {link.list ? (
                    <button type='button' style={enter} className={rowClass} aria-expanded={expanded} onClick={() => setOpenSubmenu(expanded ? null : link.id)}>
                      {inner}
                    </button>
                  ) : (
                    <Link href={link.value} style={enter} className={rowClass} onClick={closeMenu} aria-current={active ? 'page' : undefined}>
                      {inner}
                    </Link>
                  )}

                  {link.list ? (
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <ul className='m-0 list-none overflow-hidden p-0'>
                        <li aria-hidden='true' className='h-1' />
                        {link.list.map(item => {
                          const childActive = pathname === item.value || (item.value !== '/services' && pathname.startsWith(`${item.value}/`));
                          return (
                            <li key={item.value}>
                              <Link
                                href={item.value}
                                onClick={closeMenu}
                                tabIndex={expanded ? undefined : -1}
                                aria-current={childActive ? 'page' : undefined}
                                className={`group/sub relative flex min-h-10 items-center rounded-[10px] py-2 pe-3 ps-[50px] text-[14px] leading-[1.4] transition-colors hover:bg-[var(--jx-graphite)] hover:text-white ${focusRing} ${
                                  childActive ? 'font-[700] text-white' : 'text-[var(--jx-text-3)]'
                                }`}
                              >
                                <i
                                  aria-hidden='true'
                                  className={`absolute start-[26px] top-1/2 block h-px -translate-y-1/2 transition-[width,background] duration-300 ${
                                    childActive ? 'w-4 bg-white' : 'w-2.5 bg-[var(--jx-gunmetal)] group-hover/sub:w-4 group-hover/sub:bg-white'
                                  }`}
                                />
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                        <li aria-hidden='true' className='h-2' />
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className='mt-auto shrink-0 px-4 pb-6'>
          <Link
            href='/contact-us'
            onClick={closeMenu}
            className={`group relative flex items-center gap-4 overflow-hidden rounded-[18px] bg-[image:var(--jx-brushed)] p-5 text-[var(--jx-ink)] shadow-[var(--jx-shadow-metal)] transition-transform duration-300 hover:-translate-y-0.5 ${focusRing}`}
          >
            <span className='flex min-w-0 flex-1 flex-col'>
              <small className='text-[12px] font-[700] text-[#3a3e44]'>{tFooter('letsTalk')}</small>
              <strong className='mt-1 text-[16px] font-[700] leading-[1.35]'>{t('haveProject')}</strong>
              <span className='mt-1.5 text-[12.5px] leading-[1.5] text-[#3a3e44]'>{t('talkHelp')}</span>
            </span>
            <span className='grid size-10 shrink-0 place-items-center rounded-full bg-[var(--jx-ink)] text-white transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1'>
              <svg viewBox='0 0 24 24' aria-hidden='true' className='size-4 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] rtl:-scale-x-100'>
                <path d='M5 12h14' />
                <path d='m13 6 6 6-6 6' />
              </svg>
            </span>
          </Link>

          {socials.length > 0 ? (
            <ul className='m-0 mt-5 flex list-none flex-wrap justify-center gap-2.5 p-0'>
              {socials.map(([key, value]) => (
                <li key={key}>
                  <a
                    href={value}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={key}
                    className={`grid size-10 place-items-center rounded-full text-[var(--jx-silver)] shadow-[inset_0_0_0_1px_var(--jx-line-strong)] transition-[color,background,box-shadow] duration-300 hover:bg-[image:var(--jx-brushed)] hover:text-[var(--jx-ink)] hover:shadow-[var(--jx-shadow-metal)] ${focusRing}`}
                  >
                    <SocialIcon name={key} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <p className='m-0 mt-5 flex items-center justify-center gap-3 text-[12px] text-[var(--jx-steel)]'>
            <span>{tFooter('connect')}</span>
            <i aria-hidden='true' className='block h-px w-4 bg-[var(--jx-gunmetal)]' />
            <span>{tFooter('create')}</span>
            <i aria-hidden='true' className='block h-px w-4 bg-[var(--jx-gunmetal)]' />
            <span>{tFooter('grow')}</span>
          </p>
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
