import {auth0} from "@/lib/auth0";
import {redirect} from "next/navigation";
import {del} from "@/lib/restserverutils";

export default async function DeleteContact({ params }:{ params:Promise<{ id:string}>}  ) {

    const { id } = await params ;

    const session = await auth0.getSession();

    if(!session) {
        redirect("/auth/login");
    }

    let isError:boolean = false;
    let errorMessage:string = "";
    let redirectUrl:string = "/";

    try {

        const accessToken = session?.tokenSet.accessToken;

        if(!accessToken) {
            errorMessage = "Access token not found in session";
            isError = true;
            console.error(errorMessage);
            redirectUrl = "/auth/login";
        }

         if(!isError) {
             await del(`/api/home/${id}`,accessToken );

         }


    }
    catch(error) {
        console.error("Error deleting contact:", error);
        redirectUrl = "/error";
    }

    redirect(redirectUrl);

}