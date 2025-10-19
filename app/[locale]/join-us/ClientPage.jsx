"use client";
import Button from "@/components/atoms/Button";
import WhyChooseUs from "@/components/pages/join-us/WhyChooseUs";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { hookJoinUs } from "@/hooks/hookJoinUs";
import { usePages } from "@/hooks/usePages";
import { baseImage } from "@/helpers/baseUrl";

export default function page() {
  const { loading: loadingPage, data } = usePages({ page_name: "join-us" });
  const section1 = data?.sections?.find((e) => e.id == "sec1");
  const locale = useLocale();

  const t = useTranslations("JoinUs");
  const listRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false); // State to track if the list is expanded
  const {
    register,
    errors,
    trigger,
    clearErrors,
    setError,
    getValues,
    setValue,
    submit,
    watch,
    reset,
    loading,
  } = hookJoinUs();

  const handleReadMore = () => {
    if (!isExpanded) {
      // Animate the list to show
      gsap.to(listRef.current, {
        height: "auto",
        duration: 0.5,
        opacity: 1,
        ease: "power2.out",
      });
      window.scrollTo(50, 50);
    } else {
      // Animate the list to hide
      window.scrollTo(0, 0);
      gsap.to(listRef.current, {
        height: 0,
        duration: 0.5,
        opacity: 0,
        ease: "power2.in",
      });
    }
    setIsExpanded(!isExpanded);
  };

  if (loadingPage)
    return (
      <div className=" px-[30px] h-screen flex flex-col justify-center items-center gap-[30px]   ">
        <span className="skeleton-box w-full max-w-[400px] h-[40px]  "> </span>
        <div className="flex w-full items-center gap-[5px] justify-center flex-col  ">
          <span className="skeleton-box w-full max-w-[600px] h-[25px]  ">
            {" "}
          </span>
          <span className="skeleton-box w-full max-w-[600px] h-[25px]  ">
            {" "}
          </span>
          <span className="skeleton-box w-full max-w-[600px] h-[25px]  ">
            {" "}
          </span>
        </div>
        <span className="skeleton-box w-full max-w-[200px] h-[40px] rounded-[30px]  ">
          {" "}
        </span>
      </div>
    );

  return (
    <>
      <div className=" py-[50px] section overflow-x-hidden relative min-h-screen w-full flex flex-col gap-[30px] justify-center items-center">
        <div
          className={`fixed w-full h-full top-0 left-0 opacity-100 transition-opacity duration-300 ease-in-out`}
        >
          <Image
            className={` object-cover img-overlay`}
            src={baseImage(section1?.image?.url)}
            alt={section1?.image?.alt}
            layout="fill"
          />
          <div className="bg-overlay"></div>
        </div>

        <div
          data-aos-delay="100"
          className={`  container  z-10 !py-[40px] !px-[60px] flex flex-col gap-[30px] justify-center items-center `}
        >
          <h2
            className={` ${
              isExpanded && "!hidden"
            } text-[40px] max-md:text-[30px] font-[600] text-white`}
          >
            {section1?.title?.[locale]}
          </h2>
          <p
            className={` ${
              isExpanded && "!hidden"
            }  text-[20px] max-md:text-[16px] text-center font-[400] opacity-70 `}
          >
            {section1?.content?.[locale]}
          </p>

          <div
            ref={listRef}
            className="overflow-hidden mt-4 z-10 opacity-0"
            style={{ height: 0 }}
          >
            <WhyChooseUs
              data={section1}
              register={register}
              errors={errors}
              trigger={trigger}
              setValue={setValue}
              submit={submit}
              watch={watch}
              loading={loading}
            />
          </div>

          <div className="flex max-sm:flex-col items-center gap-[20px] justify-center ">
            <Button
              btnStyle="btn-blue-outline"
              disabled={loading}
              loading={loading}
              name={t("sendNow")}
              onClick={submit}
              borderAll={true}
              cn={` ${!isExpanded && "!hidden"}`}
            />
            <Button
              onClick={handleReadMore}
              name={isExpanded ? t("viewLess") : t("viewMore")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
