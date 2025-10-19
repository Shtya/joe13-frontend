"use client";
import Input from "@/components/atoms/input/Input";
import InputNational from "@/components/atoms/input/InputNational";
import UploadFile from "@/components/atoms/input/UploadFile";
import Select from "@/components/atoms/select/Select";
import SelectValue from "@/components/atoms/select/SelectValue";
import TextSlide from "@/helpers/TextSlide";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

export const Cities = [
  { name_ar: "الرياض", name_en: "Riyadh", value: "Riyadh" },
  { name_ar: "الخرج", name_en: "Al-Kharj", value: "Al_Kharj" },
  { name_ar: "المجمعة", name_en: "Al-Majma'ah", value: "Al_Majmaah" },
  { name_ar: "الدوادمي", name_en: "Dawadmi", value: "Dawadmi" },
  { name_ar: "الزلفي", name_en: "Al-Zulfi", value: "Al_Zulfi" },
  { name_ar: "شقراء", name_en: "Shaqra", value: "Shaqra" },
  {
    name_ar: "وادي الدواسر",
    name_en: "Wadi Al-Dawasir",
    value: "Wadi_Al_Dawasir",
  },
  { name_ar: "عفيف", name_en: "Afif", value: "Afif" },
  { name_ar: "الغاط", name_en: "Al-Ghat", value: "Al_Ghat" },
  {
    name_ar: "حوطة بني تميم",
    name_en: "Hotat Bani Tamim",
    value: "Hotat_Bani_Tamim",
  },
  { name_ar: "مكة", name_en: "Makkah", value: "Makkah" },
  { name_ar: "جدة", name_en: "Jeddah", value: "Jeddah" },
  { name_ar: "الطائف", name_en: "Taif", value: "Taif" },
  { name_ar: "رابغ", name_en: "Rabigh", value: "Rabigh" },
  { name_ar: "الليث", name_en: "Al-Lith", value: "Al_Lith" },
  { name_ar: "خليص", name_en: "Khulais", value: "Khulais" },
  { name_ar: "الكامل", name_en: "Al-Kamil", value: "Al_Kamil" },
  { name_ar: "الدمام", name_en: "Dammam", value: "Dammam" },
  { name_ar: "الخبر", name_en: "Al-Khobar", value: "Al_Khobar" },
  { name_ar: "الظهران", name_en: "Dhahran", value: "Dhahran" },
  { name_ar: "الأحساء", name_en: "Al-Ahsa", value: "Al_Ahsa" },
  { name_ar: "الجبيل", name_en: "Jubail", value: "Jubail" },
  { name_ar: "القطيف", name_en: "Qatif", value: "Qatif" },
  { name_ar: "رأس تنورة", name_en: "Ras Tanura", value: "Ras_Tanura" },
  { name_ar: "الخفجي", name_en: "Khafji", value: "Khafji" },
  { name_ar: "حفر الباطن", name_en: "Hafar Al-Batin", value: "Hafar_Al_Batin" },
  { name_ar: "النعيرية", name_en: "Al-Nairyah", value: "Al_Nairyah" },
  { name_ar: "المدينة المنورة", name_en: "Madinah", value: "Madinah" },
  { name_ar: "ينبع", name_en: "Yanbu", value: "Yanbu" },
  { name_ar: "بدر", name_en: "Badr", value: "Badr" },
  { name_ar: "العلا", name_en: "Al-Ula", value: "Al_Ula" },
  { name_ar: "خيبر", name_en: "Khaybar", value: "Khaybar" },
  { name_ar: "الحناكية", name_en: "Al-Hanakiyah", value: "Al_Hanakiyah" },
  { name_ar: "بريدة", name_en: "Buraidah", value: "Buraidah" },
  { name_ar: "عنيزة", name_en: "Unaizah", value: "Unaizah" },
  { name_ar: "الرس", name_en: "Al-Rass", value: "Al_Rass" },
  { name_ar: "البكيرية", name_en: "Al-Bukayriyah", value: "Al_Bukayriyah" },
  { name_ar: "المذنب", name_en: "Muthnab", value: "Muthnab" },
  {
    name_ar: "رياض الخبراء",
    name_en: "Riyadh Al-Khabra",
    value: "Riyadh_Al_Khabra",
  },
  { name_ar: "أبها", name_en: "Abha", value: "Abha" },
  { name_ar: "خميس مشيط", name_en: "Khamis Mushait", value: "Khamis_Mushait" },
  { name_ar: "النماص", name_en: "Al-Namas", value: "Al_Namas" },
  { name_ar: "بيشة", name_en: "Bisha", value: "Bisha" },
  { name_ar: "رجال ألمع", name_en: "Rijal Almaa", value: "Rijal_Almaa" },
  {
    name_ar: "ظهران الجنوب",
    name_en: "Dhahran Al-Janub",
    value: "Dhahran_Al_Janub",
  },
  { name_ar: "أحد رفيدة", name_en: "Ahad Rafidah", value: "Ahad_Rafidah" },
  { name_ar: "تبوك", name_en: "Tabuk", value: "Tabuk" },
  { name_ar: "ضباء", name_en: "Duba", value: "Duba" },
  { name_ar: "الوجه", name_en: "Al-Wajh", value: "Al_Wajh" },
  { name_ar: "أملج", name_en: "Umluj", value: "Umluj" },
  { name_ar: "حقل", name_en: "Haql", value: "Haql" },
  { name_ar: "تيماء", name_en: "Tayma", value: "Tayma" },
  { name_ar: "حائل", name_en: "Hail", value: "Hail" },
  { name_ar: "بقعاء", name_en: "Baqa'a", value: "Baqaa" },
  { name_ar: "الشنان", name_en: "Shinan", value: "Shinan" },
  { name_ar: "الغزالة", name_en: "Al-Ghazalah", value: "Al_Ghazalah" },
  { name_ar: "نجران", name_en: "Najran", value: "Najran" },
  { name_ar: "شرورة", name_en: "Sharurah", value: "Sharurah" },
  { name_ar: "حبونا", name_en: "Habuna", value: "Habuna" },
  { name_ar: "جازان", name_en: "Jazan", value: "Jazan" },
  { name_ar: "صبيا", name_en: "Sabya", value: "Sabya" },
  { name_ar: "أبو عريش", name_en: "Abu Arish", value: "Abu_Arish" },
  { name_ar: "بيش", name_en: "Baysh", value: "Baysh" },
  { name_ar: "الدرب", name_en: "Al-Darb", value: "Al_Darb" },
  { name_ar: "صامطة", name_en: "Samtah", value: "Samtah" },
  { name_ar: "الباحة", name_en: "Al-Bahah", value: "Al_Bahah" },
  { name_ar: "المخواة", name_en: "Al-Mikhwah", value: "Al_Mikhwah" },
  { name_ar: "بلجرشي", name_en: "Baljurashi", value: "Baljurashi" },
  { name_ar: "القنفذة", name_en: "Al-Qunfudhah", value: "Al_Qunfudhah" },
  { name_ar: "سكاكا", name_en: "Sakakah", value: "Sakakah" },
  {
    name_ar: "دومة الجندل",
    name_en: "Domat Al-Jandal",
    value: "Domat_Al_Jandal",
  },
  { name_ar: "طبرجل", name_en: "Tabarjal", value: "Tabarjal" },
  { name_ar: "القريات", name_en: "Qurayyat", value: "Qurayyat" },
  { name_ar: "عرعر", name_en: "Arar", value: "Arar" },
  { name_ar: "رفحاء", name_en: "Rafha", value: "Rafha" },
  { name_ar: "طريف", name_en: "Turaif", value: "Turaif" },
  { name_ar: "العويقيلة", name_en: "Al-Uwayqilah", value: "Al_Uwayqilah" },
];

