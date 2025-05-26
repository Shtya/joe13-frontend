"use client"
import TextSlide from '@/helpers/TextSlide';
import React , {useState , useEffect} from 'react';

export default function Blog({ data , currentValue }) {
  const [storeData , setstoreData ] = useState(data)
	const [effect , seteffect] = useState("fade-up")


	useEffect(()=> {

		if(currentValue){
			setstoreData([])
			seteffect("zoom-in-down")
			setTimeout(() => {
				setstoreData(data)
			}, 0);
		}

	} ,[currentValue])

    return (
        <div data-aos={effect} className={` py-[40px]`}>
            <TextSlide color={"white"} cnParent={'w-fit mx-auto mb-[10px] '} cn={` ${!data?.list && "text-yellow-300"} text-center font-[700]  w-full max-md:text24 text40 `} text={data?.title} />
            <TextSlide color={"white"} cn={`${!data?.list && "text-yellow-300"}  text-center  w-full text20  text-balance`} text={data?.desc} />

            <ul className={` mx-auto md:px-[20px] !mt-[60px] flex-col flex gap-[20px] list-disc  `}>
                {storeData?.list?.map((item, index) => (
                    <li key={index} className='text-white  text20 mb-[10px] font-[500] w-fit '>
                        <TextSlide color={"white"} text={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
