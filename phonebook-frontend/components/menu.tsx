"use client";

export function Menu({ className,isLoggedIn, userName }: { className?: string; isLoggedIn: boolean; userName?: string }) {

   if(isLoggedIn) {
     return  <>
     
            <a href="#" className={className}>Home</a>
        <a href="#" className={className}>Manage Catagories</a>
           <a href="#" className={className}>Profile</a>
        <a href="#" className={className}>{ `Welcome, ${userName}` }</a>
     
     </>;
   }
     return <>
       <a href="/auth/login" className={className}>Login</a>
     </>
}