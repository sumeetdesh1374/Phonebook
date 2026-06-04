import GenericForm from "@/components/GenericForm";
import {ComboItem} from "@/lib/formFunctions";
import {auth0} from "@/lib/auth0";
import {redirect} from "next/navigation";
import {get} from "@/lib/restserverutils";


export default async function CreateContactPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }



  const comboRecords: Record<string, ComboItem[]> = {};  
  try {
    const accessToken = session?.tokenSet?.accessToken;
    comboRecords["categoryId"] = await get(`/api/categories`, accessToken);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    redirect("/error");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* <ContactForm categories={categories} contactBaseUrl={process.env.PHONEBOOK_API_URL} /> */}
        <GenericForm formConfigKey="contactForm" postUrl="/api/contacts" method="POST" payloadType="form-data" title="Contacts" postSuccessRedirectUrl="/" comboRecords={comboRecords}  />
      </div>
    </div>
  );
}
