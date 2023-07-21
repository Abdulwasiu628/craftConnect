import * as yup from "yup";

export const createSchema = yup.object().shape({
    craft: yup.string().required("craft is required."),
    product_description: yup.string().required("product description is required."),
    years_of_experience: yup.string().required("years of experience is required."),
    price_rate: yup.string().required("pricd rate is required."),
    contact_details: yup.string().required("contact details is required."),
}); 

