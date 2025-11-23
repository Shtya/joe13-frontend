import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { UploadCloudIcon } from "lucide-react";
import { useValues } from "@/app/context";

export default function UploadFile({
  place,
  dataAos,
  accept = "*",
  error,
  watch,
  trigger,
  cn,
  label,
  setValue,
  icon,
  KEY,
  cnLabel,
}) {
  const t = useTranslations();
  // const [file, setFile] = useState(null);
  const { file, setFile } = useValues();

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setValue(KEY, selectedFile);
    } // ✅ Check accepted file type
    if (accept !== "*" && !selectedFile.type.startsWith(accept.split("/")[0])) {
      alert(`Invalid file type. Please upload a ${accept} file.`);
      return;
    }
  };

  const watchKey = watch?.(KEY);
  useEffect(() => {
    if (watchKey) trigger?.(KEY);
    if (watchKey == undefined) {
      setFile(null);
      setValue(KEY, null);
    }
  }, [watchKey]);

  return (
    <div
      data-aos={dataAos}
      className={`${cn} flex flex-col gap-[5px] relative`}
    >
      <label
        htmlFor="upload"
        className={` border-b-[1px] pointer-events-auto px-[10px] pb-[8px]  ${
          file ? "border-white" : "border-[#9ca3af]"
        } cursor-pointer w-full h-full flex items-center justify-center`}
      >
        <input
          onChange={handleImage}
          className=" pointer-events-auto hidden"
          type="file"
          name=""
          accept={accept}
          id="upload"
        />
        <span
          className={`w-full text-nowrap overflow-hidden text-ellipsis  ${
            file ? "text-white" : "text-[#9ca3af]"
          } text16 `}
        >
          {" "}
          {file?.name || place}{" "}
        </span>
        <UploadCloudIcon
          className={`${file ? "text-white" : "text-[#9ca3af]"}`}
        />
      </label>
      {error && <div className="error absolute  "> {t(error?.message)} </div>}
    </div>
  );
}
