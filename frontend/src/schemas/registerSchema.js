import * as Yup from "yup";

const registerSchema = Yup.object({
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

    password: Yup.string()
        .trim()
        .min(8, "Password must be at least 8 characters.")
        .max(255, "Password can have at most 255 characters.")
        .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter."
        )
        .matches(
            /[a-z]/,
            "Password must contain at least one lowercase letter."
        )
        .matches(
            /[0-9]/,
            "Password must contain at least one number."
        )
        .matches(
            /[^A-Za-z0-9]/,
            "Password must contain at least one special character."
        )
        .required("Password is required."),

    confirm_password: Yup.string()
        .oneOf(
            [Yup.ref("password")],
            "Passwords must match."
        )
        .required("Please confirm your password."),
});

export default registerSchema;