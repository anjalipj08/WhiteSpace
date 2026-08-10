import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

function Header() {
  return (
    <>
    <div className='fixed top-0 left-0 w-full z-50 flex gap-15 text-white justify-center bg-[#6f8ca6] h-15 py-4'>
        <p></p>
        <a href="#home"> <p>Home</p> </a>
        <a href="#about"> <p>About</p> </a>
        <a href="#services"> <p>Services</p> </a>
        <Link to="/Auth" className="text-white hover:text-gray-200" > <p>Login</p> </Link>
       
    </div>
  </>
  )
}

export default Header