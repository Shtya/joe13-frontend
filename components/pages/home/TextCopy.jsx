'use client';
import Button from '@/components/atoms/Button';
import EffectFixed from '@/helpers/EffectFixed';
import Image from 'next/image';
import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Modal, { getModalItems } from '@/components/molecules/Modal';
import { baseImage } from '@/helpers/baseUrl';
import Title from '@/components/atoms/Title';

export default function TextCopy({ loading, data, more, btn = true, overlay = true, hidden, component, grid, icon }) {
    const t = useTranslations();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const locale = useLocale();
    const title = data?.title?.[locale];
    const description = data?.content?.[locale];
    const items = getModalItems(data, locale);

    return (
        <EffectFixed loading={loading} overlay={overlay} image={baseImage(data?.image?.url)} alt={data?.image?.alt}>
            {icon && (
                <div className={`relative w-[200px] h-[80px] transition-all duration-300 `}>
                    <Image className='object-contain' src='/assets/imgs/logo2.png' alt='' fill sizes='200px' />
                </div>
            )}

            {!icon && <Title cn={` ${!isExpanded ? 'text-center' : '!text-primary rtl:text-right ltr:text-left'} w-full text-[40px] max-md:text-[20px] text-white `} title={title} />}
            <Title cn={` ${!isExpanded ? 'text-center' : 'text18 rtl:text-right ltr:text-left'} w-full text-[22px] max-md:text-[16px] opacity-70 text-white `} title={description} />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                description={description}
                items={items}
            >
                {component ? <div>{component}</div> : null}
            </Modal>

            {btn && <Button onClick={() => setIsModalOpen(true)} borderAll={true} cn=' z-[100] mt-[15px]' name={isExpanded ? t('showLess') : more || t('readMore')} />}
        </EffectFixed>
    );
}
