import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MenuBarAfter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        {/* Menu Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:flex`}>
          <li>
            <NavLink
              to="/history"
              className="text-white hover:text-gray-300"
              activeClassName="font-bold"
            >
              History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/view-plans"
              className="text-white hover:text-gray-300"
              activeClassName="font-bold"
            >
              View Plans
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuBarAfter;