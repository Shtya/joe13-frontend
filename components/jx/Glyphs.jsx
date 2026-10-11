'use client';

/*
 * Line-art glyphs — one per business unit, drawn in silver light.
 *
 * Entrance (orchestrated by the scene timeline):
 *   1. the whole glyph blooms out of blur + scale   (data-jx="bloom")
 *   2. every stroke draws itself 0 → 1               (data-jx="draw")
 *   3. nodes spring in                               (data-jx="pop")
 * Afterwards, pulses of light travel the main paths (.jx-comet, loops only
 * while the slide is visible). Vocabulary: circles, arcs, straight lines,
 * glint nodes. No fills, no gradients.
 */

/** Round computed geometry so server and client render identical markup. */
const q = n => Math.round(n * 100) / 100;

const TONE = { main: 'jx-stroke', mid: 'jx-stroke jx-stroke--mid', dim: 'jx-stroke jx-stroke--dim' };

/** A drawn stroke; `comet` adds a travelling light pulse on the same path. */
function Trace({ as: El = 'path', tone = 'mid', comet = false, delay = 0, ...geo }) {
    return (
        <>
            <El {...geo} pathLength='1' data-jx='draw' className={TONE[tone]} />
            {comet ? <El {...geo} pathLength='1' className='jx-comet jx-loop' style={{ animationDelay: `${2 + delay}s` }} /> : null}
        </>
    );
}

function Node({ cx, cy, r = 5, soft = false }) {
    return <circle cx={cx} cy={cy} r={r} className={`${soft ? 'jx-node--soft' : 'jx-node'} jx-pulse jx-loop`} data-jx='pop' />;
}

function Canvas({ viewBox = '0 0 600 600', children }) {
    return (
        <svg viewBox={viewBox} data-jx='bloom' className='h-full w-full overflow-visible'>
            {children}
        </svg>
    );
}

/* Marketing — a broadcast: arcs radiating from one source */
export function BroadcastGlyph() {
    const arcs = [70, 130, 200, 280, 370, 470];
    const a = (48 * Math.PI) / 180;
    return (
        <Canvas>
            {arcs.map((r, i) => (
                <Trace
                    key={r}
                    tone={i % 2 ? 'dim' : 'mid'}
                    comet={i === 2 || i === 4}
                    delay={i * 0.4}
                    d={`M${q(80 + r * Math.cos(-a))} ${q(300 + r * Math.sin(-a))} A${r} ${r} 0 0 1 ${q(80 + r * Math.cos(a))} ${q(300 + r * Math.sin(a))}`}
                />
            ))}
            {[0, 1, 2].map(i => (
                <path
                    key={`wave${i}`}
                    d={`M${q(80 + 470 * Math.cos(-a))} ${q(300 + 470 * Math.sin(-a))} A470 470 0 0 1 ${q(80 + 470 * Math.cos(a))} ${q(300 + 470 * Math.sin(a))}`}
                    className='jx-stroke jx-emit jx-loop'
                    style={{ '--ox': '80px', '--oy': '300px', animationDelay: `${1.6 + i * 1.2}s`, strokeWidth: 2 }}
                />
            ))}
            <Trace tone='dim' d='M80 300 L560 300' comet />
            <Node cx={80} cy={300} r={7} />
            <Node cx={q(80 + 200 * Math.cos(-0.5))} cy={q(300 + 200 * Math.sin(-0.5))} soft />
            <Node cx={q(80 + 370 * Math.cos(0.3))} cy={q(300 + 370 * Math.sin(0.3))} soft />
        </Canvas>
    );
}

/* Software & AI — a three-layer network */
export function LatticeGlyph() {
    const layers = [
        [140, 260, 380, 500].map(y => [110, y]),
        [90, 210, 330, 450, 570].map(y => [300, y]),
        [200, 320, 440].map(y => [490, y]),
    ];
    const links = [];
    layers.slice(0, -1).forEach((layer, li) =>
        layer.forEach(([x1, y1], a) =>
            layers[li + 1].forEach(([x2, y2], b) => {
                if ((a + b) % 2 === 0) links.push(`M${x1} ${y1} L${x2} ${y2}`);
            }),
        ),
    );
    return (
        <Canvas viewBox='0 0 600 660'>
            {links.map((d, i) => (
                <Trace key={i} tone='dim' d={d} comet={i % 4 === 0} delay={i * 0.25} />
            ))}
            {layers.flat().map(([x, y], i) => (
                <Trace key={`n${i}`} as='circle' tone='mid' cx={x} cy={y} r={15} />
            ))}
            {layers.flat().map(([x, y], i) => (
                <circle key={`f${i}`} cx={x} cy={y} r={7} className='jx-node jx-fire jx-loop' style={{ animationDelay: `${1.4 + ((i * 7) % 12) * 0.28}s` }} />
            ))}
            <Node cx={300} cy={330} r={6} />
            <Node cx={490} cy={200} soft />
            <Node cx={110} cy={380} soft />
        </Canvas>
    );
}

