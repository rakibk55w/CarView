import { Formik, Form } from "formik";
import { useState } from "react";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";

import FormField from "../form/FormField";
import CustomButton from "../button/CustomButton";

import { formStyle } from "../../utils/formStyle";

import updatePasswordSchema from "../../schemas/updatePasswordSchema";
import formatTimeAgo from "../../utils/formatTimeAgo";

export default function ProfileSecurityCard({
    profile
}) {

    const [isEditing, setIsEditing] = useState(false);

    return (
        <Formik
            initialValues={{
                current_password: "",
                new_password: "",
                confirm_new_password: ""
            }}
            validationSchema={updatePasswordSchema}
            onSubmit={(values) => {

                console.log(values);

                // TODO:
                // axios.patch(...)

                setIsEditing(false);

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
                                {formatTimeAgo(profile.password_updated_at)}
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
                                    icon={<FiSave />}>
                                    Save Password
                                </CustomButton>

                            </div>

                        </div>
                    )}

                </Form>
            )}
        </Formik>
    );
}