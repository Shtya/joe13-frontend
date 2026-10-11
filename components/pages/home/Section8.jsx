'use client';

import { WaveGlyph } from '@/components/jx/Glyphs';
import UnitScene from '@/components/jx/UnitScene';
import { useTranslations } from 'next-intl';

const FEATURES = [
    { key: 'Hero.networkSolutions', src: '/landing/icon-7-1.png' },
    { key: 'Hero.expertSales', src: '/landing/icon-7-2.png' },
    { key: 'Hero.customizedSolutions', src: '/landing/icon-7-3.png' },
    { key: 'Hero.businessGrowth', src: '/landing/icon-7-4.png' },
];

/* Slide 7 — Telecoms. Personality: a mast sending rings outward. */
export default function Section8({ data, loading, active = false, units = [], slideIndex = 6 }) {
    const t = useTranslations();
    return (
        <UnitScene
            id='telecoms'
            headingId='home-telecoms-heading'
            data={data}
            loading={loading}
            active={active}
            units={units}
            slideIndex={slideIndex}
            fallbackTitle={t('Telecoms')}
            fallbackLede={t('section8')}
            fallbackBody={t('Hero.telecomsDescription')}
            tagFallback={`${t('Hero.connectingPeople')} ${t('Hero.brighterTomorrow')}`}
            features={FEATURES}
            glyph={<WaveGlyph />}
            imageFallback='/landing/bg-7-section.png'
            imagePosition='64% center'
        />
    );
}
