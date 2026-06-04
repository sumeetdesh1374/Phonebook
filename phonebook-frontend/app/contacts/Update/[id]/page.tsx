import GenericForm from "@/components/GenericForm";
import { auth0 } from "@/lib/auth0";
import { ComboItem } from "@/lib/formFunctions";
import { get } from "@/lib/restserverutils";
import { redirect } from "next/navigation";

export default  async function UpdateContactPage( {params} : { params : Promise<{ id: string } > } ) {

   const { id } = await params;
   console.log("Received ID param:", id); // Debug log to check if ID is received correctly
     const session = await auth0.getSession();
        
          if(!session) {
            redirect("/auth/login");
          }

          
            const comboRecords: Record<string, ComboItem[]> = {};  
            let contact: any = null;

          try{
            // Get Combo Records
             const accessToken = session?.tokenSet?.accessToken;
                const categories = await get(`/api/categories`, accessToken);
                comboRecords["categoryId"] = categories; 

            // Get Contact to edit
               contact = await get(`/api/home/${id}`, accessToken);

          }
          catch(error) {
            console.error("Error fetching contact details:", error);
            redirect("/error");
          }
        

    return (
          
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Update Contact</h1>
            {/* Update form will go here */}
                   <GenericForm formConfigKey="contactForm" postUrl="/api/contacts" method="PUT" payloadType="form-data" title="Edit Contacts" postSuccessRedirectUrl="/" comboRecords={comboRecords}  initFormData={contact} />
          </div>
        </div>
      );
    }
