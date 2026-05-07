"use client";

import {  useState } from "react";
import { Menu } from "./menu";

export default function NavMenu() {

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


      <div className={
        `hidden md:flex space-x-6`}>
          <Menu className="hover:text-gray-200" />
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


  <div id="menu" className={`${menuOpen ? '' : 'hidden'} md:hidden px-4 pb-4`}>
    <Menu className="block py-2 hover:text-gray-200" />
  </div>
</nav>
    ) };