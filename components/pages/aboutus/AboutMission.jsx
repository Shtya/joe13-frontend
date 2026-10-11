'use client';

import { CompassGlyph } from '@/components/jx/Glyphs';
import StatementScene, { IconAscend, IconMark, IconTeam } from '@/components/jx/StatementScene';
import { cmsImage, pickList, pickUi } from '@/helpers/cms';
import { useLocale, useTranslations } from 'next-intl';
import { normalizePillars } from './pillars';

/* About 4 — Mission. Personality: a compass closing on its target. */
export default function AboutMission({ data, loading, active = false }) {
    const ta = useTranslations('aboutUs');
    const locale = useLocale();
    const labels = normalizePillars(pickList(data, locale, 'features'), ta.raw('missionFeatures'));
    const icons = [IconTeam, IconAscend, IconMark];

    return (
        <StatementScene
            id='mission'
            headingId='mission-heading'
            loading={loading}
            active={active}
            image={cmsImage(data?.image?.url, '/landing/about-us-bg-4.png')}
            tag={pickUi(data, locale, 'eyebrow', ta('missionEyebrow'))}
            title={data?.title?.[locale] || ta('ourMissionTitle')}
            lede={data?.content?.[locale] || ta('ourMission')}
            pillars={labels.map((lines, i) => ({ Icon: icons[i] || IconTeam, lines }))}
            shade='deep'
            glyph={<CompassGlyph />}
            caption={pickUi(data, locale, 'slogan', ta('missionCaption'))}
        />
    );
}
