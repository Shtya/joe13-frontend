
import * as yup from 'yup'


export const SchemaJoinUs = yup.object({
  name: yup.string().required("errors.fullName"),
  phone: yup.string().required("errors.phone"),
  city: yup.string().required("errors.city"),
  email: yup.string().email("errors.invalidEmail").required("errors.email"),
  CV: yup.string().required("errors.CV"),

  offers_name: yup.string().required("errors.nameOffer"),
  offers_price: yup
    .number()
    .typeError("errors.offerPrice1")
    .positive("errors.offerPrice2")
    .required("errors.offerPrice3")
})

