'use client';

import { LatticeGlyph } from '@/components/jx/Glyphs';
import UnitScene from '@/components/jx/UnitScene';
import { useTranslations } from 'next-intl';

const FEATURES = [
    { key: 'Hero.customSoftware', src: '/landing/icon-6-1.png' },
    { key: 'Hero.aiSolutions', src: '/landing/icon-6-2.png' },
    { key: 'Hero.systemIntegration', src: '/landing/icon-6-3.png' },
    { key: 'Hero.ongoingSupport', src: '/landing/icon-6-4.png' },
];

/* Slide 6 — Software & AI. Personality: a three-layer network. */
export default function Section6({ data, loading, active = false, units = [], slideIndex = 5 }) {
    const t = useTranslations();
    return (
        <UnitScene
            id='software-ai'
            headingId='home-software-heading'
            data={data}
            loading={loading}
            active={active}
            units={units}
            slideIndex={slideIndex}
            fallbackTitle={t('Software & AI')}
            fallbackLede={t('section6')}
            tagFallback={t('Hero.smarterTomorrow')}
            features={FEATURES}
            glyph={<LatticeGlyph />}
            imageFallback='/landing/bg-6-section.png'
        />
    );
}
