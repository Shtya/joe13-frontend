import * as yup from "yup";

export const Schema = yup.object({
  name: yup.string().min(3).max(50).required("contact-us.error.name"),

  // company: yup
  //   .string()
  //   .min(2)
  //   .max(100)
  //   .required("contact-us.error.company"),

  email: yup.string().email().required("contact-us.error.email"),

  phone: yup
    .string()
    .matches(/^\+*[0-9]{10,15}$/, "contact-us.error.phone")
    .required("contact-us.error.phone"),

  address_en: yup.string().min(4).required("contact-us.error.address"),

  // object: yup
  //   .string()
  //   .min(5)
  //   .required("contact-us.error.object"),

  address_ar: yup.string().min(4).required("contact-us.error.message"),
});
