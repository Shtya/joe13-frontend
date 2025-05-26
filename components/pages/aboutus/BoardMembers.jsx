import Button from '@/components/atoms/Button';
import EffectFixed from '@/helpers/EffectFixed';
import TextSlide from '@/helpers/TextSlide';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLocale, useTranslations } from 'next-intl';
import { useTeamMemeberData } from '@/hooks/useTeamMemeber';

export default function BoardMembers() {
    const { data, loading } = useTeamMemeberData();

    const t = useTranslations('aboutUs');
    const locale = useLocale();
    const tBtn = useTranslations('');


    const listRef = useRef(null); // Reference to the list
    const [isExpanded, setIsExpanded] = useState(false);

    const handleReadMore = () => {
        if (!isExpanded) {
            gsap.to(listRef.current, {
                height: 'auto',
                duration: 0.5,
                opacity: 1,
                ease: 'power2.out',
            });
        } else {
            // Animate the list to hide
            gsap.to(listRef.current, {
                height: 0,
                duration: 0.5,
                opacity: 0,
                ease: 'power2.in',
            });
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <EffectFixed cnParent={''} overlay={false} image={'/assets/aboutus/1.png'} z={'z-[-100]'}>
            {<TextSlide cnParent={`  ${isExpanded ? '  text-primary  ' : ''}  mb-[60px] max-md:mb-[30px]  `} cn={` ${!isExpanded ? '' : '!text-primary  '} w-full text40 text-white `} text={t('boardMembersTitle')} />}

            <div className=' !max-w-[1000px]  founders w-full flex flex-col gap-[50px] justify-start items-start md:px-[20px] '>
                {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className='flex max-md:flex-col items-center text-white gap-[40px] max-md:gap-[20px]'>

                              <div className=' w-[200px] h-[100px]   rounded-[50%] overflow-hidden bg-gray-300  skeleton-box'></div>

                              {/* Skeleton Text */}
                              <div className='flex flex-col gap-[3px] items-start w-full max-w-[700px]'>
                                  <div className='flex max-sm:flex-col max-sm:gap-[0px] items-center gap-[10px] max-md:mx-auto w-full'>
                                      <div className='h-[20px] w-[150px] bg-gray-300 skeleton-box rounded'></div>
                                      <div className='h-[18px] w-[100px] bg-gray-300 skeleton-box rounded'></div>
                                  </div>
                                  <div className='h-[14px] w-full bg-gray-200 skeleton-box rounded mt-2'></div>
                              </div>
                          </div>
                      ))
                    : data?.data?.slice(0, !isExpanded ? 4 : 19).map((e, i) => (
                          <div key={i} style={{order : e?.order}} className={` w-full flex max-md:flex-col items-center text-white gap-[40px] max-md:gap-[20px]`}>
                              <div className='cover w-full max-w-[150px] max-sm:w-[100px] max-sm:h-[100px] h-[150px] max-md:max-w-[150px] max-md:h-[150px] rounded-[50%] overflow-hidden' style={{ boxShadow: '1px 8px 18px 0px #FFFFFF1A , 5px 32px 32px 0px #FFFFFF17 ,10px 71px 43px 0px #FFFFFF0D , 19px 127px 51px 0px #FFFFFF03', }}>
                                  <Image className='object-contain bg-white w-full h-full' src={e.image_url} alt={e.image_alt} width={200} height={200} />
                              </div>
                              <div className='flex flex-col gap-[3px]  items-start'>
                                  <div className='flex max-sm:flex-col max-sm:gap-[0px] items-center gap-[10px] max-md:mx-auto'>
                                      <TextSlide cnParent={'text20 text-center'} text={e?.name?.[locale]} />
                                      <TextSlide cnParent={'text16  text-center font-[400] text-primary'} text={`( ${e?.position?.[locale]} )`} />
                                  </div>
                                  <TextSlide cnParent={'text14  max-md:!text-center max-w-[700px] opacity-50 w-full'} text={e?.bio?.[locale]} />
                              </div>
                          </div>
                      ))}
            </div>

            <Button onClick={handleReadMore} borderAll={true} cn='mt-[20px]' name={isExpanded ? tBtn('showLess') : tBtn('readMore')} />
        </EffectFixed>
    );
}
