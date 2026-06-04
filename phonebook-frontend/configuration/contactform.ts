import { emailValidation, requiredFieldValidation } from "@/lib/formFunctions";
import { FormConfiguration } from  "@/lib/formFunctions";
export const contactConfig: FormConfiguration[] = [
    {
        fieldName: "id",
        fieldType: "hidden",
        label: "ID",
        defaultValue: "0",
        placeholder: "0"

    
    },
    {
        fieldName: "firstName",
        fieldType: "text",
        label: "First Name",
        placeholder: "Enter your first name",
        validationFunctions: [requiredFieldValidation],
        defaultValue: "",
    },
    {
        fieldName: "lastName",
        fieldType: "text",
        label: "Last Name",
        placeholder: "Enter your last name",
        validationFunctions: [requiredFieldValidation],
        defaultValue: "",                                                       
    },
    {
        fieldName: "email",
        fieldType: "email",
        label: "Email",
        placeholder: "Enter your email",
        validationFunctions: [requiredFieldValidation,emailValidation]  
    },
    {
        fieldName: "phoneNumber",
        fieldType: "text",
        label: "Phone Number",
        placeholder: "Enter your phone number",
        validationFunctions: [requiredFieldValidation]
    },
    {
        fieldName: "categoryId",
        fieldType: "number",
        label: "Category",
        isCombo: true,
        validationFunctions: [requiredFieldValidation],
        
    }


];