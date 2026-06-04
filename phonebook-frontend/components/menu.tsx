"use client";

import Link from "next/link";

export function Menu({ className,isLoggedIn, userName }: { className?: string; isLoggedIn: boolean; userName?: string }) {

   if(isLoggedIn) {
     return  <>
     
            <Link href="/" className={className}>Home</Link>
        <Link href="/contacts/create" className={className}>Create Contact</Link>
        <Link href="#" className={className}>Manage Catagories</Link>
           <Link href="#" className={className}>Profile</Link>
        <Link href="/auth/logout" className={className}>{ `Logout, ${userName}` }</Link>
     
     </>;
   }
     return <>
       <Link href="/auth/login" className={className}>Login</Link>
       <Link href="/auth/login?screen_hint=signup" className={className}>Signup</Link>
     </>
}