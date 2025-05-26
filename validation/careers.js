import * as yup from "yup";

export const Schema = yup.object({
  name: yup.string().required("career.popup.error.name"),
  email: yup.string().required("career.popup.error.email"),
  phone: yup.string().required("career.popup.error.phone"),
  // file: yup.string().required("career.popup.error.cv"),
});