// Positions/Job Titles for offers_name dropdown
export const Positions = [
  { name_ar: "مدير عام", name_en: "General Manager", value: "general_manager" },
  { name_ar: "مدير مبيعات", name_en: "Sales Manager", value: "sales_manager" },
  {
    name_ar: "مدير تسويق",
    name_en: "Marketing Manager",
    value: "marketing_manager",
  },
  { name_ar: "مدير موارد بشرية", name_en: "HR Manager", value: "hr_manager" },
  {
    name_ar: "مدير مالي",
    name_en: "Finance Manager",
    value: "finance_manager",
  },
  {
    name_ar: "مدير تقنية المعلومات",
    name_en: "IT Manager",
    value: "it_manager",
  },
  {
    name_ar: "مهندس برمجيات",
    name_en: "Software Engineer",
    value: "software_engineer",
  },
  { name_ar: "مطور ويب", name_en: "Web Developer", value: "web_developer" },
  {
    name_ar: "مصمم جرافيك",
    name_en: "Graphic Designer",
    value: "graphic_designer",
  },
  {
    name_ar: "أخصائي تسويق",
    name_en: "Marketing Specialist",
    value: "marketing_specialist",
  },
  {
    name_ar: "مندوب مبيعات",
    name_en: "Sales Representative",
    value: "sales_representative",
  },
  {
    name_ar: "أخصائي موارد بشرية",
    name_en: "HR Specialist",
    value: "hr_specialist",
  },
  { name_ar: "محاسب", name_en: "Accountant", value: "accountant" },
  {
    name_ar: "مسؤول علاقات عملاء",
    name_en: "Customer Service Representative",
    value: "customer_service",
  },
  {
    name_ar: "مدير مشاريع",
    name_en: "Project Manager",
    value: "project_manager",
  },
  {
    name_ar: "مهندس شبكات",
    name_en: "Network Engineer",
    value: "network_engineer",
  },
  {
    name_ar: "محلل أعمال",
    name_en: "Business Analyst",
    value: "business_analyst",
  },
  {
    name_ar: "مدير تشغيلي",
    name_en: "Operations Manager",
    value: "operations_manager",
  },
  {
    name_ar: "مدير جودة",
    name_en: "Quality Manager",
    value: "quality_manager",
  },
  {
    name_ar: "فني دعم",
    name_en: "Support Technician",
    value: "support_technician",
  },
  {
    name_ar: "مدير تسويق رقمي",
    name_en: "Digital Marketing Manager",
    value: "digital_marketing_manager",
  },
  { name_ar: "مختص SEO", name_en: "SEO Specialist", value: "seo_specialist" },
  {
    name_ar: "مختص وسائل تواصل اجتماعي",
    name_en: "Social Media Specialist",
    value: "social_media_specialist",
  },
  {
    name_ar: "مطور تطبيقات",
    name_en: "Mobile App Developer",
    value: "mobile_app_developer",
  },
  {
    name_ar: "مدير منتج",
    name_en: "Product Manager",
    value: "product_manager",
  },
  {
    name_ar: "مهندس أمن سيبراني",
    name_en: "Cybersecurity Engineer",
    value: "cybersecurity_engineer",
  },
  { name_ar: "محلل بيانات", name_en: "Data Analyst", value: "data_analyst" },
  { name_ar: "علم بيانات", name_en: "Data Scientist", value: "data_scientist" },
  {
    name_ar: "مدير علاقات عامة",
    name_en: "Public Relations Manager",
    value: "pr_manager",
  },
  {
    name_ar: "مدير مبيعات إقليمي",
    name_en: "Regional Sales Manager",
    value: "regional_sales_manager",
  },
];

