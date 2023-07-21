import React from "react";
import { useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-[#004c00] p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-[430px]">
          <a href="/" className="font-semibold text-xl tracking-tight cursor-pointer">Craft-connect</a>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>
      <div
        className={`${
          showMenu ? "block" : "hidden"
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <div className="relative inline-block mt-4 lg:inline-block lg:mt-0 text-gray-200">
            <input
              type="text"
              className="px-3 py-2 w-[350px] rounded-md border-2 border-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Search"
            />
            <button className="absolute right-0 top-0 h-full w-12 text-[#004c00] hover:bg-[#FCD12A] hover:text-white rounded-r-md flex items-center justify-center">
              <FiSearch size={20} />
            </button>
          </div>
        </div>
        <div>
          <a
            href="/login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-[#004c00] hover:bg-white mt-4 lg:mt-0 ml-2"
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
