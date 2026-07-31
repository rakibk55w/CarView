import { Field } from "formik";

export default function CheckboxField({
    label,
    ...props
}) {
    return (
        <label className="
            flex
            cursor-pointer
            items-center
            gap-3
            rounded-lg
            border
            border-gray-200
            px-4
            py-3
            transition-colors
            dark:border-gray-700">

            <Field className="
                h-5
                w-5
                cursor-pointer
                accent-primary-600"
                type="checkbox"
                {...props}
            />

            <span>
                {label}
            </span>
        </label>
    );
}