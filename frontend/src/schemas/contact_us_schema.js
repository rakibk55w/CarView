import * as Yup from "yup";

const contactUsSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("Please enter a valid email address.")
        .max(255, "Email cannot exceed 255 characters.")
        .required("Email is required."),

    contact_number: Yup.string()
        .trim()
        .transform((value) => (value === "" ? null : value))
        .matches(
            /^[0-9+\-\s()]*$/,
            "Please enter a valid contact number."
        )
        .min(7, "Contact number must be at least 7 characters.")
        .max(20, "Contact number cannot exceed 20 characters.")
        .nullable(),

    subject: Yup.string()
        .trim()
        .min(1, "Subject is required.")
        .max(50, "Subject cannot exceed 50 characters.")
        .required("Subject is required."),

    message: Yup.string()
        .trim()
        .min(1, "Message is required.")
        .max(500, "Message cannot exceed 500 characters.")
        .required("Message is required.")
});

export default contactUsSchema;