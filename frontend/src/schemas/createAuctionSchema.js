import * as Yup from "yup";

export const initialCreateAuctionValues = {
    carId: "",
    basePrice: "",
    startTime: "",
    endTime: "",
};

export const createAuctionSchema = Yup.object({
    carId: Yup.string()
        .required("Please select a car."),

    basePrice: Yup.number()
        .typeError("Base price must be number.")
        .integer(
            "Base price must be a whole number."
        )
        .min(
            1,
            "Base price must be at least 1."
        )
        .required("Base price is required."),

    startTime: Yup.date()
        .typeError("Start time must be a valid date and time.")
        .min(new Date(), "Start time cannot be in the past.")
        .required("Start time is required."),

    endTime: Yup.date()
        .typeError("End time must be a valid date and time.")
        .test(
            "is-after-start",
            "End time must be after the start time.",
            function (endTime) {
                const { startTime } = this.parent;

                if (!startTime || !endTime) {
                    return true;
                }

                return new Date(endTime) > new Date(startTime);
            }
        )
        .required("End time is required."),
});