import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loadingAnimation from "/Users/arnold/Dev/gigin-assignment/src/assets/LoadingAnimation/animation.json";
import Lottie from "lottie-react";
const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPet(data.pets[0]);
      })
      .catch((error) => console.error("Error fetching pet details:", error));
  }, [id]);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? pet.images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === pet.images.length - 1 ? 0 : prevIndex + 1));
  };

  if (!pet) {
    return <div className="flex items-center justify-center h-screen w-full">
    <Lottie
      animationData={loadingAnimation}
      height={50}
      width={30}
      className=""
    ></Lottie>
  </div>
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-[95%] mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 text-left capitalize">
                {pet.name}
              </h1>
              <div className="flex mb-4">
                <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1 text-left">
                  Description
                </a>
              </div>
              <p className="leading-relaxed mb-4 text-start">{pet.description}</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Animal</span>
                <span className="ml-auto text-gray-900 capitalize">{pet.animal}</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Breed</span>
                <span className="ml-auto text-gray-900">{pet.breed}</span>
              </div>
              <div className="flex border-t border-b border-gray-200 py-2">
                <span className="text-gray-500">City</span>
                <span className="ml-auto text-gray-900">{pet.city}</span>
              </div>
              <div className="flex border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">State</span>
                <span className="ml-auto text-gray-900">{pet.state}</span>
              </div>
            </div>
            <div className="flex items-center">
              {/* Previous arrow */}
              <button onClick={handlePreviousImage} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 lg:size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <div>
              <img
                alt="ecommerce"
                className="object-cover object-center rounded w-[400px]"
                src={pet.images[currentImageIndex]}
              />
              </div>
              {/* Next arrow */}
              <button onClick={handleNextImage} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 lg:size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetDetails;