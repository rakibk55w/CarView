import { Formik, Form } from "formik";
import { useState } from "react";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";

import FormField from "../form/FormField";
import CustomButton from "../button/CustomButton";

import { formStyle } from "../../utils/formStyle";

import updatePasswordSchema from "../../schemas/updatePasswordSchema";
import formatTimeAgo from "../../utils/formatTimeAgo";

import axiosAuthInstance from "../../api/axiosAuthInstance";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

export default function ProfileSecurityCard({
    profile,
    setProfile
}) {

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    return (
        <Formik
            initialValues={{
                current_password: "",
                new_password: "",
                confirm_new_password: ""
            }}
            validationSchema={updatePasswordSchema}
            onSubmit={async (
                values,
                { resetForm }
            ) => {
                try {
                    setIsSaving(true);

                    const response = await axiosAuthInstance.patch(
                        "/update-password",
                        {
                            current_password: values.current_password,
                            new_password: values.new_password
                        }
                    );

                    setProfile((currentProfile) => ({
                        ...currentProfile,
                        password_updated_at:
                            response.data.data.password_updated_at,
                    }));

                    resetForm();

                    setIsEditing(false);

                    showSuccessToast(
                        response.data.message ||
                        "Password changed successfully"
                    );

                } catch (error) {
                    showErrorToast(
                        error.response?.data?.message ||
                        "Failed to change password"
                    );
                } finally {
                    setIsSaving(false);
                }

            }}>
            {({
                resetForm
            }) => (
                <Form className={formStyle}>

                    <div className="
                        mb-8
                        flex
                        items-start
                        gap-4">

                        <div className={`
                            ${isEditing ? "hidden" : "hidden md:block"}
                            w-45
                            shrink-0`}
                        />

                        <h2 className="
                            flex-1
                            text-left
                            text-2xl
                            font-semibold
                            leading-tight
                            md:text-center">
                            Profile
                            <span className="
                                block
                                sm:inline">
                                {" "}Security
                            </span>
                        </h2>

                        {!isEditing && (
                            <CustomButton
                                className="w-45"
                                primaryButton={false}
                                icon={<FiEdit2 />}
                                onClick={() => setIsEditing(true)}>
                                Update Password
                            </CustomButton>
                        )}

                    </div>

                    {!isEditing ? (
                        <>

                            <div>

                                <p className="
                                    mb-2
                                    font-medium">
                                    Password
                                </p>

                                <p>
                                    •••••
                                </p>

                            </div>

                            <p className="
                                mt-3
                                text-sm
                                text-gray-500
                                dark:text-gray-400">
                                Password last changed{" "}
                                {formatTimeAgo(profile?.password_updated_at)}
                            </p>

                        </>
                    ) : (
                        <div className="space-y-6">

                            <FormField
                                label="Current Password"
                                name="current_password"
                                type="password"
                                passwordToggle={true}
                            />

                            <FormField
                                label="New Password"
                                name="new_password"
                                type="password"
                                passwordToggle={true}
                            />

                            <FormField
                                label="Confirm New Password"
                                name="confirm_new_password"
                                type="password"
                                passwordToggle={true}
                            />

                            <div className="
                                flex
                                justify-end
                                gap-3
                                pt-4">

                                <CustomButton
                                    className="w-25"
                                    dangerButton={true}
                                    icon={<FiX />}
                                    onClick={() => {

                                        resetForm();

                                        setIsEditing(false);

                                    }}>
                                    Cancel
                                </CustomButton>

                                <CustomButton
                                    className="w-40"
                                    type="submit"
                                    disabled={isSaving}
                                    icon={<FiSave />}>
                                    {isSaving
                                        ? "Saving..."
                                        : "Save Password"
                                    }
                                </CustomButton>

                            </div>

                        </div>
                    )}

                </Form>
            )}
        </Formik>
    );
}