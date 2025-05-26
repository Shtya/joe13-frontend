'use client'

import React from 'react';



const Title = ({ title , dataAos , loading , cnLoading , cn , delay=0 }) => {

      return loading ? (
        <div  data-aos="fade-up" data-aos-delay={delay}  className={` skeleton-box  h-[40px]  bg-gray-100 rounded-lg  w-48  ${cnLoading} `} />
      ) : (
        <div  data-aos={dataAos} data-aos-delay={delay} className={`  ${cn}`}>{title}</div>
      )

};

export default Title;
