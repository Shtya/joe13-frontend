'use client';

import { Link } from '@/navigation';

const BASE_CLASS =
  'group relative inline-flex h-[58px] items-center justify-center gap-2.5 rounded-[40px] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,#12a0f2_0%,#0c86e0_45%,#086ec0_100%)] px-7 text-[17px] font-semibold text-white transition-all duration-200 ease-out shadow-[0_0_0_1px_rgba(0,0,0,0.25),3px_3px_6px_rgba(0,0,0,0.45),9px_10px_22px_rgba(0,0,0,0.4),-3px_-3px_9px_rgba(80,190,245,0.1),inset_0_1.5px_0_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,30,70,0.35)] hover:-translate-y-[4px] hover:shadow-[0_0_0_1px_rgba(56,197,255,0.55),4px_4px_9px_rgba(0,0,0,0.5),13px_16px_30px_rgba(0,0,0,0.45),-4px_-4px_11px_rgba(80,190,245,0.14),inset_0_1.5px_0_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(0,30,70,0.4),0_0_30px_rgba(0,150,245,0.55)] active:translate-y-[1px] active:shadow-[0_0_0_1px_rgba(0,0,0,0.3),inset_2px_2px_6px_rgba(0,20,50,0.5),inset_-2px_-2px_5px_rgba(90,195,245,0.1)] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-md:h-[50px] max-md:gap-2 max-md:px-6 max-md:text-[15px]';

function ArrowIcon() {
  return (
    <svg
      viewBox='0 0 30 20'
      aria-hidden='true'
      className='relative z-[2] h-[16px] w-[22px] fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round] transition-transform duration-200 group-hover:translate-x-[3px] rtl:rotate-180 rtl:group-hover:-translate-x-[3px] max-md:h-[14px] max-md:w-[19px]'
    >
      <path d='M2 10h24' />
      <path d='M19 3l7 7-7 7' />
    </svg>
  );
}

export default function GlowCtaButton({
  children,
  onClick,
  href,
  type = 'button',
  className = '',
  disabled = false,
}) {
  const classes = `${BASE_CLASS} ${className}`.trim();
  const content = (
    <>
      {/* top rim highlight — crisp, not a gloss sweep, models a real bevel edge */}
      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-7 top-[2px] z-[1] h-px rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)]'
      />
      <span className='relative z-[2] whitespace-nowrap'>{children}</span>
      <ArrowIcon />
      {/* grounding contact shadow — separate blurred ellipse beneath, so the button reads as resting ON the surface, not stuck to it */}
      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-[14%] -bottom-[10px] -z-[1] h-[16px] rounded-[50%] bg-black/45 blur-[9px] transition-all duration-200 group-hover:-bottom-[14px] group-hover:blur-[12px] group-hover:opacity-80'
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}