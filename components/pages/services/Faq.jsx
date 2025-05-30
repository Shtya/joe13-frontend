'use client';
import { useEffect, useRef, useState } from 'react';

export default function FAQAccordion({data , locale}) {
    const [activeIndex, setActiveIndex] = useState(null);
    const answerRefs = useRef([]);

    const toggleAccordion = index => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        answerRefs.current.forEach((ref, i) => {
            if (ref) {
                ref.style.maxHeight = activeIndex === i ? `${ref.scrollHeight}px` : '0px';
            }
        });
    }, [activeIndex]);

    return (
        <div className='flex flex-col items-center justify-center py-[70px] '>
            <h2 data-aos="fade-up"  className="text-xl md:text-4xl text-center font-bold mb-4"> {data?.title?.[locale]} </h2>
            <p  data-aos="fade-up" data-aos-delay={`100`} className="text-base text-gray-400 text-center max-w-2xl mx-auto mb-12"> {data?.subTitle?.[locale]} </p>

            <div className='w-full max-w-[800px] ' data-aos="fade-up" data-aos-delay={`200`} >
                {data?.list.map((item, i) => (
                    <div  key={i} style={{boxShadow:" 0px -2px 58.5px 0px #082B7414"}} className={`  ${activeIndex === i ? ' btn-blue-3d  ' : ''} backdrop-blur-[10px] bg-white/10 text-black rounded-2xl shadow-md mb-5 `}>
                        
                        <div  className={`cursor-pointer text-lg md:text-xl text-white font-semibold p-5 relative flex items-center justify-between`} onClick={() => toggleAccordion(i)}>
                            {item.question?.[locale]}
                            <span className={`text-2xl transition-transform btn-blue-3d rounded-full flex items-center justify-center w-[30px] h-[30px] duration-200  ${activeIndex === i ? ' !bg-gradient-to-b from-[#fff] to-[#fff] text-[#297dcb] ' : ''} `}>{activeIndex === i ? '−' : '+'}</span>
                        </div>

                        <div ref={el => (answerRefs.current[i] = el)} className='overflow-hidden transition-all duration-500'>
                            <div className='px-5 pb-5 leading-relaxed  text-white/80 text-sm md:text-base'>{item.answer?.[locale]}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
