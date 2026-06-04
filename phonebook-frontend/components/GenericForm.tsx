"use client";

import { getFormConfiguration } from "@/configuration/formsConfiguration";
import { GenericFormProps } from "@/lib/formFunctions";
import { useState } from "react";
import { useRouter } from "next/navigation";



function GenericForm({ formConfigKey, postUrl, method, payloadType, postSuccessRedirectUrl, title, initFormData, comboRecords
}: GenericFormProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [formConfiguration,formFields] = getFormConfiguration(formConfigKey, initFormData, comboRecords);
  const [formConfig, setFormConfig] = useState(formConfiguration);
  const [formFieldsData, setFormFieldsData] = useState(formFields);

  console.log(formFieldsData);

  const router = useRouter();

  function getJsonPayload() {
    const payload: Record<string, any> = {};
     formFieldsData.forEach(field => {
      payload[field.fieldName] = field.value !== undefined ? field.value : formConfig.find(f => f.fieldName === field.fieldName)?.defaultValue || '';
    });
    return JSON.stringify(payload);
  }

  function getFormDataPayload() {
    const formData = new FormData();
      formFieldsData.forEach(field => {
      formData.append(field.fieldName, field.value !== undefined ? field.value : formConfig.find(f => f.fieldName === field.fieldName)?.defaultValue || '');
    });
    return formData;
  }
 

  function validateForm() {

    
    let isFormValid = true;
    formConfig.forEach((field, index) => {
      if (field.validationFunctions) {
        const validationResult:{ isValid: boolean, errorMessages: string[] } = { isValid: true
            , errorMessages: [] };
        field.validationFunctions.forEach((validationFn) => {
       
          const result = validationFn(formFieldsData[index]);
          if (!result.isValid &&  result.errorMessage) {
            isFormValid = false;
            validationResult.isValid = false;
            validationResult.errorMessages.push(result.errorMessage);
            console.log(validationResult.errorMessages);
          }
        });

        setFormFieldsData((prevConfig) => prevConfig.map((f, i) => i === index ? { ...f, isValid: validationResult.isValid , errorMessages: validationResult.errorMessages} : f));

      }
    });
     return isFormValid;
  }

  function handeChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormFieldsData((prevConfig) => prevConfig.map((field) => field.fieldName === name ? { ...field, value } : field));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    // const formData = new FormData(event.currentTarget);
    // console.log(formData);
    try {
      if (!validateForm()) {
        setIsLoading(false);
        return;
      }
      console.log(getJsonPayload());
      console.log(payloadType);
      const response = await fetch(postUrl || "/api/submit-form", {
        method: method,
        body: payloadType === "json" ? getJsonPayload() : getFormDataPayload(),
      });

      const result = await response.json();
      console.log("Form submitted successfully:", result); 
      router.push(postSuccessRedirectUrl || "/");
    } catch (errors:any) {

      setError(errors.message || "An error occurred while submitting the form.");
      console.error(errors);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {formConfig.map((field,index) => (
            <div key={field.fieldName} className="mb-4">
        

              {field.fieldType !== "hidden" && (
                <label htmlFor={field.fieldName} className="block text-gray-700 font-bold mb-2">{field.label}</label>
              )}
              {field.isCombo && field.comboItems ? (
                <select id={field.fieldName} name={field.fieldName} value={formFieldsData[index]?.value !== undefined ? formFieldsData[index]?.value : field.defaultValue}  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formFieldsData[index]?.isValid === false ? "border-red-500" : "border-gray-300"
                  }`} onChange={handeChange}>
                  <option value="">Select an option</option  >
                  {field.comboItems.map((item) => (
                    <option key={item.id} value={item.id} >
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.fieldType}
                  id={field.fieldName}
                  name={field.fieldName}
                  placeholder={field.placeholder}
                  value={formFieldsData[index]?.value !== undefined ? formFieldsData[index]?.value : field.defaultValue}
                  onChange={handeChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formFieldsData[index]?.isValid === false ? "border-red-500" : "border-gray-300"
                    }`}
                />



              )}
              {formFieldsData[index]?.isValid === false && formFieldsData[index]?.errorMessages?.map((errorMessage, index) => (
                <p key={index} className="text-red-500 text-xs italic">{errorMessage}</p>
              ))}
            </div>
          ))}
          <button type="submit" disabled={isLoading} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default GenericForm