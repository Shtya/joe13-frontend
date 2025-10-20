// components/atoms/input/UploadFile.tsx
import React, { useState, useEffect } from "react";
import { UploadCloudIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function UploadFile({
  place,
  dataAos,
  error,
  watch,
  trigger,
  cn,
  label,
  setValue,
  icon,
  KEY,
  cnLabel,
  accept = "*",
  optional = false,
  maxSize = 10,
}) {
  const t = useTranslations();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // ✅ Check max size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`File size should not exceed ${maxSize} MB`);
      return;
    }

    // ✅ Check accepted file type
    if (accept !== "*" && !selectedFile.type.startsWith(accept.split("/")[0])) {
      alert(`Invalid file type. Please upload a ${accept} file.`);
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setValue(KEY, selectedFile); // Set the file in react-hook-form
    trigger(KEY); // Trigger validation
  };

  // Watch for changes from form reset
  const watchKey = watch?.(KEY);
  useEffect(() => {
    if (watchKey === null || watchKey === undefined) {
      setFile(null);
      setFileName("");
    } else if (watchKey instanceof File) {
      setFile(watchKey);
      setFileName(watchKey.name);
    }
  }, [watchKey]);

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setValue(KEY, null);
    trigger(KEY);
  };

  return (
    <div
      data-aos={dataAos}
      className={`${cn} flex flex-col gap-[5px] relative`}
    >
      <label
        htmlFor={`upload_${KEY}`}
        className={`border-b-[1px] pointer-events-auto px-[10px] pb-[8px] ${
          file ? "border-white" : "border-[#9ca3af]"
        } cursor-pointer w-full h-full flex items-center justify-center`}
      >
        <input
          onChange={handleImage}
          className="pointer-events-auto hidden"
          type="file"
          id={`upload_${KEY}`}
          accept={accept}
        />
        <span
          className={`w-full text-nowrap overflow-hidden text-ellipsis ${
            file ? "text-white" : "text-[#9ca3af]"
          } text16`}
        >
          {fileName || place}
        </span>
        {file ? (
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700 ml-2"
          >
            ✕
          </button>
        ) : (
          <UploadCloudIcon
            className={`${file ? "text-white" : "text-[#9ca3af]"}`}
          />
        )}
      </label>
      {error && <div className="error absolute">{t(error?.message)}</div>}
    </div>
  );
}
