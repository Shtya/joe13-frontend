import { baseImage } from '@/helpers/baseUrl';
import { Link } from '@/navigation';
import { Headset } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero({ type , data, projects, loading, loadingProjects }) {
    const t = useTranslations();
    const locale = useLocale();


    return (
        <div className='relative flex items-center min-h-screen  max-md:!py-[80px]  max-md:min-h-fit  bg-gradient  text-white '>
            <img className=' fixed top-0 object-top  w-full h-full inset-0 object-cover   ' src={baseImage(data?.image?.url)}  />
            <div className=' fixed top-0  bg-gradient-to-br from-gray-900 to-gray-800 opacity-70  w-full h-full inset-0 object-cover   ' />
            <div className='container relative '>
                <div className='grid  grid-cols-[1fr_400px] max-lg:grid-cols-[1fr_300px] max-md:grid-cols-1  gap-8 mt-8 items-center'>
                    {loading ? (
                        <div className='w-full md:max-w-[600px]  space-y-4'>
                            <div className='h-10 skeleton-box bg-white/15 rounded w-1/2' />
                            <div className='h-6 skeleton-box bg-white/25 rounded w-full' />
                            <div className='h-6 skeleton-box bg-white/25 !mt-[3px] rounded w-full' />
                            <div className='h-6 skeleton-box bg-white/25 !mt-[3px] rounded w-full' />
                            <div className='h-10 skeleton-box bg-white/35 rounded-[20px] w-1/4   mt-6' />
                        </div>
                    ) : (
                        <div className=' px-[30px]  w-full md:max-w-[600px] '>
                            <h1 className='text-4xl font-[800]  max-md:text-center max-md:text-2xl tracking-widest  uppercase text-white  drop-shadow-xl'>{data?.title?.[locale]}</h1>
                            <h2 className=' first-line:leading-[46px] text-lg max-md:text-center max-md:text-base max-md:first-line:text-xl   first-line:capitalize first-line:text-3xl first-line:font-[700] text-white/60 first-line:text-white/80 mt-2 drop-shadow-xl 'dangerouslySetInnerHTML={{__html : data.content?.[locale] }} />
                            <Link href={`contact-us`} className=' text-white rounded-[12px] btn-blue btn-blue-3d max-md:mx-auto  w-fit text-sm !min-w-[170px] !px-[10px] capitalize  !h-[45px] mt-[30px]  '>
                                <Headset size={18} />
                                {t('Navbar.contact-us')}
                            </Link>
                        </div>
                    )}

                    {loadingProjects ? (
                        <div className='max-md:hidden w-full space-y-4 skeleton-box bg-white/5 p-4'>
                            <div className='h-6 w-1/4 bg-white/10 rounded mx-auto' />
                            <div className='space-y-3 mt-4'>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className='flex items-center gap-4 bg-white/10 p-2 '>
                                        <div className='bg-white/20 w-[70px] h-[70px] rounded-md' />
                                        <div className='flex flex-col gap-2 w-full'>
                                            <div className='h-4 w-3/4 bg-white/20 rounded' />
                                            <div className='h-3 w-full bg-white/10 rounded' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className=' max-md:hidden scroll-style-2 bg-white/10  w-full backdrop-blur-md '>
                            <h2 className='  tracking-widest  uppercase text-center  text-white text-xl font-semibold mt-4'> { type== "blog" ? t('latest-blogs') : t('our-proudcts')} </h2>
                            <div className=' p-4 flex flex-col gap-[15px]  w-full  max-h-[465px] overflow-auto '>
                                {projects?.map((e, i) => (
                                    <div key={i} className=' w-full flex items-center gap-4 bg-white/20 p-2 '>
                                        <div className=' p-[3px] bg-white/40 flex-none w-[70px] h-[70px] overflow-hidden rounded-md'>
                                        {
                                            e?.image_url
                                            ? <img onError={(e) => { e.currentTarget.src = '/not-image.jpg' }} src={  baseImage( e?.image_url)} alt={e?.image_alt} width={64} height={64} className='object-contain w-full h-full' />
                                            : <img onError={(e) => { e.currentTarget.src = '/not-image.jpg' }} src={  baseImage( e.images?.[0]?.url )} alt={e.images?.[0]?.alt} width={64} height={64} className='object-contain w-full h-full' />
                                        }

                                        </div>
                                        <div className='w-full flex flex-col  gap-[2px]  min-w-0 '>
                                            <h3 className='text-base font-bold leading-tight !truncate !overflow-hidden !whitespace-nowrap '>{type == "blog" ? e.title?.[locale] :  e.name?.[locale]}</h3>
                                            <p className='text-sm  text-gray-300 truncate whitespace-nowrap overflow-hidden text-ellipsis h-[19px] ' dangerouslySetInnerHTML={{__html : type == "blog" ? e.content?.[locale] :  e.description?.[locale] }} /> 
                                            <Link href={ type == "blog" ? `/blogs/${e.slug}` : `/projects/${e.slug}`} className='btn-blue btn-blue-3d mt-[3px]  !rounded-[12px] w-fit text-sm !min-w-[30px] !px-[10px] capitalize  !h-[35px] group   '>
                                                <Image className=' rtl:rotate-[-270deg] rotate-[0deg] group-hover:!rotate-[-90deg] duration-500 ' src='/down-right-arrow.png' alt='' width={18} height={18} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
