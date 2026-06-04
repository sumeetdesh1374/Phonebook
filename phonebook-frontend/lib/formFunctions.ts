
export interface FormFieldConfiguration {
  fieldName: string;
  fieldType: "text" | "email" | "password" | "number" | "textarea" | "hidden";
  label: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  isCombo?: boolean;
  comboItems?: ComboItem[];
  validationFunctions?: ( ( fromField: FormField ) => { isValid: boolean, errorMessage?: string } ) [];
}

export interface FormField {
  fieldName: string;
  displayName: string;
  value: string;
  isValid?: boolean;
  errorMessages?: string[];
}



export interface ComboItem {
  id: number | string;
  name: string;
}

export interface GenericFormProps {
  formConfigKey: string;
  postUrl?: string;
  method: "POST" | "PUT" | "PATCH";
  payloadType: "json" | "form-data";
  postSuccessRedirectUrl?: string;
  title?: string;
  initFormData?: Record<string, any>;
  comboRecords?: Record<string, ComboItem[]>;
  
}

export function requiredFieldValidation(formField: FormField) {
  if (!formField.value ) {
    return { isValid: false, errorMessage: `The ${formField.displayName} field is required.` };
  } else {
    return { isValid: true, errorMessage: undefined };
  }
}
  

export function emailValidation(formField: FormField) {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  if (!formField.value  || !emailRegex.test(formField.value)) {
    return { isValid: false, errorMessage: `The ${formField.displayName} field is not a valid email address.` };
  } else {
    return { isValid: true, errorMessage: undefined };
  }   

}
     