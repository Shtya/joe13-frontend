import React from 'react';

export default function TextLoading({countSkelton , name, cn, loading , cnSkelton }) {
    return loading 
			?<div  className={` flex flex-col ${cnSkelton} !h-full gap-[5px]  `} >
				{
					Array.from({ length: countSkelton || 1 }).map((_, index) => (
						<div className={`${cnSkelton} skeleton-box w-[100px] h-[40px]  bg-gray-100 rounded-lg `}> </div> 
					))
				}
			</div> 
			
			:  <div  className={`${cn}  `}>{name}</div>
		
}
