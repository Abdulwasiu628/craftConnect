import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image1 from '../assets/grinder.jpeg';
import Image2 from '../assets/guitar.jpeg';
import Image3 from "../assets/handy.jpeg";
import Image5 from "../assets/tools.jpeg";
import Image6 from "../assets/repair.jpeg";
import HeroSection from "./HeroSection";
import NavBar from "./NavBar";


const images = [Image1, Image2, Image3, Image5, Image6];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("right");
      setIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const captions = [
    {
      text: "Helping to create and repair the structures and machinery that make modern life possible.",
      style: "text-4xl font-bold text-white",
    },
    {
      text: "Creating a guitar is a highly specialized skill that requires a great deal of precision, patience, and attention to detail.",
      style: "text-5xl font-extrabold text-red-500",
    },
    {
      text: "Creates three-dimensional objects by shaping a material such as clay, plastic, or metal into a desired form.",
      style: "text-3xl font-medium text-green-500",
    },
    {
      text: "Essential components of many industries, professions, and hobbies, allowing people to perform tasks more efficiently, effectively, and safely.",
      style: "text-3xl font-medium text-blue-500",
    },
    {
      text: "Use specialized tools and equipment to perform repairs, replace worn-out parts",
      style: "text-3xl font-medium text-orange-500",
    },
    {
      text: "Bold Text 6",
      style: "text-3xl font-medium text-navy-500",
    },
  ];

  return (
    <div className="container-fluid">
      <div>
      <NavBar />
      </div>
       
    <div className="relative h-[600px]">
      {images.map((image, i) => (
        <Transition
          key={i}
          show={index === i}
          enter={`transition-all ease-out duration-1000`}
          enterFrom="opacity-0 transform translate-x-full"
          enterTo="opacity-100 transform translate-x-0"
          leave={`transition-all ease-out duration-1000`}
          leaveFrom="opacity-100 transform translate-x-0"
          leaveTo="opacity-0 transform -translate-x-full"
        >
          <div className={`absolute inset-0 z-10`}>
            <div className="relative inset-0">
              <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
              <img className="object-cover w-full h-[600px]" src={image} alt={`Slide ${i + 1}`} />
              <div className={`absolute inset-x-0 bottom-0 text-white bg-gray-800 bg-opacity-70 p-4 ${direction === "right" ? "slide-right" : "slide-left"}`}>{captions[i].text}</div>
            </div>
          </div>
        </Transition>
      ))}
     
    </div>
     <HeroSection />
    </div>
    
  );
}

export default Home;
