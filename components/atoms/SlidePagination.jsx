'use client';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[rgba(16,164,255,0.95)]';

export default function SlidePagination({
  current = 1,
  total = 1,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  className = '',
}) {
  const cur = String(Math.max(1, current)).padStart(2, '0');
  const tot = String(Math.max(1, total)).padStart(2, '0');

  return (
    <div className={`flex h-7 items-center gap-[9px] ${className}`}>
      <span className='me-1.5 h-[3px] w-[43px] rounded-[2px] bg-[linear-gradient(90deg,#08a7fa,#0879ea)] shadow-[0_0_7px_rgba(0,151,255,0.45)]' />
      <span className='text-[13px] font-normal text-[#dbeaff]'>{cur}</span>
      <span className='text-[13px] text-[rgba(164,190,214,0.65)]'>/</span>
      <span className='text-[13px] text-[#829bb2]'>{tot}</span>
      <button
        type='button'
        aria-label={prevLabel}
        onClick={onPrev}
        className={`${FOCUS} ms-0.5 flex size-[27px] items-center justify-center rounded-full border border-[rgba(95,145,183,0.72)] bg-[rgba(3,19,34,0.55)] text-[#7eb9e8] transition-[background,border-color,color] duration-200 hover:border-[rgba(18,158,246,0.9)] hover:bg-[rgba(7,102,178,0.35)] hover:text-white`}
      >
        <svg viewBox='0 0 24 24' className='size-3.5 fill-none stroke-current stroke-[1.4] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180'>
          <path d='M15 6 9 12l6 6' />
        </svg>
      </button>
      <button
        type='button'
        aria-label={nextLabel}
        onClick={onNext}
        className={`${FOCUS} flex size-[27px] items-center justify-center rounded-full border border-[rgba(95,145,183,0.72)] bg-[rgba(3,19,34,0.55)] text-[#7eb9e8] transition-[background,border-color,color] duration-200 hover:border-[rgba(18,158,246,0.9)] hover:bg-[rgba(7,102,178,0.35)] hover:text-white`}
      >
        <svg viewBox='0 0 24 24' className='size-3.5 fill-none stroke-current stroke-[1.4] [stroke-linecap:round] [stroke-linejoin:round] rtl:rotate-180'>
          <path d='m9 6 6 6-6 6' />
        </svg>
      </button>
    </div>
  );
}
