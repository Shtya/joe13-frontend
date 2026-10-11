'use client';

import { HorizonGlyph } from '@/components/jx/Glyphs';
import StatementScene, { IconGlobe, IconGrowth, IconInnovation } from '@/components/jx/StatementScene';
import { cmsImage, pickList, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import { normalizePillars } from './pillars';

/* About 3 — Vision. Personality: a horizon; light travels toward the future. */
export default function AboutVision({ data, loading, active = false }) {
    const ta = useTranslations('aboutUs');
    const locale = useLocale();
    const labels = normalizePillars(pickList(data, locale, 'features'), ta.raw('visionFeatures'));
    const icons = [IconInnovation, IconGrowth, IconGlobe];

    return (
        <StatementScene
            id='vision'
            headingId='vision-heading'
            loading={loading}
            active={active}
            image={cmsImage(data?.image?.url, '/landing/about-us-bg-3.png')}
            tag={pickUi(data, locale, 'eyebrow', ta('visionEyebrow'))}
            title={data?.title?.[locale] || ta('ourVisionTitle')}
            lede={data?.content?.[locale] || ta('ourVision')}
            pillars={labels.map((lines, i) => ({ Icon: icons[i] || IconInnovation, lines }))}
            glyph={<HorizonGlyph />}
        />
    );
}
