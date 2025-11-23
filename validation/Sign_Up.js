import * as yup from "yup";

export const Schema = yup.object({
  name: yup.string().required("sign_up.error.name"),
  email: yup.string().required("sign_up.error.email"),
  phone: yup.string().required("sign_up.error.phone"),
  password: yup.string().required("sign_up.error.createPassword"),
  c_password: yup.string().required("sign_up.error.confirmPassword"),
});
