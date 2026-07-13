import * as Yup from "yup";

const registerSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, "Name must be at least 3 characters.")
        .max(100)
        .required("Name is required."),

    email: Yup.string()
        .trim()
        .email("Please enter a valid email.")
        .max(255)
        .required("Email is required."),

    password: Yup.string()
        .trim()
        .min(8, "Password must be at least 8 characters.")
        .max(255)
        .required("Password is required."),
});

export default registerSchema;