import * as yup from 'yup'


export const Schema = yup.object({
  
  name            : yup.string().required("offer.error.name") ,
  email           : yup.string().required("offer.error.email") ,
  phone           : yup.string().required("offer.error.phone") ,

})