/* Telecoms — a mast with expanding signal rings */
export function WaveGlyph() {
    return (
        <Canvas>
            {[60, 120, 190, 270].map((r, i) => (
                <Trace key={r} as='ellipse' tone={i % 2 ? 'dim' : 'mid'} comet={i > 0} delay={i * 0.5} cx={300} cy={170} rx={r} ry={q(r * 0.42)} />
            ))}
            {[0, 1, 2].map(i => (
                <ellipse
                    key={`ripple${i}`}
                    cx={300}
                    cy={170}
                    rx={290}
                    ry={122}
                    className='jx-stroke jx-emit jx-loop'
                    style={{ '--ox': '300px', '--oy': '170px', animationDelay: `${1.5 + i * 1.2}s`, strokeWidth: 2 }}
                />
            ))}
            <Trace tone='mid' d='M300 170 L230 560 M300 170 L370 560' />
            <Trace tone='dim' d='M262 380 L338 380 M248 460 L352 460 M276 290 L324 290' />
            <Trace tone='dim' d='M262 380 L352 460 M338 380 L248 460 M276 290 L338 380 M324 290 L262 380' />
            <Trace tone='dim' d='M150 560 L450 560' />
            <Node cx={300} cy={170} r={7} />
            <Node cx={490} cy={170} soft />
            <Node cx={180} cy={170} soft />
        </Canvas>
    );
}

/* Manpower & HR — interlocking circles of people */
export function PeopleGlyph() {
    const ring = [
        [300, 210],
        [210, 365],
        [390, 365],
    ];
    return (
        <Canvas>
            <g className='jx-sway jx-loop' style={{ '--ox': '300px', '--oy': '313px', '--amp': '7deg' }}>
            {ring.map(([x, y], i) => (
                <Trace key={i} as='circle' tone={i === 0 ? 'mid' : 'dim'} comet delay={i * 0.7} cx={x} cy={y} r={150} />
            ))}
            <Trace as='circle' tone='dim' cx={300} cy={313} r={250} />
            {ring.map(([x, y], i) => (
                <g key={`p${i}`}>
                    <Trace as='circle' tone='main' cx={x} cy={y - 18} r={17} />
                    <Trace tone='main' d={`M${x - 32} ${y + 36} Q${x} ${y - 4} ${x + 32} ${y + 36}`} />
                </g>
            ))}
            </g>
            <Node cx={300} cy={313} r={7} />
            <Node cx={q(300 + 250 * Math.cos(-0.4))} cy={q(313 + 250 * Math.sin(-0.4))} soft />
        </Canvas>
    );
}

/* Merchandising & events — a spotlight on a stage */
export function SpotlightGlyph() {
    return (
        <Canvas>
            <g className='jx-sway jx-loop' style={{ '--ox': '300px', '--oy': '40px', '--amp': '9deg' }}>
            <Trace tone='mid' d='M300 40 L120 470' comet />
            <Trace tone='mid' d='M300 40 L480 470' comet delay={0.6} />
            <Trace tone='dim' d='M300 40 L210 470 M300 40 L390 470' />
            <Trace as='ellipse' tone='main' cx={300} cy={470} rx={180} ry={46} comet delay={1.2} />
            <Trace as='ellipse' tone='dim' cx={300} cy={470} rx={110} ry={26} />
            </g>
            <Trace as='ellipse' tone='dim' cx={300} cy={540} rx={270} ry={52} />
            <Trace tone='main' d='M260 470 L260 410 L340 410 L340 470 M260 410 L290 390 L370 390 L340 410 M370 390 L370 450 L340 470' />
            <Node cx={300} cy={40} r={7} />
            <Node cx={120} cy={470} soft />
            <Node cx={480} cy={470} soft />
        </Canvas>
    );
}

