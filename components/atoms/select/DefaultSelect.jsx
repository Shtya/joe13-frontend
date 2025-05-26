'use client';
import { ArrowUp, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, {  useEffect, useRef, useState } from 'react';

const DefaultSelect = ({cnSelect ,label , dataAos , error , trigger , watch , KEY, setValue, icon, data, classname, place }) => {
    const t = useTranslations()

  const [val, setval] = useState();
  const [show, setShow] = useState(false);
  const locale = useLocale();

  const handleValue = e => {

    setval({ name: e.target.value });
    setValue?.(KEY, e.target.value);
    setShow(!show);
  };

  const watchKey = watch?.(KEY)
  useEffect(()=>{
    if(watchKey)  trigger?.(KEY)
  },[watchKey])


  useEffect(()=> {
    const selectElement = document.getElementById("mySelect");
    const arrowElement = document.getElementById("arrow");

    selectElement.addEventListener('focus', function () {
      arrowElement.classList.add("rotate-180");
    });

    selectElement.addEventListener('blur', function () {
      arrowElement.classList.remove("rotate-180");
    });
  },[])

  const [open , setopen] = useState(false)
  return (
    <div className={`${classname} relative select flex  flex-col gap-[5px]  w-full `}>
      {label && <label htmlFor={KEY} className={`h5`} > {label} </label> }

      <div className='relative w-full  ' >
        <select id="mySelect" onChange={handleValue} className={` !outline-none w-full relative appearance-none ${val?.name ? "" : " text-secondry3 "} ${cnSelect} h5 outline-none cursor-pointer border-[#BCBBBF] border-[1px] h-[45px] rounded-[8px]`} >
            <option value=""  > {place} </option>
            {data.map((e, i) => (
                <option key={i} className=' capitalize h5 hover:text-primary1 duration-0 ' value={e?.name_en ? e[`name_${locale}`] : e?.name} > {e?.name_en ? e[`name_${locale}`] : e?.name} </option>
            ))}

        </select>

        <ChevronDown id="arrow" className={` ${val?.name ? "" : " text-secondry3 "} transform duration-300 w-[15px] absolute top-[50%] translate-y-[-50%] rtl:left-[10px]  ltr:right-[10px]`} />
      </div>

      {error && <div className='error absolute ' > {t(error?.message)} </div>}
    </div>
  );
};

export default DefaultSelect;
