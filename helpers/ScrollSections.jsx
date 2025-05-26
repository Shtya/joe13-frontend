'use client';
import Image from 'next/image';

export default function ScrollSections() {
    const sections = [
        { id: 1, image: '/assets/imgs/section2.jpeg', content: 'First Section' },
        { id: 2, image: '/assets/imgs/section3.jpeg', content: 'Second Section' },
        { id: 3, image: '/assets/imgs/section4.png', content: 'Third Section' },
    ];

    return (
        <div className="w-full">
            {sections.map((section, index) => (
               <div
			   key={section.id}
			   className="relative h-screen w-full flex justify-center items-center"
			   style={{
				   zIndex: sections.length - index,
			   }}
		   >
			   {/* Background */}
			   <div className="absolute inset-0 z-[-10]">
				   <Image
					   src={section.image}
					   alt={`Background for section ${section.id}`}
					   fill
					   className="object-cover"
				   />
			   </div>
		   
			   {/* Content */}
			   <div className="relative z-10 text-center text-white text-4xl font-bold">
				   {section.content}
			   </div>
		   </div>
		   
            ))}
        </div>
    );
}
