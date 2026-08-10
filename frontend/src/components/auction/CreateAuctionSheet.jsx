import { Form, Formik } from "formik";
import { FiSave, FiX } from "react-icons/fi";


import PopupSheet from "../common/PopupSheet";
import FormSection from "../form/FormSection";
import FormField from "../form/FormField";
import CustomButton from "../button/CustomButton";
import CarSelectorField from "../car/CarSelectorField";

import axiosAuthInstance from "../../api/axiosAuthInstance";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { createAuctionSchema, initialCreateAuctionValues } from "../../schemas/createAuctionSchema";

export default function CreateAuctionSheet({
    isOpen,
    onClose,
    onSuccess
}) {
    return (
        <PopupSheet isOpen={isOpen}>
            <Formik
                initialValues={initialCreateAuctionValues}
                validationSchema={createAuctionSchema}
                onSubmit={async (values, {resetForm}) => {
                    const requestPayload = { 
                        car_id: values.carId, 
                        base_price: values.basePrice, 
                        start_time: values.startTime, 
                        end_time: values.endTime
                    };

                    try {
                        const response = await axiosAuthInstance.post(
                            "/create-auction",
                            requestPayload
                        );

                        showSuccessToast(
                            response.data.message || "Auction created successfully."
                        );
                    } catch (error) {
                        showErrorToast(error.response?.data?.message || "Failed to create auction. Please try again.");
                        return;
                    }

                    resetForm();
                    onSuccess?.();
                    onClose();
                }}>
                    {({
                        isSubmitting,
                        resetForm
                    }) => {
                        return (
                            <Form className="space-y-5">
                                <div>
                                    <h2 className="
                                        pt-6
                                        text-center
                                        text-3xl
                                        font-bold
                                        text-primary-600">

                                        Create New Auction
                                    </h2>
                                </div>
                                <FormSection title="Car Selection">
                                    <div className="
                                        md:col-span-2">

                                        <CarSelectorField
                                            label="Car"
                                            name="carId"
                                        />
                                    </div>
                                </FormSection>
                                <FormSection title="Auction Details">
                                    <div className="
                                        md:col-span-2">
                                            
                                        <FormField
                                            label="Base Price"
                                            name="basePrice"
                                            numberFormat
                                            placeholder="Enter base price"
                                        />
                                    </div>

                                    <FormField
                                        label="Start Time"
                                        name="startTime"
                                        type="datetime-local"
                                    />

                                    <FormField
                                        label="End Time"
                                        name="endTime"
                                        type="datetime-local"
                                    />
                                </FormSection>

                                <div className="
                                    sticky
                                    bottom-0
                                    -mx-5
                                    pb-3
                                    border-t
                                    border-gray-200
                                    bg-white
                                    px-5
                                    pt-3
                                    shadow-2xl
                                    dark:border-gray-700
                                    dark:bg-gray-800
                                    sm:-mx-8
                                    sm:px-8">

                                    <div className="
                                        flex
                                        flex-col-reverse
                                        gap-3
                                        sm:flex-row
                                        sm:justify-end">

                                        <CustomButton className="
                                            w-full
                                            px-4
                                            sm:w-auto"
                                            type="button"
                                            dangerButton={true}
                                            icon={<FiX />}
                                            disabled={isSubmitting}
                                            onClick={() => {
                                                resetForm();
                                                onClose();
                                            }}>

                                            Cancel
                                        </CustomButton>

                                        <CustomButton className="
                                            w-full
                                            px-4
                                            sm:w-auto"
                                            type="submit"
                                            icon={<FiSave />}
                                            disabled={isSubmitting}>

                                            {isSubmitting
                                                ? "Creating Auction..."
                                                : "Create Auction"}
                                        </CustomButton>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
        </PopupSheet>
    );
}