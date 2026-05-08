import NavMenu from '@/components/navmenu';
import './globals.css';
import { auth0 } from "@/lib/auth0";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth0.getSession();

  const isLoggedIn = !!session;
   const userName = session?.user.name || session?.user.email || 'User';

  // if (!session) {
  //   return (
  //     <>
  //       {/* Redirects to Auth0 to sign up */}
  //       <a href="/auth/login?screen_hint=signup">Signup</a>
  //       <br />
  //       {/* Redirects to Auth0 to log in */}
  //       <a href="/auth/login">Login</a>
  //     </>
  //   );
  // }

  function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }
  return (
    <html lang="en">
      <head>
        <title>Phone Book</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

      </head>
      <body className="bg-gray-100">
      <NavMenu isLoggedIn={isLoggedIn} userName={userName} />
        
        {children}</body>
    </html>
  )
}