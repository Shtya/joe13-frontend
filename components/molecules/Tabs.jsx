import { useTranslations } from 'next-intl';
import React from 'react';

export default function Tabs({ tabs, handleValue, currentValue , loading }) {
    const t = useTranslations('Blogs');

    return (
        <div  id='filters' className={` controls flex flex-wrap justify-center gap-[20px] items-center mt-[10px] mb-[20px] `}>
                {loading
                    ? Array.from({ length: 7 }).map((_, index) => (
                          <div key={index} className=''>
                              <div className='skeleton-box w-[100px] h-[40px]  bg-gray-100 rounded-lg'></div>
                          </div>
                      ))
                    : tabs.map((tab, index) => (
                          <div key={index}>
                              <div key={index} onClick={_=> handleValue(tab.valueFilter) } data-filter={`.${tab.valueFilter}`} className={`filter-btn cursor-pointer relative  ${currentValue == tab.valueFilter ? 'text-primary ' : 'text-white'} duration-300 hover:text-primary  text20 max-md:text14 font-[500]  `}>
                                  {tab.name} <span className={` ${currentValue == tab.valueFilter ? 'scale-1.1' : 'scale-0'} absolute duration-500 transition-all w-[8px] h-[8px] rounded-[50%] font-[600] bg-primary  top-[-10px]  left-[50%] translate-x-[-50%]`}> </span>{' '}
                              </div>
                          </div>
                      ))}
            </div>
    );
}
