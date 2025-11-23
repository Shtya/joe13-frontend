import * as yup from "yup";

export const Schema = yup.object({
  email: yup.string().required("sign_in.error.email"),
  password: yup.string().required("sign_in.error.password"),
});
