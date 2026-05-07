"use client";

export function Menu({ className }: { className?: string }) {

     return <>
            <a href="#" className={className}>Home</a>
        <a href="#" className={className}>Manage Catagories</a>
           <a href="#" className={className}>Profile</a>
        <a href="#" className={className}>Login/Logout</a>
     
     </>;
}