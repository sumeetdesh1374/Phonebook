import Pager from "@/components/pager";
import { auth0 } from "@/lib/auth0";
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function Page({ searchParams }: { searchParams?: Record<string, string> }) {
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
     const query =await searchParams
     const pageNumber = query?.pageNumber ? parseInt(query.pageNumber) : 1;
     const pageSize = query?.pageSize ? parseInt(query.pageSize) : 5;

     const response = await fetch(`${process.env.PHONEBOOK_API_URL}/api/home?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
     const pagedList: PagedList<Contact> = await response.json();
      const contacts = pagedList.records;

  return (
      

    <div className="m-auto max-w-4xl p-4">
      <div className="my-4">
         <a className="w-full  px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        href="/contacts/create"
        >
          Create new Contact
        </a>
      </div>
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
          currentPage={pageNumber}
          pageSize={pageSize}
          totalCount={pagedList.totalCount}
          apiEndpoint={`/`}
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