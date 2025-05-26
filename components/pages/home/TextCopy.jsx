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

    // console.log(data)

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

{
    /* 'use client';
import Button from '@/components/atoms/Button';
import EffectFixed from '@/helpers/EffectFixed';
import Title from '@/helpers/Title';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTranslations } from 'next-intl';
import Popup from '@/components/molecules/Popup';
import Modal from '@/components/molecules/Modal';

export default function TextCopy({ loading , data , more, btn = true, overlay = true, hidden, component, list , grid, img, icon, title, description }) {
    const t = useTranslations();
    const [isExpanded, setIsExpanded] = useState(false); // State to track if the list is expanded

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <EffectFixed overlay={overlay} image={img}>
            {icon && (
                <div className={`${isExpanded ? ' h-0 overflow-hidden ' : ''}  transition-all duration-300 `}>
                    <Image className=' object-contain ' src='/assets/imgs/logo2.png' alt='' width={200} height={80} />
                </div>
            )}

            {!icon && <Title cnParent={` ${hidden && isExpanded && 'hidden'}   ${isExpanded ? 'w-full flex items-start justify-start text-primary  ' : ''}   `} cn={` ${!isExpanded ? 'text-center' : '!text-primary rtl:text-right ltr:text-left'} w-full text40 text-white `} text={title} />}
            {icon && <div className={`${isExpanded ? 'w-full flex items-start justify-start !text-primary rtl:text-right ltr:text-left' : 'hidden'} text-center duration-300 transition-all w-full text40 text-white `}> {title} </div>}
            <Title cnParent={` !mt-[-5px] ${hidden && isExpanded && 'hidden'} ${isExpanded ? '  z-[1] w-full flex items-start justify-start ' : ''}`} cn={` ${!isExpanded ? 'text-center' : 'text18 rtl:text-right ltr:text-left'} w-full text22 text-white `} text={description} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} position='bottom-center'>
                {list && (
                    <ul className={`md:container mx-auto list-disc grid ${grid ? 'grid-cols-2' : 'grid-cols-1'} max-md:grid-cols-1 gap-y-[10px] gap-x-[50px] `}>
                        {list.map((item, index) => (
                            <li key={index} className='!text-black  text18 mb-[5px] font-[500] w-fit '>
                                {item}
                            </li>
                        ))}
                    </ul>
                )}

                {data && (
                    <ul className={`md:container mx-auto grid grid-cols-${grid} max-md:grid-cols-1 gap-[20px] max-md:gap-[10px] `}>
                        {data.map((item, index) => (
                            <li key={index} className='md:mb-[10px]'>
                                <div className='mb-[10px] grid grid-cols-[150px,1fr] max-md:grid-cols-1 items-start md:gap-[5px] text-black  text22 font-[500] w-fit'>
                                    <Title cnParent={'flex-none w-fit '} cn='text18' text={item?.title} />
                                    <Title cnParent={'text16 font-[400] opacity-70  '} text={item?.desc} />
                                </div>
                                {item?.data?.map((item, index) => (
                                    <div key={index} className='text-black  text18 opacity-70 list-disc mx-[20px]  font-[500] w-fit '>
                                        <li>
                                            {' '}
                                            <Title cn={'text14'} text={item} />{' '}
                                        </li>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                )}

                {component && <div className=''>{component}</div>}
            </Modal>

            {btn && <Button onClick={() => setIsModalOpen(true)} borderAll={true} cn=' z-[100] mt-[15px]' name={isExpanded ? t('showLess') : more || t('readMore')} />}
        </EffectFixed>
    );
}






            {/* <Popup closeTab={closeTab} isOpen={isOpen} setIsOpen={setIsOpen} isAnimating={isAnimating} setIsAnimating={setIsAnimating}>
                {list && (
                    <ul className={`md:container mx-auto list-disc grid ${grid ? 'grid-cols-2' : 'grid-cols-1'} max-md:grid-cols-1 gap-y-[10px] gap-x-[50px] `}>
                        {list.map((item, index) => (
                            <li key={index} className='!text-black  text18 mb-[5px] font-[500] w-fit '>
                                <Title text={item} />
                            </li>
                        ))}
                    </ul>
                )}

                {data && (
                    <ul className={`md:container mx-auto grid grid-cols-${grid} max-md:grid-cols-1 gap-[20px] max-md:gap-[10px] `}>
                        {data.map((item, index) => (
                            <li key={index} className='md:mb-[10px]'>
                                <div className='mb-[10px] grid grid-cols-[150px,1fr] max-md:grid-cols-1 items-start md:gap-[5px] text-black  text22 font-[500] w-fit'>
                                    <Title cnParent={'flex-none w-fit '} cn='text18' text={item?.title} />
                                    <Title cnParent={'text16 font-[400] opacity-70  '} text={item?.desc} />
                                </div>
                                {item?.data?.map((item, index) => (
                                    <div key={index} className='text-black  text18 opacity-70 list-disc mx-[20px]  font-[500] w-fit '>
                                        <li>
                                            {' '}
                                            <Title cn={'text14'} text={item} />{' '}
                                        </li>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                )}

                {component && <div className=''>{component}</div>}
            </Popup> 
*/
}
