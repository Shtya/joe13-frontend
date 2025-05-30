
import { baseImage } from '@/helpers/baseUrl';
import Image from 'next/image';

export default function HeroSection({data , locale , loading}) {
    return (
        <section className=' text-white !pt-[10px] pb-[70px] '>
            <div className=' grid grid-cols-1 lg:grid-cols-[500px,1fr] items-end gap-[30px] lg:gap-[100px] '>
                {/* Left Section */}
                <div className="max-w-[500px] w-full " >
                    <p  data-aos="fade-up" className='text-sm font-[600] text-gray-400 mb-2'>{ data?.serviceName?.[locale] }</p>
                    <h2 data-aos="fade-up" data-aos-delay={100} className=' text-xl md:text-4xl text-balance font-bold mb-6 leading-tight'> { data?.title?.[locale] } </h2>

                    <div className='flex gap-4 mt-8'>
                        {data?.images.map((src, idx) => (
                            <div  data-aos="fade-up" data-aos-delay={`${idx + 2}00`} key={idx} className='relative w-full h-[400px] rounded-xl overflow-hidden '>
                                <Image src={baseImage(src)} alt={`Image ${idx + 1}`} fill className='object-cover object-bottom w-full ' />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section */}
                <div className='space-y-10'>
                    {data?.attr.map((item, idx) => (
                        <div data-aos="fade-up" data-aos-delay={`${idx + 2}00`} key={idx} className="border-white/50 rtl:pr-[20px] rtl:border-r-2 ltr:pl-[20px] ltr:border-l-2 " >
                            <h3 className=' text-base md:text-xl  font-bold text-balance'>{item.key?.[locale]}</h3>
                            <p  className=' text-sm md:text-base text-white/50 mt-1 text-balance '>{item.value?.[locale]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
