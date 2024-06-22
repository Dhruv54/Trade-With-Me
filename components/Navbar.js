import React, { useState } from 'react';
import { Image } from 'next/image'
import { FcComboChart } from "react-icons/fc";
import { FaCircleUser } from "react-icons/fa6";
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = ({ user, logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  // Define a function to check if a given path matches the current route
  const isActive = (pathname) => {
    return router.pathname === pathname ? 'border-b-2 border-blue-500' : '';
  };

  return (
    <>
      <nav className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <FcComboChart className="text-4xl" />
            <span className="text-slate-700 body-font text-2xl ml-3">TWD</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/home"} className={`mr-20 hover:text-gray-900 ${isActive('/home')}`}>Home</Link>
            <Link href={"/position"} className={`mr-20 hover:text-gray-900 ${isActive('/position')}`}>Positions</Link>
            <Link href={"/history"} className={`mr-20 hover:text-gray-900 ${isActive('/history')}`}>History</Link>
            <Link href={"/pnl"} className={`hover:text-gray-900 ${isActive('/pnl')}`}>P&L</Link>
          </nav>
          <div className="relative">
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10" onMouseOver={() => { setShowDropdown(true) }} onMouseLeave={() => { setShowDropdown(false) }}>
                <Link href="/myAccount" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Account</Link>
                <Link href="/orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Orders</Link>
                <a onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
              </div>
            )}
          </div>
          {user.value ? (
            <FaCircleUser className="text-4xl cursor-pointer" onMouseOver={() => { setShowDropdown(true) }} onMouseLeave={() => { setShowDropdown(false) }} />
          ) : (
            <Link href="/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar