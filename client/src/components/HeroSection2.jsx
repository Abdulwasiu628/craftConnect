import React, { useEffect, useState} from "react";
import "aos/dist/aos.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import ModalForm from "./ModalForm";
import Aos from "aos";

const url = 'http://localhost:3000'
const HeroSection = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const [craftDetails, setCraftDetails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [processed, setProcessed] = useState(false)
  const [deleteCrafts, setDeleteCrafts] = useState(null);
  const [updateData, setUpdateData] = useState({})

  useEffect(() => {
    Aos.init({
      duration: 1000,
      delay: 500
    });
    axios.get(`${url}/crafts`, {
      headers,
      withCredentials: true,
      credentials: 'include'
    }).then(response => {
      const data = response.data;
      setCraftDetails(data);
    }).catch(error => {
      console.log(error);
    });
  }, []);
  
  console.log(craftDetails)

  const updateCraft = (val) => {
    try {
      Aos.init('2000')
      axios.post(`${url}/artisans/update/${product}`, {
        headers,
        credentials: 'include',
        withCredentials: true
      })
      .then((response) => {
        const artisan = response.data
        setData(artisan);
        setProcessed(val)
        if(processed === true){
          window.location.reload()
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const product = craftDetails.map(id => {
    return id.product
  })
  
const openModal = (val) => {
  const prod = product[val?.id]
  axios.get(`${url}/crafts/update/${prod}`, {
    headers,
    credentials: 'include',
    withCredentials: true
  })
    .then((response) => {
      const data = response.data;
      setUpdateData(data)
    }).catch(err => {
      console.log(err)
    })

  setIsOpen(true);
};
  
const closeModal = () => {
  setIsOpen(false);
};
  const deleteCraft = (id, val) => {
    const prod = product[id?.id]    
    axios.delete(`${url}/crafts/delete/${prod}`, {
      headers,
      credentials: 'include',
      withCredentials: true
    })
      .then(() => {
        setDeleteCrafts(null)
        setProcessed(val)
        if(processed === true){
          window.location.reload()
        }
      }).catch(err => {
        console.log(err)
      })
      
 };

  return (
    <div className="flex gap-2 ml-2">
      <div className="flex gap-2 ml-4 flex-wrap flex-row ">
        {
          craftDetails.map((craft, id) => (
            <div
              className="p-2 m-2 flex-grow"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <div className="flex gap-4 ml-3">
          
                <div className="bg-white shadow-lg h p-6 ">
                  {/* <h2 className="font-bold text-2xl mb-4">Hair</h2> */}
                  <img src={craft.images}  alt="Tools" className="mb-4" />
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <button  onClick={()=> deleteCraft({id},true)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2" >
                          <FaTrash />
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={()=> openModal({id})} >
                          <FaEdit />
                        </button>
                        
                      </div>
                    </div>
                    <div key={craft.id} id = {id} >
                      <div >Craft Description: {craft.description}</div>
                      <div>Craft Price Rate: {craft.price_rate}</div>
                      <div>Craft Product: {craft.product}</div>
                      <div>Craft Product: {craft.product}</div>
                    </div>
                    
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <ModalForm 
        isOpen={isOpen} 
        onClose={closeModal}
        addCraft={updateCraft} 
        showCraft = {()=> setUpdateData(updateData) }
      />
    </div>
  );
};
export default HeroSection
