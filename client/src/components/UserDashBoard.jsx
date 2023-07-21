import React, {useState, useEffect} from "react";
import Image1 from "../assets/guitar.jpeg";
import NavBar3 from "./NavBar3";
import HeroSection from "./HeroSection2";
import ModalForm from './ModalForm';
import ProfileIcon from "./ProfileIcon";
import axios from "axios";


const UserDashboard = () => {
const url = 'http://localhost:3000'
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({})
  const [val, setVal] = useState({})
  const headers = {
    'Content-Type': 'application/json',
  };
  useEffect(() => {
    getArtisan()
    addCraft(val)
  }, []);
  

const getArtisan = async () =>{
  try {
    axios.get(`${url}/artisans`, {
      headers,
      credentials: 'include',
      withCredentials: true
    })
    .then((response) => {
      const artisan = response.data
      setData(artisan);
    })
  } catch (error) {
    console.log(error);
  }
}

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const addCraft = (values)=>{
    try {
      axios.post(`${url}/crafts/post`,{...values}, {
        headers,
        credentials: 'include',
        withCredentials: true
      })
      .then((response) => {
        const craft = response.data
        console.log(craft)
        setVal(craft);
      })
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
  }

  return (
    <div className="container-fluid">
      <NavBar3 />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Hi {data.firstname} welcome!!!
          </h1>
          <ProfileIcon name="Emmanuel" />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow border-2 overflow-hidden sm:rounded-lg">
            <div className="p-4 sm:px-6">
              <div className="flex items-center justify-center">
                <img
                  className="h-32 w-32 rounded-full"
                  src={Image1}
                  alt="fhhts`s"
                />
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Fullname
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                    {data.surname} {data.firstname}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                    {data.email}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                    {data.phone_number}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                   Skill description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                  {data.skills_description}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"onClick={openModal}>Post your craft</button>
      <ModalForm 
      isOpen={isOpen} 
      onClose={closeModal}
      addCraft={addCraft} 
      />
    </div>
      </main>
      
      <HeroSection />
      
      
    </div>
  );
};
export default UserDashboard;
