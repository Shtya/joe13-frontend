import { baseImage } from '@/helpers/baseUrl';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function Section({ opacity_overly = 1 , bg_cover , image_alt ,data, loading, title, description, cn, cnParent, overlay = true, image }) {
    const locale = useLocale()

    
    return (
        <div className='py-[50px] section overflow-x-hidden relative min-h-screen w-full flex flex-col gap-[30px] justify-center items-center'>
            
            <div className={`fixed w-full h-full top-0 left-0 opacity-100 transition-opacity duration-300 ease-in-out`}>
                {loading ? (
                    <div className="w-full h-full bg-gray-900 animate-pulse"></div>
                ) : (
                    <>
                        <Image
                            className={`${!overlay && "!object-contain"} ${cn} img-overlay`}
                            src={baseImage(data?.image?.url)}
                            alt={data?.image?.alt}
                            layout='fill'
                            objectFit={bg_cover ? "cover" :'contain'}
                        />
                        {overlay && <div className="bg-overlay" style={{opacity : opacity_overly}} ></div>}
                    </>
                )}
            </div>



            <div className={`container  z-10 !py-[40px] !px-[60px] flex flex-col gap-[15px] justify-center items-center ${cnParent}`}>
                {loading ? (
                    <>
                        <div className="w-[200px] h-[30px] bg-gray-300  skeleton-box rounded"></div>
                        <div className="max-w-[400px] w-full h-[20px] bg-gray-200  skeleton-box rounded"></div>
                        <div className="max-w-[400px] w-full h-[20px] bg-gray-200 mt-[-6px] skeleton-box rounded"></div>
                    </>
                ) : (
                    <>
                        <h2  className="text-[40px] max-md:text-[30px] font-[600] text-white " >{data?.title?.[locale]}</h2>
                        <p  className="text-[20px] max-md:text-[16px] text-center font-[400] opacity-70 text-balance " >{data?.content?.[locale]}</p>
                    </>
                )}
            </div>
        </div>
    );
}
