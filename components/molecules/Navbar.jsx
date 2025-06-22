import { Link, usePathname } from '@/navigation';
import { MenuIcon, Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import SwitchLang from '../atoms/SwitchLang';
import { useValues } from '@/app/context';

export default function Navbar({ isclick, handleClick }) {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const pathname = usePathname();
    const { projects, loading, services } = useValues();

    const ourProduct = projects?.data?.filter(e => e.department?.id == 1);

    const [addBg, setaddBg] = useState(false);
    useEffect(() => {
        if (pathname == '/' || pathname == '/about-us' || pathname == '/contact-us') {
            setaddBg(true);
        } else setaddBg(false);
    }, [pathname]);

    const links = [
        { value: '/?section=home', name: t('home') },
        { value: '/projects', name: t('our-department') },
        {
            value: '',
            name: t('our-services'),
            list: services?.data?.map(e => {
                return {
                    name: e?.title?.[locale],
                    value: `/services/${e?.slug}`,
                };
            }),
        },
        {
            value: '',
            name: ourProduct?.[0]?.department?.name?.[locale],
            list: ourProduct?.map(e => {
                return {
                    name: e?.name?.[locale],
                    value: `/projects/${e?.slug}`,
                };
            }),
        },
        { value: '/?section=partners', name: t('our-partners') },
        { value: '/blogs', name: t('blogs') },
        { value: '/join-us', name: t('join-us') },
        { value: '/about-us', name: t('about-us') },
        { value: '/contact-us', name: t('contact-us') },
    ];

    const style = { a: 'block p-[10px] cursor-pointer hover:text-white hover:bg-primary' };

    const handleClose = e => {
        if (e.value) handleClick();
    };

    const [isFooterInView, setIsFooterInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.target.id == 'footer2') {
                        setIsFooterInView(entry.isIntersecting);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when at least 10% of the footer is visible
            },
        );

        const footerElement = document.getElementById('footer2');
        if (footerElement) {
            observer.observe(footerElement);
        }

        return () => {
            if (footerElement) {
                observer.unobserve(footerElement);
            }
        };
    }, [pathname]);

    const [currentDrop, setcurrentDrop] = useState(0);
    const handleDropDown = i => {
        if (window.innerWidth <= 640) {
            if (currentDrop == i) setcurrentDrop(null);
            else setcurrentDrop(i);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                setcurrentDrop(null);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50 && (pathname === '/join-us' || pathname?.startsWith('/services') || pathname?.startsWith('/projects') || pathname?.startsWith('/blogs'))) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // run once on load

        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    return (
        <nav className={` text-white scroll-style-2 z-[100000] relative `}>
            <div className={`  second-nav ${scrolled ? '!bg-black/40 backdrop-blur-[2px] ' : ''}  ${addBg ? (isFooterInView ? 'bg-white' : 'bg-black bg-opacity-30 ') : null} ${isclick ? ' rtl:right-[251px] ltr:left-[251px] top-[0px]' : 'rtl:right-0 ltr:left-0 top-0 '}  py-[20px] fixed !duration-300 !transition-all w-full `}>
                <div className={` ${isclick ? '' : 'container'}  flex items-center justify-between gap-[10px]`}>
                    <div className='flex items-center gap-[10px]  '>
                        <div onClick={handleClick} className={`   cursor-pointer hover:bg-primary !duration-300 !transition-all flex items-center justify-center text-white w-[40px] h-[40px] `}>
                            <MenuIcon size={29} className={isFooterInView ? 'text-black' : 'text-white'} />
                        </div>
                        <SwitchLang cn={`${isFooterInView ? 'text-black' : 'text-white'}`} />
                    </div>
                    <Link href='/?section=home' className='outline-none'>
                        <Image className={` ${scrolled ? 'scale-[1.3] ltr:translate-x-[-20px] rtl:translate-x-[20px] ' : 'scale-[1]'} duration-500 w-[160px] max-md:w-[100px]`} src={`/assets/svg/${isFooterInView ? 'logo' : 'logo-white'}.svg`} width={160} height={60} alt='' />
                    </Link>
                </div>
            </div>

            <ul className={`  z-[1000] ${isclick ? 'ltr:left-0 rtl:right-0' : 'ltr:left-[-250px] rtl:right-[-250px]'} max-sm:overflow-y-auto !duration-300 !transition-all fixed top-0 w-[250px] h-screen bg-white text-black py-[50px] flex flex-col gap-[2px]`}>
                <div className=' mb-[40px] mt-[-40px] '>
                    <Image className='object-contain' src='/assets/svg/logo.svg' alt='' width={120} height={90} />
                </div>

                {links.map((link, index) => (
                    <li key={index} className=' group relative  ' onClick={() => handleDropDown(link?.list?.[0].name)}>
                        <Link onClick={() => handleClose(link)} href={link.value} className={` ${style.a} capitalize text18 flex justify-between items-center  `}>
                            {link.name}
                            {link.list && <Plus className={`${link?.list?.[0]?.name == currentDrop ? 'full-square rotate-[0deg] ' : 'half-square rotate-[135deg]'} duration-300 opacity-80 `} />}
                        </Link>

                        <ul className={`bg-white z-[10000] ${link?.list?.[0]?.name == currentDrop && 'max-sm:!block open '} max-sm:dropdown-animation  sm:group-hover:block hidden  max-sm:hidden ltr:sm:border-l-[4px] ltr:border-l-black rtl:sm:border-r-[4px] rtl:border-r-black   shadow-md top-0  sm:absolute rtl:sm:right-[250px] ltr:sm:left-[250px]  sm:w-[200px]`}>
                            {link.list &&
                                link.list.map((e, i) => (
                                    <li key={i} className='text14 hover:text-white hover:bg-primary relative hover:after:h-[60%] after:top-[50%] after:translate-y-[-50%] after:absolute after:h-0 after:w-[3px] after:bg-white ltr:after:right-[5px] rtl:after:left-[5px] after:duration-300  '>
                                        <Link onClick={() => handleClose(e)} className={style.a} href={e.value}>
                                            {e.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
