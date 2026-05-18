import ContactForm from "@/components/ContactForm";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

export default async function CreateContactPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  let categories: Category[] = [];

  try {
    const accessToken = session?.tokenSet?.accessToken;

    const response = await fetch(`${process.env.PHONEBOOK_API_URL}/api/categories`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Categories API response status:", response.status);

    if (response.ok) {
      const data = await response.json();
      categories = data.records || data;
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <ContactForm categories={categories} contactBaseUrl={process.env.PHONEBOOK_API_URL} />
      </div>
    </div>
  );
}
