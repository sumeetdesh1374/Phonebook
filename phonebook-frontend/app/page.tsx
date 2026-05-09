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
      

    <>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.phoneNumber}</td>
              <td>{contact.email}</td>
              <td>{contact.categoryName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <p>Logged in as {session.user.email}</p>
  
      <p>Access Token: {accessToken}</p>
 
      <h1>User Profile</h1>
      <pre>{JSON.stringify(session.user, null, 2)}</pre> */}

 
      <a href="/auth/logout">Logout</a>
      
      
    </>
  );
}