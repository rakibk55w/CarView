import { Field, useField } from "formik";
import { normalFieldStyle, errorFieldStyle } from "../../utils/fieldStyles";

export default function TextAreaField({
    label,
    showCharacterCount = false,
    maxLength,
    rows = 6,
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

            <div className="relative">

                <Field className={`
                    w-full
                    resize-none
                    rounded-lg
                    border
                    px-4
                    py-2
                    outline-none
                    transition-colors
                    dark:bg-gray-900

                    ${
                        showCharacterCount
                            ? "pb-8"
                            : ""
                    }

                    ${
                        hasError
                            ? errorFieldStyle
                            : normalFieldStyle
                    }`}
                    as="textarea"
                    {...field}
                    {...props}
                    rows={rows}
                    maxLength={maxLength}
                />

                {showCharacterCount && (
                    <span className="
                        pointer-events-none
                        absolute
                        bottom-2
                        right-3
                        text-xs
                        text-gray-500
                        dark:text-gray-400">
                        {field.value.length}/{maxLength}
                    </span>
                )}

            </div>

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