export default function WhyChooseUs({
  data,
  register,
  errors,
  trigger,
  setValue,
  watch,
}) {
  const t = useTranslations("JoinUs");
  const locale = useLocale();

  // Use the original arrays directly - they already have the correct structure
  // The Select component should use the 'value' field for storage and 'name_ar/name_en' for display

  return (
    <div className="w-screen">
      <div className="container  md:!px-[40px] ">
        <TextSlide
          cnParent={`w-fit ltr:mr-auto rtl:ml-auto`}
          cn={` text-left w-full text-[35px] max-md:text-[25px] text-white font-[700] `}
          text={data?.list_Object?.[locale]?.[0]?.title}
        />

        <ul
          className={` mx-auto !px-[10px] md:!px-[35px] list-decimal flex flex-col gap-[10px] mt-[30px] `}
        >
          {data?.list_Object?.[locale]?.[0]?.list?.map((item, index) => (
            <li
              key={index}
              className="text-white  opacity-70 text-lg max-md:text-base mb-[10px] font-[500] w-fit "
            >
              <TextSlide text={item} />
            </li>
          ))}
        </ul>

        <TextSlide
          cnParent={`mt-[60px] w-fit ltr:mr-auto rtl:ml-auto mb-[30px] `}
          cn={` text-left   text-[35px] max-md:text-[25px] text-white font-[700] `}
          text={t("applyNow")}
        />

        <form
          className={` pb-[100px] grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-y-[40px] gap-x-[60px]  `}
        >
          <Input
            register={register("name")}
            error={errors?.name}
            type={"text"}
            KEY={"fullName"}
            cnInput={""}
            label={""}
            place={t("fullName")}
          />

          <InputNational
            register={register} // ✅ Pass the function itself
            error={errors?.national_id}
            type={"text"} // Use text type
            KEY={"national_id"}
            cnInput={""}
            label={""}
            place={t("national_id") || "National ID"}
            maxLength={10}
          />

          {/* City Dropdown - will send "Riyadh", "Jeddah", etc. */}
          <SelectValue
            data={Cities}
            icon={true}
            place={t("city")}
            trigger={trigger}
            watch={watch}
            setValue={setValue}
            error={errors?.city}
            KEY={"city"}
            valueField="value" // Make sure Select uses 'value' field
            displayField={locale === "ar" ? "name_ar" : "name_en"} // Display based on locale
          />

          {/* Position Dropdown - will send "general_manager", "software_engineer", etc. */}
          <SelectValue
            data={Positions}
            icon={true}
            place={t("offers_name")}
            trigger={trigger}
            watch={watch}
            setValue={setValue}
            error={errors?.offers_name}
            KEY={"offers_name"}
            valueField="value" // Make sure Select uses 'value' field
            displayField={locale === "ar" ? "name_ar" : "name_en"} // Display based on locale
          />
          <Input
            register={register("email")}
            error={errors?.email}
            type={"email"}
            KEY={"email"}
            cnInput={""}
            label={""}
            place={t("email")}
          />
          <Input
            register={register("phone")}
            error={errors?.phone}
            type={"tel"}
            KEY={"phone"}
            cnInput={""}
            label={""}
            place={t("phoneNumber")}
          />
          <Input
            register={register("offers_price")}
            error={errors?.offers_price}
            type={"number"}
            KEY={"offers_price"}
            cnInput={""}
            label={""}
            place={t("offers_price")}
          />

          <UploadFile
            setValue={setValue}
            watch={watch}
            trigger={trigger}
            error={errors?.CV}
            KEY={"CV"}
            cnInput={""}
            label={""}
            place={t("uploadCV")}
          />
        </form>
      </div>
    </div>
  );
}
