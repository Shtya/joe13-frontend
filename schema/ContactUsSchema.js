
import * as yup from 'yup'


export const ContactUsSchema = yup.object({
  name: yup.string().required("errors.fullName"),
  phone: yup.string().required("errors.phone"),
  email: yup.string().email("errors.invalidEmail").required("errors.email"),
})