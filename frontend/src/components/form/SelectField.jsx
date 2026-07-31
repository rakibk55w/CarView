import { Field, useField } from "formik";
import {
    normalFieldStyle,
    errorFieldStyle,
} from "../../utils/fieldStyles";

export default function SelectField({
    label,
    placeholder = "Select an option",
    options = [],
    ...props
}) {
    const [field, meta] = useField(props);

    const hasError = meta.touched && meta.error;

    return (
        <div>
            <label className="
                mb-2
                block
                font-medium">
                {label}
            </label>

            <Field className={`
                w-full
                cursor-pointer
                rounded-lg
                border
                px-4
                py-2
                outline-none
                transition-colors
                dark:bg-gray-900

                ${
                    hasError
                        ? errorFieldStyle
                        : normalFieldStyle
                }
            `}
                as="select"
                {...field}
                {...props}>

                <option value="">
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option
                        key={option}
                        value={option}>
                        {option}
                    </option>
                ))}
            </Field>

            {hasError && (
                <p className="
                    mt-1
                    text-sm
                    text-red-500">
                    {meta.error}
                </p>
            )}
        </div>
    );
}