import Image from 'next/image';

export default function EffectFixed({cn , loading , alt , cnParent , id , overlay = true ,  image, children, z }) {
    
    return (
        loading 
        ? <div className="  absolute w-screen h-screen skeleton-box  " ></div>
        : <div id={id} className=' py-[50px] section overflow-x-hidden  relative min-h-screen w-full flex flex-col gap-[30px] justify-center items-center'>
            <div className={`hero-slide-bg fixed w-full h-full top-0 left-0 overflow-hidden ${z ? z : 'z-[-10]'} transition-opacity duration-300 ease-in-out`}>
                <Image className={`${!overlay && "!object-contain"} ${cn}  img-overlay`} src={image} alt={alt || 'Background Image'} fill />
                {overlay && <div className='bg-overlay hero-slide-veil'></div>}
            </div>
            <div className={`container z-10 !py-[40px] !px-[20px] max-md:!px-[40px] flex flex-col gap-[15px] justify-center items-center ${cnParent} `}> {children} </div>
        </div> 
    );
}


