'use client';

import { BroadcastGlyph } from '@/components/jx/Glyphs';
import UnitScene from '@/components/jx/UnitScene';
import { useTranslations } from 'next-intl';

/* Slide 5 — Marketing. Personality: the one-word broadcast — a mega title
   that morphs from wide-light to tight-bold, arcs radiating behind it. */
export default function Section5({ data, loading, active = false, units = [], slideIndex = 4 }) {
    const t = useTranslations();
    return (
        <UnitScene
            id='marketing'
            headingId='home-marketing-heading'
            variant='mega'
            data={data}
            loading={loading}
            active={active}
            units={units}
            slideIndex={slideIndex}
            fallbackTitle={t('Marketing')}
            fallbackLede={t('section5')}
            tagFallback={t('Hero.digitalGrowth')}
            glyph={<BroadcastGlyph />}
            imageFallback='/landing/bg-5-section.png'
        />
    );
}
