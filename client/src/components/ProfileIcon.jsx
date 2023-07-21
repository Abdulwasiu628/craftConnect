import React, {useState} from "react"

import { FaUser, FaCog } from "react-icons/fa";


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
                Profile update
              </a>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ProfileIcon;