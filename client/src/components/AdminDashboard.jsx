import React from 'react'
import { useState } from "react";
import { FaUser, FaCog } from "react-icons/fa";
import NavBar3 from "./NavBar3";

const ProfileIcon = ({ name }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={handleProfileClick}
      >
        <FaUser className="h-6 w-6" aria-hidden="true" />
      </button>
      {showProfile && (
        <div className="absolute z-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <div className="py-1">
            <span className="block px-4 py-2 text-sm text-gray-700">
              {name}
            </span>
            <a
              href="/dashboard/setting"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaCog
                className="inline-block w-4 h-4 mr-2 stroke-current"
                aria-hidden="true"
              />
              Settings
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
const AdminDashboard = () => {
  return (
    <div className="font-sans flex flex-col min-h-screen w-full">
    <NavBar3 />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Hi Emmanuel welcome!!!
          </h1>
          <ProfileIcon name="Emmanuel" />
        </div>
      </header>
      <div className="hidden bg-blue-dark md:block md:bg-white md:border-b">
        <div className="container mx-auto px-4">
          <div className="md:flex">
            
          </div>
        </div>
      </div>
    <div className="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
      <div className="bg-[#FCD12A] sm:border-l sm:border-r sm:rounded shadow mb-6">
        <div className="border-b px-6">
          <div className="flex justify-between -mb-px">
            <div className="flex text-sm">
              <button
                type="button"
                className="appearance-none py-4 text-grey-dark border-b border-transparent hover:border-grey-dark mr-3"
              >
                1M
              </button>
              <button
                type="button"
                className="appearance-none py-4 text-grey-dark border-b border-transparent hover:border-grey-dark mr-3"
              >
                1D
              </button>
              <button
                type="button"
                className="appearance-none py-4 text-grey-dark border-b border-transparent hover:border-grey-dark mr-3"
              >
                1W
              </button>
              <button
                type="button"
                className="appearance-none py-4 text-blue-dark border-b border-blue-dark mr-3"
              >
                1M
              </button>
              <button
                type="button"
                className="appearance-none py-4 text-grey-dark border-b border-transparent hover:border-grey-dark mr-3"
              >
                1Y
              </button>
              <button
                type="button"
                className="appearance-none py-4 text-grey-dark border-b border-transparent hover:border-grey-dark"
              >
                ALL
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex">
          <div className="w-1/3 text-center py-8">
            <div className="border-r">
              <div className="mb-2">

                <span className="text-5xl">21,404</span>
              </div>
              <div className="text-sm uppercase text-grey tracking-wide">
                Total number of users
              </div>
            </div>
          </div>
          <div className="w-1/3 text-center py-8">
            <div className="border-r">
              <div className="mb-2">
                <span className="text-5xl">12,998</span>
              </div>
              <div className="text-sm uppercase tracking-wide">
                Total number of craft posited
              </div>
            </div>
          </div>
          <div className="w-1/3 text-center py-8">
            <div>
              <div className="text-grey-darker mb-2">
               
                <span className="text-5xl">154.47</span>
              </div>
              <div className="text-sm uppercase text-grey tracking-wide">
                Newly registered Since this month 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4">
        <div className="w-full mb-6 lg:mb-0  px-4 flex flex-col">
          <div className="flex-grow flex flex-col bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">
            <div className="border-b">
              <div className="flex justify-between px-6 -mb-px">
                <h3 className="text-blue-dark py-4 font-normal text-lg">
                  Full  Names of Users
                </h3>
                <div className="flex">
                  <button
                    type="button"
                    className="appearance-none py-4 text-blue-dark border-b border-blue-dark mr-3"
                  >
                    Total Products
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
              <div className="w-2/5 xl:w-1/4 px-4 flex items-center">
                <span className="text-lg">user one</span>
              </div>
                <div className="w-full px-4">
                  <div className="text-right text-grey">18</div>
              </div>
            </div>
            <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
              <div className="w-2/5 xl:w-1/4 px-4 flex items-center">
                <span className="text-lg">User three</span>
              </div>
                <div className="w-full px-4">
                  <div className="text-right text-grey">12</div>
              </div>
            </div>
            <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
              <div className="w-2/5 xl:w-1/4 px-4 flex items-center">       
                <span className="text-lg">User one</span>
              </div>
                <div className="w-full px-4">
                  <div className="text-right text-grey">10</div>            
              </div>
            </div>
           
          </div>
        </div>
       
      </div>
    </div>
  </div>
  
  )
}

export default AdminDashboard
