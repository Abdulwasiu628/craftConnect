import React, {useEffect} from 'react';
import toolsImage from '../assets/tools.jpeg';
import repairImage from '../assets/repair.jpeg';
import "aos/dist/aos.css";
import Aos from 'aos';

const Card = ({ name, text, image }) => {
  return (
    <div className="w-full md:w-1/3 p-4 flex justify-center">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <div className="relative pb-2/3">
          <img
            className=" inset-0 h-full w-full object-cover rounded-t-lg border"
            src={image}
            alt=""
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="mt-2 italic text-gray-600">{text}</p>
          <p className="mt-4 text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
            nulla eget purus venenatis commodo. Maecenas eget turpis nec odio
            elementum dapibus at id lacus. Duis dignissim metus magna, vel
            tincidunt massa faucibus sed.
          </p>
        </div>
      </div>
    </div>
  );
};

const CardsDiv = () => {
    useEffect(() => {
      Aos.init({ duration: 2000 });
    }, []);
  
    const users = [
      {
        name: "John Doe",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: toolsImage,
      },
      {
        name: "Jane Smith",
        text: "Praesent nec velit quis tellus faucibus commodo.",
        image: repairImage,
      },
      {
        name: "Bob Johnson",
        text: "Aliquam vel augue vel orci laoreet molestie in sed metus.",
        image: toolsImage,
      },
    ];
  
    return (
      <div className="flex flex-col items-center mt-20">
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            borderBottom: "4px solid #004c00",
            display: "inline-block",
            width: "fit-content",
            textAlign: "center",
          }}
        >
          User Success Stories
        </h2>
        <div
          className="flex flex-wrap justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {users.map((user, index) => (
            <Card
              key={user.name}
              {...user}
              data-aos={`fade-${index % 2 === 0 ? "right" : "left"}`}
              data-aos-delay={index * 200}
            />
          ))}
        </div>
      </div>
    );
  };
  

  

export default CardsDiv;
