import * as Yup from "yup";

const updatePasswordSchema = Yup.object({
    current_password: Yup.string()
        .trim()
        .max(255, "Password can have at most 255 characters.")
        .required("Current password is required"),

    new_password: Yup.string()
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
        .required("New password is required"),

    confirm_new_password: Yup.string()
        .trim()
        .required("Please confirm your new password")
        .oneOf(
            [Yup.ref("new_password")],
            "Passwords do not match"
        ),
});

export default updatePasswordSchema;