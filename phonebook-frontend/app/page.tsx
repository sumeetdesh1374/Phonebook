import Pager from "@/components/pager";
import { auth0 } from "@/lib/auth0";
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function Page() {
 const session = await auth0.getSession();

  if (!session) {
    return (
      <>
        {/* Redirects to Auth0 to sign up */}
        <a href="/auth/login?screen_hint=signup">Signup</a>
        <br />
        {/* Redirects to Auth0 to log in */}
        <a href="/auth/login">Login</a>
      </>
    );
  }

     const accessToken = session?.tokenSet?.accessToken;

     const response = await fetch(`${process.env.PHONEBOOK_API_URL}/api/home`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
     const contacts: Contact[] = await response.json();

  return (
      

    <div className="m-auto max-w-4xl p-4">
      <div>
         <table className="w-full table-auto border-collapse border border-slate-400 ">
        <thead className="bg-slate-50">
          <tr>
            <th className="border border-slate-300 p-2 text-left">First Name</th>
            <th className="border border-slate-300 p-2 text-left">Last Name</th>
            <th className="border border-slate-300 p-2 text-left">Phone Number</th>
            <th className="border border-slate-300 p-2 text-left">Email</th>
            <th className="border border-slate-300 p-2 text-left">Category</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-slate-100">
              <td className="border border-slate-300 p-2">{contact.firstName}</td>
              <td className="border border-slate-300 p-2">{contact.lastName}</td>
              <td className="border border-slate-300 p-2">{contact.phoneNumber}</td>
              <td className="border border-slate-300 p-2">{contact.email}</td>
              <td className="border border-slate-300 p-2">{contact.categoryName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
         <Pager 
          currentPage={1}
          pageSize={10}
          totalCount={400}
          apiEndpoint={`${process.env.PHONEBOOK_API_URL}/api/home`}
        />
      </div>
     
      {/* <p>Logged in as {session.user.email}</p>
  
      <p>Access Token: {accessToken}</p>
 
      <h1>User Profile</h1>
      <pre>{JSON.stringify(session.user, null, 2)}</pre> */}

 
      <a href="/auth/logout">Logout</a>
      
      
    </div>
  );
}