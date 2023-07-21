import React, {useState} from "react";
import { useFormik } from "formik";
import axios from "axios";
const ModalForm = (props) => {
  
  const showCraft = props.showCraft
  const addCraft = props.addCraft
  const url = 'http://localhost:3000'
  const [formValues, setFormValues] = useState({
    description: "",
    price_rate: "",
    charge_per_hour: "",
    years_of_experience: "",
    product: "",
  });
  const [getImage, setImage] = useState({newImage: ''});
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

  }
  
  const handleFileChange = async(e) => {
    try{
      const file = e.target.files[0]
      console.log(file)
      const buffer = convertToBase64(file)
      setImage({...getImage, imageFile: file})
    }catch(err){
      if(err){
        console.error(err);
      }
    }

  }
  const product = formValues.product
  console.log(getImage)

  
const createImage = (newImage, prod) =>axios.post(`${url}/crafts/imagePost`, {newImage,  prod}, {
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
  credentials: 'include'
})

  const createPost = async (img, prod) => {
    try {
      await createImage(img, prod);
    } catch (error) {
      console.log(error.message);
    }
  };
  const {errors, touched} =
    useFormik({
    });

  if (!props.isOpen) {
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(getImage, product)
    addCraft(formValues)
    
  }
  
  
  

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={props.onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-10 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Add your craft
                </h3>
                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6 flex flex-col pr-4"
                    method="post"
                    action=""
                  >
                    <select
                          value={formValues?.product}
                          onChange={handleInputChange}
                          name="product"
                          id="product"
                          className={
                            errors.product && touched.product
                              ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                              : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                          }
                      >
                          <option value="">{ typeof(showCraft) !== 'undefined' ? showCraft?.product : 'Enter your craft' }</option>
                          <option value="Traditional Crafts: Visual Arts">Traditional Crafts: Visual Arts</option>
                          <option value="Sculpture Art">Sculpture Art</option>
                          <option value="Printmaking">Printmaking</option>
                          <option value="Paper crafts">Paper crafts</option>
                          <option value="Natural Crafts">Natural Crafts</option>
                          <option value="Pottery and Ceramics">Pottery and Ceramics</option>
                          <option value="Beadwork and Jewelry Making">Beadwork and Jewelry Making</option>
                          <option value="Woodworking">Woodworking</option>
                          <option value="Leatherworking">Leatherworking</option>
                          <option value="Blacksmithing and Metalworking">Blacksmithing and Metalworking</option>
                          <option value="Glass Art">Glass Art</option>
                          <option value="Folk Art">Folk Art</option>
                             
                        </select>

                    <div className="pb-4 flex-grow">
                      <label htmlFor="description"></label>

                      <input
                        type="text"
                        value={formValues?.description}
                        onChange={handleInputChange}
                        name="description"
                        id="description"
                        placeholder={ typeof(showCraft) !== 'undefined' ? showCraft?.description  : 'Product Description' }
                        className={
                          errors.description &&
                          touched.description
                            ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                            : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                        }
                      />
                    </div>

                    <div className="pb-4 flex-grow">
                      <label htmlFor="price_rate"></label>
                      <input
                        value={formValues?.price_rate}
                        onChange={handleInputChange}
                        type="number"
                        name="price_rate"
                        id="price_rate"
                        placeholder={  typeof(showCraft) !== 'undefined' ? showCraft?.price_rate : 'Price Rate' }
                        className={
                          errors.price_rate && touched.price_rate
                            ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                            : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                        }
                      />
                    </div>

                    <div className="pb-4 flex-grow">
                      <label htmlFor="price_rate"></label>
                      <input
                        value={formValues?.charge_per_hour}
                        onChange={handleInputChange}
                        name="charge_per_hour"
                        type="number"
                        id="charge_per_hour"
                        placeholder={typeof(showCraft) !== 'undefined' ? showCraft?.charge_per_hour   :  'Charge Per Hour' }
                        className={
                          errors.charge_per_hour && touched.charge_per_hour
                            ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                            : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                        }
                      />
                    </div>

                    <div className="pb-4 flex-grow">
                      <label htmlFor="price_rate"></label>
                      <input
                        value={formValues?.years_of_experience}
                        onChange={handleInputChange}
                        name="years_of_experience"
                        type="number"
                        id="years_of_experience"
                        placeholder={typeof(showCraft) !== 'undefined' ? showCraft?.years_of_experience   :  'Years of Experience' }
                        className={
                          errors.years_of_experience && touched.years_of_experience
                            ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                            : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                        }
                      />
                    </div>

                    <div className="pb-4 flex-grow">
                      <label
                        htmlFor="image"
                        className="bg-gray-200 py-2 px-4 rounded-md cursor-pointer"
                      >
                        Choose File
                      </label>
                      <input
                      type="file" 
                      accept=".jpeg, .png, .jpg"
                      onChange={handleFileChange}
                      id="image" 
                      name="newImage" 
                      /> 
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        type="submit"
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={props.onClose}
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        className="py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={props.onClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
