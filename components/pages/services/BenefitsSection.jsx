import Button from '@/components/atoms/Button';
import { baseImage } from '@/helpers/baseUrl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';


export default function BenefitsSection({data , locale}) {
  const t = useTranslations()

  return (
    <section className="py-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        <div>
          <h2  data-aos="fade-up"  className="text-xl lg:text-4xl font-bold mb-4"> {data?.title?.[locale]}  </h2>
          <p   data-aos="fade-up" data-aos-delay={100} className=" text-base lg:text-lg text-gray-400 mb-8"> {data?.subTitle?.[locale]}  </p>
          <ul className="space-y-4 mb-10">
            {data?.feature.map((benefit, index) => (
              <li data-aos="fade-up" data-aos-delay={`${index + 2}00`} key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 btn-blue-3d rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.63582 16.4984C9.20725 16.4984 8.54297 16.2913 7.90726 15.2484L6.65011 13.2127C6.52868 13.0127 6.15725 12.8198 5.92868 12.8341L3.54294 12.9556C2.11437 13.027 1.61441 12.4341 1.43583 12.077C1.25726 11.7198 1.10009 10.9556 2.02866 9.86985L3.44297 8.227C3.58583 8.05557 3.66438 7.68412 3.6001 7.46984L2.87866 5.16271C2.51438 4.00556 2.92152 3.38414 3.19295 3.11271C3.46438 2.84128 4.09295 2.44841 5.2501 2.83413L7.35725 3.52699C7.5501 3.59127 7.90725 3.53413 8.07153 3.41985L10.2715 1.83413C11.2787 1.10556 12.0072 1.29842 12.3429 1.47699C12.6787 1.65556 13.2501 2.14129 13.2287 3.38414L13.1786 6.09127C13.1715 6.29127 13.3358 6.61984 13.4929 6.74127L15.2644 8.08413C16.2287 8.81985 16.2644 9.55556 16.2001 9.93413C16.1358 10.3127 15.8501 10.9984 14.693 11.3556L12.3858 12.077C12.1715 12.1413 11.9072 12.4198 11.8501 12.6341L11.3001 14.7341C10.9358 16.1127 10.2215 16.4198 9.82154 16.477C9.77154 16.4913 9.70725 16.4984 9.63582 16.4984ZM5.95008 11.7627C6.56437 11.7627 7.24294 12.1341 7.55722 12.6484L8.81437 14.6841C9.17152 15.2698 9.49295 15.4484 9.66438 15.4198C9.82866 15.3984 10.0858 15.127 10.2644 14.4698L10.8144 12.3698C10.9644 11.7984 11.5001 11.2341 12.0644 11.0627L14.3715 10.3413C14.8144 10.2056 15.1001 9.98413 15.1429 9.75556C15.1858 9.52699 14.9858 9.227 14.6144 8.94128L12.843 7.59842C12.4072 7.26985 12.093 6.6127 12.1001 6.06984L12.1501 3.36269C12.1573 2.88412 12.043 2.527 11.8358 2.41985C11.6287 2.31271 11.2787 2.41984 10.8858 2.69841L8.68581 4.28413C8.25009 4.59841 7.52868 4.71271 7.00725 4.54128L4.9001 3.84842C4.45724 3.70557 4.10012 3.71269 3.93583 3.87698C3.77155 4.04127 3.75722 4.39841 3.89293 4.84127L4.61437 7.14842C4.79294 7.71271 4.63579 8.477 4.25008 8.91986L2.83581 10.5627C2.38581 11.0841 2.31438 11.4484 2.39295 11.5984C2.46438 11.7484 2.80726 11.9127 3.48583 11.877L5.87152 11.7555C5.90009 11.7627 5.92865 11.7627 5.95008 11.7627Z" fill="white"/><path d="M15.9931 16.6773C15.8574 16.6773 15.7217 16.6273 15.6146 16.5201L13.4503 14.3559C13.2431 14.1487 13.2431 13.8059 13.4503 13.5987C13.6574 13.3916 14.0003 13.3916 14.2074 13.5987L16.3717 15.763C16.5789 15.9701 16.5789 16.313 16.3717 16.5201C16.2646 16.6273 16.1288 16.6773 15.9931 16.6773Z" fill="white"/></svg>
                </div>
                <span className="text-white text-sm lg:text-xl ">{benefit?.[locale]}</span>
              </li>
            ))}
          </ul>
          <div data-aos="fade-up" data-aos-delay={`500`} > <Button name={t("contact-us-now")}  href="/contact-us" cn="text-white px-6 py-3 btn-blue-3d hover:!scale-[.95] duration-300 rounded-[30px] transition"> </Button> </div>
        </div>

        {/* Right: Image */}
        <div data-aos="zoom-out" data-aos-delay={`200`} className="rounded-3xl overflow-hidden">
          <Image
            src={baseImage(data?.image?.url)} 
            alt={data?.image?.alt}
            width={700}
            height={500}
            className="object-cover w-[700px] h-[500px]"
          />
        </div>
      </div>
    </section>
  );
}
