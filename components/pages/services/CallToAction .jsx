import Button from "@/components/atoms/Button";
import { baseImage } from "@/helpers/baseUrl";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CallToAction({data , locale}) {
  const t = useTranslations()

  return (
    <section className="relative py-[70px] ">
      <div className=" flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="max-w-xl">
          <h2 data-aos="fade-up"  className="text-xl md:text-4xl font-bold leading-snug mb-4"> {data?.title?.[locale]} </h2>
          <p  data-aos="fade-up" data-aos-delay={`100`} className="text-gray-400 text-base mb-6"> {data?.subTitle?.[locale]} </p>
          <h3 data-aos="fade-up" data-aos-delay={`200`} className="text-lg md:text-2xl font-semibold mb-6"> {data?.content?.[locale]}  </h3>
          <div data-aos="fade-up" data-aos-delay={`300`} > <Button name={t("contact-us-now")} cn={" hover:scale-[.95] duration-300 "} href={"/contact-us"}  /> </div>
        </div>

        {/* Right Globe with Dot and Popup */}
        <div className="relative w-full " data-aos="zoom-in" data-aos-delay={`100`}>
          <Image
            src={baseImage(data?.image?.url)} 
            alt={data?.image?.alt}
            width={600}
            height={600}
            className="w-full mx-auto h-auto object-contain"
          />

        </div>
      </div>
    </section>
  );
}
