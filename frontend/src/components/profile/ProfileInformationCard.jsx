import { Formik, Form } from "formik";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";
import { useState } from "react";

import CustomButton from "../button/CustomButton";

import { formStyle } from "../../utils/formStyle";
import updateProfileSchema from "../../schemas/updateProfileSchema";

import formatDateForDisplay from "../../utils/formatDateForDisplay";
import ProfileInfoRow from "./ProfileInfoRow";

import axiosAuthInstance from "../../api/axiosAuthInstance";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import formatDateForInput from "../../utils/formatDateForInput";

export default function ProfileInformationCard({
    profile,
    setProfile,
    isOwnProfile,
    isLoading}) {

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    if (isLoading) {
        return (
            <section className={formStyle}>
                <div className="
                    mb-8
                    flex
                    items-start
                    gap-4">

                    <div className="
                        hidden
                        h-10
                        w-35
                        animate-pulse
                        rounded-lg
                        bg-gray-200
                        dark:bg-gray-700
                        md:block"
                    />

                    <div className="
                        h-8
                        flex-1
                        animate-pulse
                        rounded-lg
                        bg-gray-200
                        dark:bg-gray-700"
                    />

                    <div className="
                        h-10
                        w-35
                        animate-pulse
                        rounded-lg
                        bg-gray-200
                        dark:bg-gray-700"
                    />
                </div>

                <div className="space-y-6">

                    {[...Array(6)].map((_, index) => (
                        <div className="
                            grid
                            gap-2
                            md:grid-cols-[180px_1fr]"
                            key={index}>

                            <div className="
                                h-6
                                w-32
                                animate-pulse
                                rounded
                                bg-gray-200
                                dark:bg-gray-700"
                            />

                            <div className="
                                h-6
                                w-full
                                animate-pulse
                                rounded
                                bg-gray-200
                                dark:bg-gray-700"
                            />

                        </div>
                    ))}

                </div>
            </section>
        );
    }

    return (
        <Formik enableReinitialize
            initialValues={{
                name: profile?.name || "",
                email: profile?.email || "",
                contact_number: profile?.contact_number || "",
                date_of_birth: formatDateForInput(profile?.date_of_birth),
                street_address: profile?.street_address || "",
                city: profile?.city || "",
            }}
            validationSchema={updateProfileSchema}
            onSubmit={async (values) => {
                try {
                    setIsSaving(true);

                    const response = await axiosAuthInstance.put(
                            "/update-profile",
                            values
                        );

                    setProfile(
                        response.data.data
                    );

                    setIsEditing(false);

                    showSuccessToast(
                        response.data.message ||
                        "Profile updated successfully"
                    );
                } catch (error) {
                    showErrorToast(
                        error.response?.data?.message ||
                        "Failed to update profile"
                    );
                } finally {
                    setIsSaving(false);
                }
            }}>
            {({
                values,
                resetForm,
            }) => (
                <Form className={formStyle}>
                    <div className="
                        mb-8
                        flex
                        items-start
                        gap-4">

                        <div className={`
                            ${isEditing ? "hidden" : "hidden md:block"}
                            w-35
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
                            <span className="block 
                                sm:inline">
                                {" "}Information
                            </span>
                        </h2>


                        {!isEditing && isOwnProfile && (
                            <div className="
                                justify-self-end 
                                md:col-start-3">
                                <CustomButton className="w-35"
                                    primaryButton={false}
                                    icon={<FiEdit2 />}
                                    onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </CustomButton>
                            </div>
                        )}

                        {!isOwnProfile && (
                            <div className="
                                justify-self-end 
                                md:col-start-3
                                w-35"
                            />
                        )}
                    </div>

                    <div className="space-y-6">
                        <ProfileInfoRow label="Full Name"
                            fieldName="name"
                            value={values.name}
                            isEditing={isEditing}
                        />

                        <ProfileInfoRow label="Email"
                            fieldName="email"
                            fieldType="email"
                            value={values.email}
                            isEditing={isEditing}
                        />

                        <ProfileInfoRow label="Contact Number"
                            fieldName="contact_number"
                            value={values.contact_number}
                            isEditing={isEditing}
                        />

                        <ProfileInfoRow label="Date of Birth"
                            fieldName="date_of_birth"
                            fieldType="date"
                            value={formatDateForDisplay(values.date_of_birth)}
                            isEditing={isEditing}
                        />

                        <ProfileInfoRow label="Street Address"
                            fieldName="street_address"
                            value={values.street_address}
                            isEditing={isEditing}
                            isMultiLineField={true}
                        />

                        <ProfileInfoRow label="City"
                            fieldName="city"
                            value={values.city}
                            isEditing={isEditing}
                        />
                                                                      
                        {isEditing && (
                            <div className="
                                flex
                                justify-end
                                gap-3
                                pt-4">
                                <CustomButton className="w-25"
                                    dangerButton={true}
                                    icon={<FiX />}
                                    onClick={() => {

                                        resetForm();

                                        setIsEditing(false);

                                    }}>
                                    Cancel
                                </CustomButton>

                                <CustomButton className="
                                    w-35"
                                    type="submit"
                                    disabled={isSaving}
                                    icon={<FiSave />}>
                                    {isSaving
                                        ? "Saving..."
                                        : "Save Profile"
                                    }
                                </CustomButton>
                            </div>
                        )}

                    </div>
                </Form>
            )}
        </Formik>
    );
}