import FormField from "../form/FormField";
import TextAreaField from "../form/TextAreaField";

export default function ProfileInfoRow({
    label, 
    isEditing, 
    isMultiLineField=false, 
    value, fieldName, 
    fieldType="text"}) {
        
    const displayFormElement = isMultiLineField 
        ? ( <TextAreaField label=""
                name={fieldName}
                rows={3}
            />) 
        : ( <FormField label=""
                    name={fieldName}
                    type={fieldType}
            />)
    const displayParagraphElement = isMultiLineField 
        ? ( <p className="
                whitespace-pre-line">
                {value || ""}
            </p>)
        : ( <p>
                {value || ""}
            </p>)
return(
        <div>
            <p className="
                mb-2 
                font-medium">
                {label}
            </p>

            {isEditing 
            ? displayFormElement 
            : displayParagraphElement}
        </div>
    );
}
