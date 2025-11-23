import { SchemaJoinUs } from "../schema/JoinUsSchema";
import { api } from "@/helpers/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useValues } from "@/app/context";

export const hookJoinUs = () => {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({ resolver: yupResolver(SchemaJoinUs) });
  const [loading, setisloading] = useState(false);
  const t = useTranslations();

  const { file, setFile } = useValues();
  const submit = handleSubmit(async (data) => {
    setisloading(true);
    const formData = new FormData();
    formData.append("type", "career");
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("phone", data?.phone);
    formData.append("message", data?.national_id);
    formData.append("offers_name", data?.offers_name);
    formData.append("offers_price", data?.offers_price);
    formData.append("address", data?.city);
    formData.append("file", file);
    formData.append("personal_photo", data.personal_photo);

    const toastId = toast.loading(t("submitting"));
    api
      .post("/api/v1/contacts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success(t("contactSuccess"), { id: toastId });
        reset();
      })
      .catch((err) => {
        toast.error(t("contactError"), { id: toastId });
      })
      .finally(() => {
        setisloading(false);
      });
  });

  return {
    loading,
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
  };
};
