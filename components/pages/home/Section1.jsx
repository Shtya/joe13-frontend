import Button from '@/components/atoms/Button';
import Title from '@/components/atoms/Title';
import { baseImage } from '@/helpers/baseUrl';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function Section1({ data, loading }) {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <div className='section  bg-gradient '>
            <div className='container mx-auto center min-h-screen'>
                <div className='flex items-center gap-[20px] ltr:flex-row-reverse'>
                    {loading ? (
                        <>
                            <div className='w-[60px] h-[60px]  rounded-full skeleton-box bg-white/20 ' />
                            <div className='w-[200px] h-[100px]  rounded skeleton-box bg-white/20 ' />
                            <div className='w-[60px] h-[60px]  rounded-full skeleton-box bg-white/20 ' />
                        </>
                    ) : (
                        <>
                            <Image data-aos='zoom-out' className='max-sm:w-[50px] max-sm:h-[50px]' src='/border2.png' alt='' width={60} height={60} />
                            <Image data-aos='zoom-in' className='object-contain max-sm:w-[150px] max-sm:h-[50px]' src={baseImage(data?.image?.url)} alt={data?.image?.alt} width={300} height={100} />
                            <Image data-aos='zoom-out' className='max-sm:w-[50px] max-sm:h-[50px]' src='/border2.png' alt='' width={60} height={60} />
                        </>
                    )}
                </div>

                {loading ? <div className='h-8 !w-full !max-w-[550px]  mx-auto mt-[10px] rounded skeleton-box bg-white/20' /> : <Title title={data?.title?.[locale]} cn='text24 !px-[40px] text-white text-center' />}

                {
				loading 
				? <div > <div className='h-10 w-[180px]  mx-auto mt-[10px] rounded skeleton-box bg-white/20' />  </div>
				: <Button  href='/contact-us' cn='  mt-[30px]' name={t('contact us')} />
				}

				</div>
            
        </div>
    );
}
