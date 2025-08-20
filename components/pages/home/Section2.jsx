'use client';

import Button from '@/components/atoms/Button';
import Title from '@/components/atoms/Title';
import { baseImage } from '@/helpers/baseUrl';
import EffectFixed from '@/helpers/EffectFixed';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function Section2({ data, loading }) {
    const t = useTranslations();
    const locale = useLocale();

    const downloadPDF = () => {
        const pdfURL = `/joe-pdf-en2.pdf`;
        const link = document.createElement('a');
        link.href = pdfURL;
        link.download = 'JOE13 Profile'; // File name for the downloaded file
        link.click();
    };
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    if (loading)
        return (
            <div className=" flex flex-col justify-center items-center h-screen "  z={'z-[-100]'}>
                {/* Skeleton Title */}
                <div className='flex justify-center'>
                    <div className='h-8 w-[200px] bg-white/40 rounded-[10px] skeleton-box mt-[10px]' />
                </div>

                {/* Skeleton Items */}
                <div className='flex h-fit justify-center items-center flex-wrap gap-[30px] mt-[30px]'>
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className='group relative flex justify-center items-center w-[180px] h-full'>
                            <div className='relative z-10 w-full min-h-[120px] rounded-[20px] bg-black/10 border border-transparent overflow-hidden'>
                                <div className='absolute top-0 left-0 w-full h-full bg-black/40 pointer-events-none [transform:skew(120deg)] z-0' />

                                <h2 className='w-full backdrop-blur-[1px] rounded-[20px] border-white/60 border-t border-l text-center min-h-[120px] flex items-center flex-col justify-center z-10 text-[#333] bg-white/20 p-[20px] font-normal relative'>
                                    <span className='h-8 w-16 bg-white/50 skeleton-box rounded mb-2'></span>
                                    <span className='h-4 w-24 bg-white/30 skeleton-box rounded'></span>
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );

    return (
        <EffectFixed image={ baseImage(data?.image?.url) } alt={data?.image?.alt} z={'z-[-100]'}>
            <Title title={data?.title?.[locale]} cn={' text-[30px] max-xl:text24 text-white text-center  '} />

            <div ref={ref} className='flex justify-center items-center flex-wrap gap-[30px]  mt-[30px]'>
                {data?.objectData &&
                    Object.entries(data?.objectData?.[locale]).map(([name, rawValue], i) => (
                        <div key={i} className='group relative flex justify-center items-center w-[180px] h-full '>
                            <div className='relative z-10 w-full min-h-[120px] rounded-[20px] bg-black/10 border border-transparent overflow-hidden transition-all duration-500 ease-in-out  group-hover:scale-[1.05] '>
                                <div className='absolute opacity-40 inset-0 z-0 pointer-events-none before:absolute before:inset-[-5px] before:rounded-[20px] before:bg-gradient-to-r before:from-primary before:via-white before:to-transparent before:bg-[length:200%_4px] before:bg-no-repeat before:animate-border-shine after:absolute after:inset-[-5px] after:rounded-[20px] after:bg-gradient-to-r after:from-primary after:via-white after:to-transparent after:bg-[length:200%_4px] after:bg-no-repeat after:rotate-90 after:animate-border-shine' />

                                <div className='absolute top-0 left-0 w-full h-full bg-black/40 pointer-events-none [transform:skew(120deg)] z-0' />

                                <h2 className='w-full backdrop-blur-[1px] rounded-[20px] border-white/60 border-t border-l  text-center min-h-[120px] flex items-center flex-col justify-center z-10 text-[#333] bg-white/20 p-[20px] font-normal relative'>
                                    <span className='not-italic text-3xl shadow-2xl font-[600] text-primary'>
                                        {inView && (
                                            <span dir='ltr' className='flex gap-[2px] justify-end'>
                                                + <CountUp start={0} end={parseFloat(rawValue.includes('%') ? rawValue.split('%')[0].replace(/[٫٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString()) : rawValue.replace(/[٫٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString()))} duration={5} delay={0.1} />
                                                <span>{rawValue.includes('%') || rawValue.includes('٪') ? '%' : ''}</span>
                                            </span>
                                        )}
                                    </span>
                                    <span className='text-sm mt-[10px] text-white'>{name}</span>
                                </h2>
                            </div>
                        </div>
                    ))}
            </div>
            <Button onClick={downloadPDF} borderAll={true} cn='mt-[30px]' name={t('Download PDF')} />
        </EffectFixed>
    );
}
