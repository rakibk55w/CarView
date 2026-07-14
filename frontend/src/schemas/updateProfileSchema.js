import * as Yup from "yup";

const updateProfileSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, "Name must be at least 3 characters.")
        .max(100),

    email: Yup.string()
        .trim()
        .email("Please enter a valid email.")
        .max(100),

    contact_number: Yup.string()
        .matches(
            /^[0-9+\-\s()]*$/,
            "Invalid contact number."
        )
        .min(7)
        .max(20),

    date_of_birth: Yup.date()
        .max(new Date(), "Date of birth cannot be in the future.")
        .nullable(),

    street_address: Yup.string()
        .max(255),

    city: Yup.string()
        .max(100),
});

export default updateProfileSchema;