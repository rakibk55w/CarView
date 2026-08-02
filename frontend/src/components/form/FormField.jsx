import { useField } from "formik";
import { useState } from "react";
import { normalFieldStyle, errorFieldStyle } from "../../utils/fieldStyles";
import { FiEye, FiEyeOff } from "react-icons/fi";

function FormField({
    label,
    passwordToggle = false,
    numberFormat = false,
    ...props
}) {
    const [field, meta, helpers] = useField(props);
    const [showPassword, setShowPassword] = useState(false);


    const hasError = meta.touched && meta.error;
    const inputType = passwordToggle
            ? (showPassword ? "text" : "password")
            : numberFormat 
                ? "text" 
                : props.type;

    const displayValue = numberFormat 
        ? field.value 
            ? Number(field.value).toLocaleString("en-US") 
            : "" 
        : field.value; 
            
    const handleNumberChange = (event) => { 
        const rawValue = event.target.value.replace( /,/g, "" ); 
        
        if (!/^\d*$/.test(rawValue)) { 
            return; 
        } 
        helpers.setValue(rawValue); 
    };

    return (
        <div>
            <label className="
                mb-2 
                block 
                font-medium">
                {label}
            </label>

            <div className="relative">
                <input className={`
                    w-full
                    rounded-lg
                    border
                    px-4
                    py-2
                    outline-none
                    transition-colors
                    dark:bg-gray-900
                    dark:[&::-webkit-calendar-picker-indicator]:invert

                    ${
                        hasError 
                            ? errorFieldStyle
                            : normalFieldStyle
                    }
                    ${
                        passwordToggle
                            ? "pr-11"
                            : ""
                    }`}
                    {...field}
                    {...props}
                    type={inputType}
                    value={displayValue}
                    onChange={ 
                        numberFormat 
                        ? handleNumberChange 
                        : field.onChange 
                    }
                />

                { passwordToggle && (
                    <button className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        cursor-pointer
                        text-gray-500
                        transition-colors
                        hover:text-primary-600
                        dark:text-gray-400
                        dark:hover:text-primary-400"
                        type="button"
                        onClick={() =>
                            setShowPassword((prev) => !prev)
                        }
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }>
                        { showPassword
                            ? <FiEyeOff size={20} />
                            : <FiEye size={20} />
                        }
                    </button>
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

export default FormField;