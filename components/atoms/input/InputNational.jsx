import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function InputNational({
  place,
  dataAos,
  error,
  cnInput,
  cn,
  label,
  icon,
  KEY,
  register,
  cnLabel,
  setValue,
  trigger,
  watch,
}) {
  const t = useTranslations();
  const [inputValue, setInputValue] = useState("");

  // Format and validate national ID input
  const handleNationalIdInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove non-digit chars
    if (value.length > 10) value = value.slice(0, 10); // limit to 10 digits

    setInputValue(value);
    if (setValue) setValue(KEY, value);

    // Trigger validation after each change
    if (trigger) setTimeout(() => trigger(KEY), 50);
  };

  // Strict national ID validation
  const validateNationalId = (value) => {
    if (!value) return "National ID is required";
    const nationalIdRegex = /^\d{10}$/;
    return nationalIdRegex.test(value)
      ? true
      : "National ID must be exactly 10 digits (e.g., 2514079264)";
  };

  // Watch for external form changes
  useEffect(() => {
    if (watch) {
      const subscription = watch((value) => {
        const currentValue = value[KEY];
        if (currentValue !== inputValue) {
          setInputValue(currentValue || "");
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, KEY, inputValue]);

  // Attach validation rules if register provided
  const enhancedRegister = register
    ? {
        ...register(KEY, {
          required: "National ID is required",
          validate: validateNationalId,
          pattern: {
            value: /^\d{10}$/,
            message: "National ID must be exactly 10 digits (e.g., 2514079264)",
          },
        }),
      }
    : {};

  return (
    <div
      data-aos={dataAos}
      className={`${cn} flex flex-col gap-[5px] relative`}
    >
      {label && (
        <label htmlFor={KEY} className={`text16 ${cnLabel}`}>
          {label}
        </label>
      )}

      <div
        className={`border-b-[#BCBBBF] pointer-events-none w-full overflow-hidden border-b-[1px] relative h-[45px] ${cnInput}`}
      >
        <input
          className={`pointer-events-auto placeholder:capitalize focus:border-primary1 text16 w-full ${
            icon ? "rtl:pr-[40px] ltr:pl-[40px]" : "px-[10px]"
          } bg-transparent h-full outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          {...enhancedRegister}
          value={inputValue}
          onChange={handleNationalIdInput}
          id={KEY}
          placeholder={place}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={10}
        />
        {icon && (
          <Image
            className="absolute rtl:right-[10px] ltr:left-[10px] top-[50%] translate-y-[-50%]"
            src={icon}
            alt=""
            width={20}
            height={20}
          />
        )}
      </div>

      <div className="text-xs text-gray-500 mt-1">
        Format: 10 digits (e.g., 2514079264)
      </div>

      {error && (
        <div className="error absolute text-red-500">{t(error?.message)}</div>
      )}
    </div>
  );
}
