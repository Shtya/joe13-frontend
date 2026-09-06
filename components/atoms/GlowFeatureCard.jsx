'use client';

import LandingIcon from '@/components/atoms/LandingIcon';

export function GlowFeatureGrid({ children, className = '' }) {
  return (
    <div
      role='list'
      className={`mt-8 grid w-full max-w-[680px] grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 max-md:mt-[22px] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export default function GlowFeatureCard({ icon, src, children, className = '' }) {
  return (
    <article
      role='listitem'
      className='group relative flex min-h-[164px] flex-col items-center rounded-[16px] bg-[#0f2038] px-2.5 pt-[14px] transition-all duration-200 ease-out shadow-[9px_9px_18px_rgba(2,7,15,0.55),-7px_-7px_16px_rgba(64,150,210,0.05),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.35)] hover:-translate-y-[3px] hover:shadow-[13px_13px_26px_rgba(2,7,15,0.6),-9px_-9px_20px_rgba(64,150,210,0.06),inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-1px_0_rgba(0,0,0,0.4),0_0_0_1px_rgba(56,197,255,0.3),0_0_28px_rgba(45,180,255,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 max-md:min-h-[140px] max-md:rounded-[14px] max-md:pt-3'
    >
      {/* icon socket — embossed into the panel, original 78px/62px size */}
      <div className='relative z-[2] flex size-[78px] shrink-0 items-center justify-center rounded-[16px] bg-[#0c1a30] shadow-[inset_4px_4px_9px_rgba(2,7,15,0.65),inset_-3px_-3px_7px_rgba(70,150,210,0.05)] transition-shadow duration-200 group-hover:shadow-[inset_3px_3px_7px_rgba(2,7,15,0.55),inset_-2px_-2px_6px_rgba(80,190,255,0.1)] max-md:size-[62px]'>
        {/* top-edge bevel catch-light */}
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-[10%] top-0 h-px rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]'
        />
        <div className='relative z-[1] scale-[1.3] flex size-[100%] items-center justify-center transition-transform duration-200 group-hover:scale-[1.06]'>
          {src ? <LandingIcon src={src} /> : icon}
        </div>
      </div>

      <span
        className={`relative z-[2] mt-3 whitespace-pre-line text-center text-[14px] font-medium leading-[1.28] tracking-[-0.2px] text-[#eaf4ff] max-md:mt-2 max-md:text-[11px] ${className}`.trim()}
      >
        {children}
      </span>

      {/* base-edge highlight, appears on hover */}
      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-4 bottom-[3px] z-[2] h-px rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100'
      />
    </article>
  );
}