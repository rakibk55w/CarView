import * as Yup from "yup";

const updatePasswordSchema = Yup.object({
    current_password: Yup.string()
        .required("Current password is required"),

    new_password: Yup.string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters"),

    confirm_new_password: Yup.string()
        .required("Please confirm your new password")
        .oneOf(
            [Yup.ref("new_password")],
            "Passwords do not match"
        ),
});

export default updatePasswordSchema;