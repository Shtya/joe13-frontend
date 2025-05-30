import { useValues } from '@/app/context';
import { baseImage } from '@/helpers/baseUrl';
import { usePathname } from '@/navigation';
import { AtSign, MapPin, MapPinHouse, Phone, PhoneCall } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Footer = ({ cn, id }) => {
    const t = useTranslations('Footer');
    const locale = useLocale();
    const { projects, loading, settings , services } = useValues();

    const ourProduct = projects?.data?.filter(e => e.department?.id == 1);
    const ourTelecoms = projects?.data?.filter(e => e.department?.id == 5);
    const ourHR = projects?.data?.filter(e => e.department?.id == 6);

    const Footer = [
        {
            head: ourProduct?.[0]?.department?.name?.[locale],
            links: ourProduct?.slice(0, 5)?.map(e => {
                return {
                    name: e?.name?.[locale],
                    link: `/projects/${e?.slug}`,
                };
            }),
        },
        {
            head: t("services"),
            links: services?.data?.map(e=> {
                return {
                    name : e?.title?.[locale],
                    link : `/services/${e?.slug}`
                }
            } )
        },

    ];

    const style = {
        head: 'text-[20px] max-md:text-xl capitalize font-[600] mb-[10px] ',
        link: ' text-black/80 text-base max-md:text-sm block font-[500] leading-[22px] cursor-pointer hover:text-primary duration-200 mb-[7px] ',
    };

    const pathname = usePathname();
    const [showFooter, setShowFooter] = useState(true);

    useEffect(() => {
        // Check on route change
        if (pathname.startsWith('/services')) {
            setShowFooter(false);
        } else {
            setShowFooter(true);
        }
    }, [pathname]);


    if(!showFooter) return ;
    return   loading ? (
        // Skeleton loading
        <div className='!bg-white/20 backdrop-blur-[10px]  relative z-[1000] text-black max-md:pt-[50px] !py-[100px]'>
            <div className=' px-[20px] max-w-[1500px] w-full mx-auto grid grid-cols-5 gap-[40px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className='col  space-y-4'>
                        <div className='h-5 w-3/4 skeleton-box bg-white/10 rounded' />
                        {[...Array(3)].map((_, j) => (
                            <div key={j} className='h-4 w-full skeleton-box bg-white/10 rounded' />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <footer id={id} className={`  bg-white  z-[1000] text-black max-md:pt-[50px] py-[50px] ${cn} `}>
            <div className=' lg:pr-[70px] px-[20px] max-w-[1500px] w-full mx-auto  grid grid-cols-5 gap-[30px] max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 '>
                <div className='col '>
                    {settings?.site_logo && <Image className='mt-[-15px] max-w-[200px] w-full ' src={baseImage(settings?.site_logo?.url)} alt={settings?.site_logo?.alt} width={200} height={50} />}
                    <p className='text-black/90 text-sm max-w-[400px] w-full  mb-[10px] mt-[-5px]   '> {settings?.about_us_footer?.[locale]} </p>
                    <div className='flex items-center flex-wrap justify-center gap-[5px] max-md:gap-[5px] max-w-fit w-full '>
                        {Object.entries(settings?.social_media || {}).map(([key, value], i) => (
                            <a className=' flex items-center justify-center  btn-blue-3d w-[35px] h-[35px] max-md:w-[30px] max-md:h-[30px]  rounded-full hover:scale-[1.1]  p-[8px]  duration-300 ' href={value}>
                                <img className='object-contain' src={`/assets/social/${key}.png`} alt='social media icons' width={16} height={16} />{' '}
                            </a>
                        ))}
                    </div>
                </div>

                {Footer?.map((e, i) => (
                    <div className='col' key={i}>
                        <div className={style.head}> {e.head} </div>
                        {e.links?.map((el, il) => (
                            <Link href={el.link} key={il} className={style.link}>
                                {' '}
                                {el.name}{' '}
                            </Link>
                        ))}
                    </div>
                ))}

                <div className='col'>
                    <div className={style.head}> {t('contact_us')} </div>
                    <div className='flex items-center gap-[5px] mb-[2px]'>
                        <div className=' flex-none btn-blue-3d w-[35px] h-[35px] !rounded-full flex  items-center justify-center  '>
                            {' '}
                            <MapPinHouse className='' size={16} />{' '}
                        </div>
                        <div className={`${style.link} !mb-0 hover:!text-black !cursor-context-menu `}> {settings?.contact_us?.address?.[locale]} </div>
                    </div>
                    <hr className='my-[10px] !max-w-[300px] !w-full ' />

                    <div className='flex items-center gap-[5px] mb-[2px]'>
                        <div className='flex-none btn-blue-3d w-[35px] h-[35px] !rounded-full flex  items-center justify-center  '>
                            {' '}
                            <AtSign className='' size={16} />{' '}
                        </div>
                        <a href={`mailto:${settings?.contact_us?.email}`} className={`${style.link} !mb-0 cursor-pointer underline hover:!text-black `}>
                            {' '}
                            {settings?.contact_us?.email}{' '}
                        </a>
                    </div>

                    <hr className='my-[10px] ' />
                    <div className='flex items-center gap-[5px] mb-[2px]'>
                        <div className='flex-none btn-blue-3d w-[35px] h-[35px] !rounded-full flex  items-center justify-center  '>
                            {' '}
                            <PhoneCall className='' size={16} />{' '}
                        </div>
                        <a href={`https://wa.me/${settings?.contact_us?.phone}`} target='_blank' rel='noopener noreferrer' style={{ direction: 'ltr' }} className={`${style.link} !mb-0 cursor-pointer underline hover:!text-black  rtl:text-right `}>
                            {' '}
                            {settings?.contact_us?.phone}{' '}
                        </a>
                    </div>
                </div>

                <div className='col'>
                    <div className={style.head}> {t('branch_office')} </div>
                    {settings?.branch?.[locale]?.map((e, i) => (
                        <div className='flex items-center gap-[5px] mb-[4px] '>
                            <div className='btn-blue-3d w-[35px] h-[35px] !rounded-full flex  items-center justify-center  '>
                                {' '}
                                <MapPin className='' size={16} />{' '}
                            </div>
                            <div key={i} className={`${style.link} !mb-0 hover:!text-black !cursor-context-menu `}>
                                {' '}
                                {e}{' '}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className=' max-w-[400px] w-full  h-[1px] bg-gray-100  mx-auto mt-[20px] ' />
            <p className='mt-[20px] text-sm  mb-[-30px] text-black/80 text-center  '> {settings?.copyright?.[locale]} </p>
        </footer>
    );
};

export default Footer;
