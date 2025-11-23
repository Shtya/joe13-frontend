'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useValues } from '@/app/context';

const Modal = ({ isOpen, onClose, children, title }) => {
    const { isModalOpen, setModalOpen } = useValues();

    useEffect(() => {
        const body = document.body;

        if (isOpen) {
            body.classList.add('modal-body');
            setModalOpen(false);
        } else {
            body.classList.remove('modal-body');
            setModalOpen(true);
        }

        return () => {
            body.classList.remove('modal-body');
        };
    }, [isOpen]);

    useEffect(() => {
        if (isModalOpen) onClose();
    }, [isModalOpen]);

    return (
        <div className={` fixed z-[1000000000000] flex items-center justify-center p-7 inset-0 ${isOpen ? ' pointer-events-auto opacity-100 ' : 'pointer-events-none opacity-0'} `}>
            <div onClick={onClose} className={`w-0 h-[30px] !bg-black/40 backdrop-blur-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${isOpen ? '!w-screen !h-screen ' : ''}   transition-width-height`}></div>

            <div className={` scroll-style-2 ${isOpen ? ' scale-100 opacity-100' : 'scale-0 opacity-0 '} !delay-700 duration-500 transition-all  max-w-[700px] w-full   transition-width-height2 relative bg-white/60 backdrop-blur-[30px] md:rounded-2xl shadow-xl  `}>
                {/* <div className="w-[120%] h-[120%] z-[-1] bg-white/20  absolute left-[-10%] top-1/2 -translate-y-1/2  " ></div> */}
                
                <button className=' btn-blue-3d  backdrop-blur-[105px]  btn-close absolute top-[-10px] right-[-10px] text-red-500 hover:scale-[1.2] after:backdrop-blur-[2px] duration-500 hover:after:scale-[.8] after:duration-500  ' onClick={onClose} aria-label='Close modal'>
                    <X className='w-5 h-5 max-md:w-4 max-md:h-4 ' />
                </button>

                {title && <h2 className='  text-xl font-semibold mb-4'>{title}</h2>}

                <div className='  max-h-[80vh] overflow-y-auto max-md:!py-[30px] !px-[15px] md:!p-[30px] '>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
