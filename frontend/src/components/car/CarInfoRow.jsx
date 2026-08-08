import FormField from "../form/FormField";
import TextAreaField from "../form/TextAreaField";
import SelectField from "../form/SelectField";
import CheckboxField from "../form/CheckBoxField";

export default function CarInfoRow({
    label,
    value,
    fieldName,
    fieldType = "text",
    isEditing,
    isMultiLineField = false,
    isCheckbox = false,
    options = [],
}) {
    const displayValue =
        value === null ||
        value === undefined ||
        value === ""
            ? ""
            : value;

    let formElement;

    if (isCheckbox) {
        formElement = (
            <CheckboxField
                label=""
                name={fieldName}
            />
        );
    }
    else if (fieldType === "select") {
        formElement = (
            <SelectField
                label=""
                name={fieldName}
                options={options}
            />
        );
    }
    else if (isMultiLineField) {
        formElement = (
            <TextAreaField
                label=""
                name={fieldName}
                rows={5}
            />
        );
    }
    else {
        formElement = (
            <FormField
                label=""
                name={fieldName}
                type={fieldType}
            />
        );
    }

    return (
        <div>
            <p className="
                font-medium">
                {label}
            </p>

            {isEditing
                ? formElement
                : (
                    <p className={
                        isMultiLineField
                            ? "whitespace-pre-line"
                            : ""}>
                                
                        {displayValue}
                    </p>
                )
            }
        </div>
    );
}