import { useField } from "formik";
import { normalFieldStyle, errorFieldStyle } from "../../utils/fieldStyles";

function FormField({
    label,
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

            <input className={`
                w-full
                rounded-lg
                border
                px-4
                py-2
                outline-none
                transition-colors

                ${
                    hasError ? 
                        errorFieldStyle
                        : normalFieldStyle
                }

                dark:bg-gray-900`}
                {...field}
                {...props}
            />

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

export default FormField;