/* Products — nested isometric cubes */
export function CubeGlyph() {
    const cube = (cx, cy, s) => {
        const h = q(s * 0.58);
        const top = `M${cx} ${cy - s} L${cx + s} ${cy - s + h} L${cx} ${cy - s + 2 * h} L${cx - s} ${cy - s + h} Z`;
        const sides = `M${cx - s} ${cy - s + h} L${cx - s} ${cy + h} L${cx} ${cy + 2 * h} L${cx + s} ${cy + h} L${cx + s} ${cy - s + h} M${cx} ${cy - s + 2 * h} L${cx} ${cy + 2 * h}`;
        return [top, sides];
    };
    const [outerTop, outerSides] = cube(300, 250, 210);
    const [innerTop, innerSides] = cube(300, 270, 100);
    return (
        <Canvas>
            <Trace tone='main' d={outerTop} comet />
            <Trace tone='mid' d={outerSides} comet delay={0.8} />
            <g className='jx-float jx-loop'>
                <Trace tone='mid' d={innerTop} comet delay={1.6} />
                <Trace tone='mid' d={innerSides} />
            </g>
            <Trace tone='dim' d='M300 40 L300 170 M90 162 L200 222 M510 162 L400 222' />
            <Node cx={300} cy={40} r={7} />
            <Node cx={90} cy={162} soft />
            <Node cx={510} cy={162} soft />
        </Canvas>
    );
}

/* Vision — a horizon: perspective lines run to a vanishing point while a
   sun of arcs rises over it; light travels toward the future. */
export function HorizonGlyph() {
    const vp = [300, 360];
    const floor = [-180, -20, 120, 300, 480, 620, 780];
    return (
        <Canvas>
            <Trace tone='main' d='M0 360 L600 360' comet />
            {floor.map((x, i) => (
                <Trace key={x} tone={i === 3 ? 'mid' : 'dim'} d={`M${x} 600 L${vp[0]} ${vp[1]}`} comet={i % 2 === 1} delay={i * 0.35} />
            ))}
            {[70, 125, 185, 255].map((r, i) => (
                <Trace key={r} tone={i % 2 ? 'dim' : 'mid'} d={`M${vp[0] - r} ${vp[1]} A${r} ${r} 0 0 1 ${vp[0] + r} ${vp[1]}`} />
            ))}
            {[0, 1, 2].map(i => (
                <path
                    key={`rise${i}`}
                    d={`M${vp[0] - 290} ${vp[1]} A290 290 0 0 1 ${vp[0] + 290} ${vp[1]}`}
                    className='jx-stroke jx-emit jx-loop'
                    style={{ '--ox': `${vp[0]}px`, '--oy': `${vp[1]}px`, animationDelay: `${1.6 + i * 1.2}s`, strokeWidth: 2 }}
                />
            ))}
            <path d='M120 470 L480 470 M60 530 L540 530' className='jx-stroke jx-stroke--dim' pathLength='1' data-jx='draw' />
            <Node cx={vp[0]} cy={vp[1]} r={7} />
            <Node cx={vp[0]} cy={vp[1] - 185} soft />
        </Canvas>
    );
}

/* Mission — a compass on its target: graduated rings turn in opposite
   directions while the arrow of purpose closes on the centre. */
export function CompassGlyph() {
    const c = 300;
    const ticks = Array.from({ length: 48 }, (_, i) => {
        const a = (i / 48) * Math.PI * 2;
        const r1 = 262;
        const r2 = i % 4 === 0 ? 240 : 252;
        return `M${q(c + r1 * Math.cos(a))} ${q(c + r1 * Math.sin(a))} L${q(c + r2 * Math.cos(a))} ${q(c + r2 * Math.sin(a))}`;
    }).join(' ');
    return (
        <Canvas>
            <g className='jx-spin jx-loop'>
                <path d={ticks} className='jx-stroke jx-stroke--mid' pathLength='1' data-jx='draw' />
            </g>
            <g className='jx-spin jx-spin--rev jx-loop'>
                <Trace as='circle' tone='dim' cx={c} cy={c} r={200} />
                <path d={`M${c} ${c - 214} L${c} ${c - 186} M${c} ${c + 186} L${c} ${c + 214} M${c - 214} ${c} L${c - 186} ${c} M${c + 186} ${c} L${c + 214} ${c}`} className='jx-stroke' pathLength='1' data-jx='draw' />
            </g>
            <Trace as='circle' tone='mid' cx={c} cy={c} r={135} comet />
            <Trace as='circle' tone='dim' cx={c} cy={c} r={70} />
            <Trace tone='dim' d={`M${c - 290} ${c} L${c + 290} ${c} M${c} ${c - 290} L${c} ${c + 290}`} />
            <Trace tone='main' d={`M560 40 L${c + 14} ${c - 14}`} comet delay={0.4} />
            <Trace tone='main' d={`M${c + 14} ${c - 50} L${c + 14} ${c - 14} L${c + 50} ${c - 14}`} />
            <Node cx={c} cy={c} r={8} />
            <Node cx={560} cy={40} soft />
        </Canvas>
    );
}
