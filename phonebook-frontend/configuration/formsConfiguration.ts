import { ComboItem, FormFieldConfiguration,FormField } from "@/lib/formFunctions";
import { contactConfig } from "./contactform";

export const formsConfiguration: Record<string, FormFieldConfiguration[]> = {
    "contactForm": [...contactConfig]
};

export function getFormConfiguration(formConfigKey: string, formData?: Record<string, any>, comboRecords?: Record<string, ComboItem[]> ): [FormFieldConfiguration[],FormField[]]  {

      const formFields: FormField[] = [];
      const formConfig = formsConfiguration[formConfigKey] || []; 
      formConfig.forEach(field => {
        if(field.isCombo && comboRecords && comboRecords[field.fieldName]) {
          field.comboItems = comboRecords[field.fieldName];


        }
        if(formData && formData[field.fieldName]) {

          formFields.push({ fieldName: field.fieldName, displayName: field.label, value: formData[field.fieldName] });
         
        }
        else
        {
          formFields.push({ fieldName: field.fieldName, displayName: field.label, value: field.defaultValue || '' });
        }
      });

        return [formConfig, formFields];
}