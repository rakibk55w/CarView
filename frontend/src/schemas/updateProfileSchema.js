import * as Yup from "yup";

const updateProfileSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, "Name must be at least 3 characters.")
        .max(100, "Name can have at most 100 characters.")
        .required("Name is required."),

    email: Yup.string()
        .trim()
        .email("Please enter a valid email.")
        .max(255, "Email can have at most 255 characters.")
        .required("Email is required."),

    contact_number: Yup.string()
        .trim()
        .matches(
            /^[0-9+\-\s()]*$/,
            "Invalid contact number."
        )
        .min(7, "Contact number must be at least 7 characters.")
        .max(20, "Contact number can have at most 20 characters."),

    date_of_birth: Yup.date()
        .max(new Date(), "Date of birth cannot be in the future.")
        .nullable(),

    street_address: Yup.string()
        .trim()
        .max(255, "Address can have at most 255 characters."),

    city: Yup.string()
        .trim()
        .max(100, "City can have at most 100 characters."),
});

export default updateProfileSchema;