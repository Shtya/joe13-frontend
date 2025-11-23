import Image from 'next/image';

export default function EffectFixed({cn , loading , alt , cnParent , id , overlay = true ,  image, children, z }) {
    
    return (
        loading 
        ? <div className="  absolute w-screen h-screen skeleton-box  " ></div>
        : <div id={id} className=' py-[50px] section overflow-x-hidden  relative min-h-screen w-full flex flex-col gap-[30px] justify-center items-center'>
            <div className={`fixed w-full h-full top-0 left-0 ${z ? z : 'z-[-10]'} transition-opacity duration-300 ease-in-out`}>
                <Image className={`${!overlay && "!object-contain"} ${cn}  img-overlay`} src={image} alt={alt || 'Background Image'} layout='fill' objectFit='cover' />
                {overlay && <div className='bg-overlay'></div>}
            </div>
            <div className={`container  z-0 !py-[40px] !px-[20px] max-md:!px-[40px] flex flex-col gap-[15px] justify-center items-center ${cnParent} `}> {children} </div>
        </div> 
    );
}


