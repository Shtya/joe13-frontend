'use client';
import Button from '@/components/atoms/Button';
import EffectFixed from '@/helpers/EffectFixed';
import Image from 'next/image';
import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Modal from '@/components/molecules/Modal';
import { baseImage } from '@/helpers/baseUrl';
import Title from '@/components/atoms/Title';

export default function TextCopy({ loading, data, more, btn = true, overlay = true, hidden, component, grid, icon }) {
    const t = useTranslations();
    const [isExpanded, setIsExpanded] = useState(false); // State to track if the list is expanded

    const [isModalOpen, setIsModalOpen] = useState(false);
    const locale = useLocale();

    return (
        <EffectFixed loading={loading} overlay={overlay} image={baseImage(data?.image?.url)} alt={data?.image?.alt}>
            {icon && (
                <div className={` transition-all duration-300 `}>
                    <Image className=' object-contain ' src='/assets/imgs/logo2.png' alt='' width={200} height={80} />
                </div>
            )}

            {!icon && <Title cn={` ${!isExpanded ? 'text-center' : '!text-primary rtl:text-right ltr:text-left'} w-full text-[40px] max-md:text-[20px] text-white `} title={data?.title?.[locale]} />}
            <Title cn={` ${!isExpanded ? 'text-center' : 'text18 rtl:text-right ltr:text-left'} w-full text-[22px] max-md:text-[16px] opacity-70 text-white `} title={data?.content?.[locale]} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {data?.list?.[locale] && (
                    <ul className={`md:container mx-auto  grid ${grid ? 'grid-cols-2' : 'grid-cols-1'} max-md:grid-cols-1 gap-y-[10px] gap-x-[50px] `}>
                        {data?.list?.[locale].map((item, index) => (
                            <li key={index} className='relative flex items-center gap-[10px]  text18 text-black font-medium mb-[6px] w-fit'>
                                <Image className='rtl:rotate-[-180deg] ' src='/assets/imgs/bullets2.png' alt='' width={20} height={20} />
                                {item}
                            </li>
                        ))}
                    </ul>
                )}

                {data?.objectData?.[locale] && (
                    <ul className={`md:container mx-auto grid grid-cols-${grid} max-md:grid-cols-1 gap-[30px] max-md:gap-[20px] `}>
                        {Object.entries(data?.objectData?.[locale]).map(([key, value], index) => (
                            <li key={index} className='md:mb-[10px]'>
                                <div className='mb-[10px] w-full grid grid-cols-1 items-start gap-[2px] text-black  text22 font-[500]'>
                                    <div className='flex items-center gap-[10px] justify-center w-full '>
                                        <Title cn='text-xl max-md:text-base text-center ' title={key} />
                                        <Image className='rotate-[0deg] ' src='/assets/imgs/arrow2.png' alt='' width={20} height={20} />
                                    </div>
                                    <Title cn=' text-balance text-base max-md:text-sm text-center opacity-70 ' title={value} />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {data?.list_Object?.[locale] && (
                    <ul className={`md:container mx-auto grid grid-cols-${grid} max-md:grid-cols-1 gap-[30px] max-md:gap-[20px] `}>
                        {data?.list_Object?.[locale].map((key, index) => (
                            <li key={index} className='md:mb-[10px]'>
                                <div className='mb-[10px] w-full grid grid-cols-1 items-start gap-[2px] text-black  text22 font-[500]'>
                                    <div className='flex items-center gap-[10px] w-full '>
                                        <Title cn='text-xl max-md:text-base  ' title={key?.title} />
                                        <Image className='rotate-[0deg] ' src='/assets/imgs/arrow2.png' alt='' width={20} height={20} />
                                    </div>
                                    <Title cn=' text-balance text-base max-md:text-sm  opacity-70 ' title={key?.desc} />
                                </div>
                                {key?.list && (
                                    <ul className={`md:container mx-auto  grid ${grid ? 'grid-cols-2' : 'grid-cols-1'} max-md:grid-cols-1 gap-y-[10px] gap-x-[50px] `}>
                                        {key?.list.map((item, i) => (
                                            <li key={i} className='relative flex items-center gap-[10px]  text-sm max-md:text-xs  text-black font-medium mb-[6px] w-fit'>
                                                <Image className='rtl:rotate-[-180deg] ' src='/assets/imgs/bullets2.png' alt='' width={16} height={16} />
                                                <span className="opacity-60 " > {item} </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {component && <div className=''>{component}</div>}
            </Modal>

            {/* {btn && <Button onClick={openPopup} borderAll={true} cn=' z-[100] mt-[15px]' name={isExpanded ? t('showLess') : more || t('readMore')} />} */}
            {btn && <Button onClick={() => setIsModalOpen(true)} borderAll={true} cn=' z-[100] mt-[15px]' name={isExpanded ? t('showLess') : more || t('readMore')} />}
        </EffectFixed>
    );
}
