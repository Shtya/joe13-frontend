'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';

import Image from 'next/image';
import Button from '@/components/atoms/Button';
import { ArrowBigLeftDash } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

// import mixitup from "mixitup"
export default function Filter({ setcategory , skeltonCount , showItem , services, loading }) {
    const t = useTranslations('Services');

    const tBtn = useTranslations('');
    const locale = useLocale();
    const [currentValue, setcurrentValue] = useState();
    const [currentItem, setcurrentItem] = useState();
    const [hidden, sethidden] = useState(true);
    const searchParams = useSearchParams();
    const name = searchParams.get('n');
    const containerRef = useRef(null);

   


    //! tabs
    const pathName = usePathname()
    const allCategories = services?.map(item => ({
        value: item?.category?.id                 || item.service.id ,
        valueFilter: `filter-${item?.category?.id || item.service.id}`,
        name: item?.category?.[`name_${locale}`]  || item.service[`title_${locale}`] ,
    }));

    const uniqueCates = [...new Set(allCategories.map(category => JSON.stringify(category)))].map(str => JSON.parse(str));

    const handleChangeTabs = value => {
        setcurrentValue(value);
        sethidden(true);
        setcategory('');
    };


    const handleShowItem = value => {
        setcurrentItem(value);
        sethidden(false);
        setcategory(value);
        window.scrollTo(0,0);
    };

    const handleReturn = value => {
        sethidden(true);
        setcategory('');
    };

    useEffect(() => {

        if (!name) {
            setcurrentValue(uniqueCates[0]?.valueFilter);
        }
    }, [name, services]);


    const getById = (id ) =>{
        return services?.filter(e=> e.id === id )
    }




    // useEffect(() => {
    //     if (!loading && containerRef.current) {
            // const mixer = mixitup(containerRef.current, {
            //     selectors: {
            //         target: '.portfolio-item',
            //         control: '.filter-btn',
            //     },
            //     animation: {
            //         enable: true,
            //         effects: 'fade scale',
            //         duration: 600,
            //         easing: 'ease-in-out',
            //     },
            //     load: {
            //         filter: `.${uniqueCates[0]?.valueFilter}`,
            //     },
            // });

    //         switch (name) {
    //             case "telecoms"          : mixer.filter(".filter-38") ; handleChangeTabs("filter-38") ; break;
    //             case "manpowerAndHR"     : mixer.filter(".filter-39") ; handleChangeTabs("filter-39") ; break;
    //             case "marketing"         : mixer.filter(".filter-15") ; handleChangeTabs("filter-15") ; break;
    //             case "softwareAndAI"     : mixer.filter(".filter-17") ; handleChangeTabs("filter-17") ; break;
    //             case "mosanadah"         : mixer.filter(".filter-40") ; handleChangeTabs("filter-40") ; break;
    //             case "activationAndEvent": mixer.filter(".filter-18") ; handleChangeTabs("filter-18") ; break;
    //             case "erp": mixer.filter(".filter-40") ; handleChangeTabs("filter-40") ; break;
    //             case "joe-mi": 
    //                 mixer.filter(".filter-17")
    //                 handleChangeTabs("filter-17")
    //                 handleShowItem(getById(72)[0]) ; 
    //                 break;
                    
    //             case "joe-x": 
    //                 handleChangeTabs("filter-17")
    //                 mixer.filter(".filter-17")
    //                 handleShowItem(getById(73)[0]) ; 
    //                 break;
                    

    //             default: mixer.filter(`.${uniqueCates[0]?.valueFilter}`) ; handleChangeTabs(uniqueCates[0]?.valueFilter);
    //         }


    //         return () => {
    //             if (mixer) mixer.destroy(); // Cleanup MixItUp instance on component unmount or reinitialization.
    //         };
    //     }
    // }, [loading, pathName , name]);


    return (
        <div className='w-full' data-aos="fade-up" >
            <div  id='filters' className={` controls flex flex-wrap justify-center gap-[20px] items-center mt-[10px] mb-[20px] `}>
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <div key={index} className=''>
                              <div className='skeleton-box w-[100px] h-[40px]  bg-gray-100 rounded-lg'></div>
                          </div>
                      ))
                    : uniqueCates.map((tab, index) => (
                              <div key={index} onClick={_=> handleChangeTabs(tab.valueFilter) } data-filter={`.${tab.valueFilter}`} className={`filter-btn cursor-pointer relative  ${currentValue == tab.valueFilter ? 'text-primary ' : 'text-white'} duration-300 hover:text-primary  text20 max-md:text16 font-[500]  `}>
                                  {tab.name} <span className={` ${currentValue == tab.valueFilter ? 'scale-1.1' : 'scale-0'} absolute duration-500 transition-all w-[8px] h-[8px] rounded-[50%] font-[600] bg-primary  top-[-10px]  left-[50%] translate-x-[-50%]`}> </span>{' '}
                              </div>
                      ))}
            </div>




                <div id='portfoliolist'   ref={containerRef} className={` ${!hidden && "hidden"} grid overflow-hidden mt-[30px] grid-cols-3  max-md:grid-cols-2  gap-[30px] max-md:gap-[10px] `}>
                    {loading
                        ? Array.from({ length: skeltonCount }).map((_, index) => (
                              <div key={index} className='w-full '>
                                  <div className='relative cursor-pointer rounded-2xl max-md:p-2.5 p-2.5 flex flex-col justify-start items-center gap-1.25'>
                                      <div className='max-w-[350px] w-full max-md:h-[150px] h-[300px] overflow-hidden'>
                                          <div className='skeleton-box p-5 rounded-[20px] w-full h-full'></div>
                                      </div>
                                      <div className='skeleton-box h-8 w-full rounded-[20px] mt-4'></div>
                                  </div>
                              </div>
                          ))
                        : services?.map((e, i) => (
                              <div key={i} onClick={() => handleShowItem(e)} className={`max-w-[350px] !h-full w-full portfolio-item  filter-${e?.category?.id || e.service.id }  pointer-events-auto group relative cursor-pointer rounded-2xl !p-[5px] md:p-2.5  transition duration-200 flex flex-col justify-start items-center gap-1.25`}>
                                  <div className='absolute inset-0 bg-black clipathEffct'></div>
                                  <div className='w-full h-full max-h-[300px] overflow-hidden'>
                                      <Image className='p-[5px] rounded-2xl w-full h-full object-contain bg-black' src={ e?.image || e?.images?.[0]?.image || ""} alt={e?.name_en || e?.title_en  || "alt"} width={350} height={350} />
                                  </div>
                                  <div className={`text24 !max-md:text14 ${e[`title_${locale}`] && "text20"} group-hover:text-primary duration-500 max-xl:text24 max-md:text20 text-center `}> {e[`name_${locale}`] || e[`title_${locale}`]} </div>
                              </div>
                          ))}
                </div>


                {!hidden && showItem &&  <div className={``} >
                    <div className={`flex max-md:flex-col items-center gap-[20px] mt-[50px] relative `}>
                        <Image data-aos='zoom-in' className=' border-[1px] border-gray-200 max-xl:w-[200px]  rounded-[20px] mt-[50px]' src={currentItem?.image} alt={currentItem?.name_en} width={350} height={350} />
                        <div className='flex flex-col'>
                            <div data-aos='zoom-in' className='max-md:text-center text40 mb-[10px]  '>
                                {currentItem?.[`name_${locale}`]}
                            </div>
                            <div data-aos='zoom-in' className='max-md:text-center text18  md:mb-[20px] !opacity-70 '>
                                {currentItem?.category?.[`name_${locale}`]}
                            </div>
                            <div data-aos='zoom-in' className='max-md:text-center text24 max-md:text18 text-wrap '>
                                {currentItem?.[`description_${locale}`]}
                            </div>
                        </div>
                    </div>

                    <div className=' mt-[40px]  flex items-center justify-end max-md:justify-center  gap-[10px] '>
                        <button onClick={handleReturn} data-aos='zoom-in' className=' hover:opacity-80 hover:bg-primary hover:text-white hover:border-primary duration-300 w-[50px] h-[50px] border-[2px] rounded-[50%] border-primary  text-primary   flex justify-center items-center p-[8px] !cursor-pointer '>
                            <ArrowBigLeftDash className=' w-full h-full' />
                        </button>
                        <div data-aos='zoom-in'>
                            <Button href={'/contact-us'} name={tBtn('ConsultNow')} borderAll={true} cn={''} />
                        </div>
                    </div>
                </div>}

        </div>
    );
}