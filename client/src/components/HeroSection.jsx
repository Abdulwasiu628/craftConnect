import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import CardsDiv from "./Card";

const HeroSection = () => {
  const [craftDetails, setCraftDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isViewing, setIsViewing] = useState(false);

  const [expanded, setExpanded] = useState(false);




  const handleViewClick = () => {
    setExpanded(!expanded);

    if (isViewing) {
      setIsViewing(false);
      setCraftDetails(null);
    } else {
      setIsLoading(true);
      // axios.get('/api/crafts/2')
      //   .then(response => {
      //     setCraftDetails(response.data);
      //     setIsLoading(false);
      //     setError(null);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     setIsLoading(false);
      //     setError("An error occurred while fetching the craft details. Please try again later.");
      //   });
      // Hard-coded details
      setCraftDetails({
        craft: "Woodworking",
        product_image:
          "https://images.unsplash.com/photo-1536334880827-5a810fda9668",
        product_description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nulla eget interdum consequat, tortor mi pretium enim, ",
        years_of_experience: "5 years",
        price_rate: "$50/hour",
        contact_details: "woodworker@gmail.com",
      });
      setIsLoading(false);
      setError(null);
      setIsViewing(true);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div
      className="container-fluid mx-auto px-4 flex flex-wrap"
      data-aos="fade-down"
      data-aos-delay="200"
    >
      <div className="w-full md:w-1/4">
        <div className="bg-[#FCD12A] shadow p-4">
          <h2 className="font-bold text-lg mb-4">Categories</h2>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Traditional Crafts: Visual Arts
              </a>
              <hr />
            </li>

            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Sculpture Art
              </a>
              <hr />
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Printmaking
              </a>
              <hr />
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Paper crafts
              </a>
              <hr />
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Natural Crafts
              </a>
              <hr />
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Pottery and Ceramics
              </a>
              <hr />
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Beadwork and Jewelry Making
              </a>
              <hr />
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Woodworking
              </a>
              <hr />
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Leatherworking
              </a>
              <hr />
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Blacksmithing and Metalworking
              </a>
              <hr />
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Glass Art
              </a>
              <hr />
            </li>
            <li className="mb-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Folk Art
              </a>
              <hr />
            </li>
          </ul>
        </div>
      </div>
      <div
      className="md:w-1/2 lg:w-1/4 p-2 m-2 flex-grow"
      data-aos="fade-left"
      data-aos-delay="400"
    >
      <div className="bg-white shadow-lg h p-6 md:w-[350px] lg:w-[350px">
        <h2 className="font-bold text-2xl mb-4">{craftDetails?.craft}</h2>
        <img src={craftDetails?.product_image} alt="Tools" className="mb-4" />
        <div className="flex justify-between items-center">
          <button
            className="bg-[#FCD12A] hover:bg-[#004c00] text-white font-bold py-2 px-4 rounded"
            onClick={handleViewClick}
          >
            View
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            expanded ? "h-auto" : "h-0"
          }`}
        >
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!isLoading && !error && !craftDetails && (
            <p>Click the View button to see craft details.</p>
          )}
          {!isLoading && craftDetails && (
            <div>
              <p>{craftDetails.product_description}</p>
              <p>{craftDetails.years_of_experience}</p>
              <p>{craftDetails.price_rate}</p>
              <p>{craftDetails.contact_details}</p>
            </div>
          )}
        </div>
      </div>
    </div>
      <CardsDiv />
    </div>
  );
};
export default HeroSection;
