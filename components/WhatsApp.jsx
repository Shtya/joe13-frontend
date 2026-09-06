import LandingIcon from '@/components/atoms/LandingIcon';
import Link from 'next/link';

const WhatsApp = () => {
  return (
    <Link
      target='_blank'
      href='https://api.whatsapp.com/send?phone=966570002013'
      aria-label='WhatsApp'
      rel='noopener noreferrer'
      className='whatsapp fixed bottom-[clamp(22px,2.8vh,32px)] z-[10000] flex size-[52px] items-center justify-center transition duration-[250ms] ease-out hover:scale-[1.07] motion-reduce:transition-none max-md:bottom-4 max-md:size-[46px] max-[390px]:size-[42px] end-[clamp(16px,2vw,28px)] max-md:end-3'
    >
      <LandingIcon src='/landing/whatsapp icon.png' />
    </Link>
  );
};

export default WhatsApp;
