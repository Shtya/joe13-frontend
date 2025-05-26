"use client"
import Tabs from '@/components/molecules/Tabs'
import Blog from './Blog'
import { blogsData } from '@/data/Data'

import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import { ArrowBigLeftDash } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { hookBlogs } from '@/hooks/hookBlogs'

export default function Filter() {
	const t = useTranslations("Blogs")
	// const tabs = [
	// 	{value : "telecoms" , name : t("telecoms") } ,
	// 	{value : "manpowerHrSolutions" , name : t("manpowerHrSolutions") } ,
	// 	{value : "marketing" , name : t("marketing") } ,
	// 	{value : "softwareAi" , name : t("softwareAi") } ,
	// 	{value : "mosanadah" , name : t("mosanadah") } ,
	// 	{value : "activationEventManagement" , name : t("activationEventManagement") } ,
	// ]

	const { loading , blogs } = hookBlogs()

    const locale = useLocale();
    const [currentValue, setcurrentValue] = useState();
    const containerRef = useRef(null);

    useEffect(() => {
        if ( typeof window !== "undefined" &&  containerRef.current) {
            mixitup(containerRef.current, {
                selectors: {
                    target: '.portfolio-item', // Class for portfolio items
                    control: '.filter-btn',
                  },
                  animation: {
                    enable: true,
                    effects: "fade scale",
                    duration: 600,
                    easing: "ease-in-out",
                    perspectiveDistance: "3000",
                    perspectiveOrigin: "100% 100%",
                    queue: true,
                    queueLimit: 1,
                    animateResizeContainer: true,
                    animateResizeTargets: false,
                    staggerSequence: false,
                    reverseOut: false,
                  },
                  load: {
                    filter: '.filter-17', // Show all items by default
                  },
            });
        }
    }, []);


    //! tabs
    const allCategories = blogs?.map(item => ({
        value: item.service.category,
        valueFilter: `filter-${item.service.category}`,
        name: item.service[`title_${locale}`],
    }));

    const uniqueCates = [...new Set(allCategories.map(category => JSON.stringify(category)))].map(str => JSON.parse(str));

    const handleChangeTabs = value => {
        setcurrentValue(value);
    };

  return (
	<div className="pointer-events-auto" >
		<Tabs tabs={uniqueCates} handleValue={handleChangeTabs} currentValue={currentValue} />

		<div id='portfoliolist' ref={containerRef} className={` ${!hidden && "hidden"} grid overflow-hidden mt-[30px] grid-cols-3 max-md:grid-cols-2  gap-[30px] max-md:gap-[10px] `}>
							{loading
								? Array.from({ length: 6 }).map((_, index) => (
									  <div key={index} className='w-full '>
										  <div className='relative cursor-pointer rounded-2xl max-md:p-2.5 p-2.5 flex flex-col justify-start items-center gap-1.25'>
											  <div className='max-w-[350px] w-full max-md:h-[200px] h-[300px] overflow-hidden'>
												  <div className='skeleton-box p-5 rounded-[20px] w-full h-full'></div>
											  </div>
											  <div className='skeleton-box h-8 w-full rounded-[20px] mt-4'></div>
										  </div>
									  </div>
								  ))
								: services?.map((e, i) => (
									  <div key={i} onClick={() => handleShowItem(e)} className={`portfolio-item filter-${e.category.id}  pointer-events-auto group relative cursor-pointer rounded-2xl max-md:p-2.5 p-2.5 transition duration-200 flex flex-col justify-start items-center gap-1.25`}>
										  <div className='absolute inset-0 bg-black clipathEffct'></div>
										  <div className='max-w-[350px] w-full h-full max-h-[300px] overflow-hidden'>
											  <Image className='p-5 rounded-2xl w-full h-full object-contain bg-black' src={e?.image || ""} alt={e.name_en} width={350} height={350} />
										  </div>
										  <div className='text-[30px] group-hover:text-primary duration-500 max-xl:text24 max-md:text20 text-center '> {e[`name_${locale}`]} </div>
									  </div>
								  ))}
						</div>

		{/* <Blog data={blogsData[currentValue]} currentValue={currentValue} /> */}
	</div>
  )
}