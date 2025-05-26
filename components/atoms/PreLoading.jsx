
// "use client"
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';

// const PreLoading = ({finish , setfinish}) => {
//   const [loadingProgress, setLoadingProgress] = useState(0); // State to track loading progress
//   const loadingBarRef = useRef(null); // Reference to the loading bar

//   useEffect(() => {
//     // GSAP animation to animate the loading bar from 0% to 100%
//     gsap.to(loadingBarRef.current, {
//       width: '100%', // Animate the width to 100%
//       duration: 1.5, // Duration of 4000ms (4 seconds)
//       ease: 'power2.out', // Smooth easing
//       onUpdate: () => {
//         const progress = Math.round(gsap.getProperty(loadingBarRef.current, 'width') );
//         setLoadingProgress(progress);
//       },
//       onComplete: () => {
//         setfinish(true)
//       },
//     });
//   }, []);

//   return (
//     <div className={` ${finish ? "two" : "one"} duration-500 w-screen z-[1000000000000] h-screen fixed inset-0 bg-black`}>
//       <div className="w-[100vw] h-[100vh] fixed left-0 top-0 z-[-1]  " > <ParticleGround  /> </div>
//       <div className="overlay fixed inset-0 bg-[#000] w-screen h-screen z-[10] bg-opacity-50"></div>

//       <div className="loading-screen relative z-[100] w-screen h-screen flex items-center justify-center">
//         <div className="z-[1000000000] loading-animation flex items-center flex-col justify-center">
//           <img className="w-[300px]" src="/assets/imgs/logo.png" alt="Logo" />
          
// 		  <div className=" mt-4 w-[180px] h-[4px] bg-gray-700  overflow-hidden">
//             <div
//               ref={loadingBarRef}
//               className="h-full bg-primary loading-progress"
//               style={{ fontFamily : "Kalam"  , width: `${loadingProgress}%` }} 
//             ></div>
//           </div>
//           {/* Display loading progress as text */}
//           <p className="mt-2 text-white opacity-20 absolute bottom-0 right-0 text-[100px] font-[800] ">{loadingProgress}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreLoading;


import React from 'react'

export default function PreLoading() {
  return (
    <div>PreLoading</div>
  )
}
