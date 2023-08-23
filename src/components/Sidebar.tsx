import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 h-screen w-1/4 bg-gray-800 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <button onClick={toggleSidebar} className="px-4 py-2 mt-4 ml-4 text-white bg-gray-600 rounded-md">
        Toggle Sidebar
      </button>
      <nav className="mt-8">
        <ul className="pl-8">
          <li className="mb-2">
            <a href="#" className="block text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block text-white hover:text-gray-300">
              About
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block text-white hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
