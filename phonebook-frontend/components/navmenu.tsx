"use client";

import {  useState } from "react";
import { Menu } from "./menu";

export default function NavMenu({ isLoggedIn, userName }: { isLoggedIn: boolean; userName?: string }) {

  const [menuOpen, setMenuOpen] = useState(false);
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
            <nav className="bg-blue-600 text-white">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between items-center h-16">
      
  
      <div className="text-xl font-bold">
        Phonebook
      </div>


      <div className="desktop-menu">
          <Menu className="hover:text-gray-200"  isLoggedIn={isLoggedIn} userName={userName}/>
      </div>

      <div className="md:hidden">
        <button id="menu-btn" className="focus:outline-none"  onClick={toggleMenu}>

          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

    </div>
  </div>


  <div id="menu" className={`${menuOpen ? '' : 'hidden'} mobile-menu`}>
    <Menu className="block py-2 hover:text-gray-200" isLoggedIn={isLoggedIn} userName={userName} />
  </div>
</nav>
    ) };