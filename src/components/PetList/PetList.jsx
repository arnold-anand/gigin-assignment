import React, { useEffect, useState } from "react";
import loadingAnimation from "/Users/arnold/Dev/gigin-assignment/src/assets/LoadingAnimation/animation.json";
import Lottie from "lottie-react";
import { Link, useSearchParams } from "react-router-dom";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const petsPerPage = 10;

  // Initialize currentPage with 0 if not provided
  const currentPage = parseInt(searchParams.get("page") || "0", 10);

  useEffect(() => {
    const fetchPets = async () => {
      setIsLoading(true);
      try {
        // Fetch data from API
        const response = await fetch(`https://pets-v2.dev-apis.com/pets?page=${currentPage}`);
        const data = await response.json();

        // Set pets and calculate totalPages
        setPets(data.pets);
        setTotalPages(Math.ceil(data.numberOfResults / petsPerPage)); // Use Math.ceil for totalPages
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
      setIsLoading(false);
    };

    fetchPets();
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) { // Adjusted to use totalPages - 1
      setSearchParams({ page: currentPage + 1 });
    }
  };

  const handlePageClick = (page) => {
    setSearchParams({ page });
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length <= 15) return description;
    return words.slice(0, 15).join(" ") + "...";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Lottie animationData={loadingAnimation} height={50} width={30} />
      </div>
    );
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {pets.map((pet) => (
              <div key={pet.id} className="p-4 md:w-1/3 hover:scale-105 cursor-pointer">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="w-full object-cover object-center"
                    src={pet.images[0]}
                    alt={pet.name}
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 text-left capitalize">
                        {pet.breed} {pet.animal}
                      </h2>
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 text-left capitalize flex items-center">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
                        </span>
                        <span className="">
                          {pet.city}, {pet.state}
                        </span>
                      </h2>
                    </div>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3 text-left">
                      {pet.name}
                    </h1>
                    <p className="leading-relaxed mb-3 text-left">
                      {truncateDescription(pet.description)}
                    </p>
                    <div className="flex items-center flex-wrap">
                      <Link
                        className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                        to={`/pet/${pet.id}`}
                      >
                        Learn More
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="mr-4 text-gray-500 disabled:text-gray-300"
              onClick={handlePreviousPage}
              disabled={currentPage === 0} // Adjusted for zero-based index
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-1 ${currentPage === index ? 'text-indigo-500' : 'text-gray-500'}`}
                onClick={() => handlePageClick(index)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="text-indigo-500 ml-4 disabled:text-gray-300"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1} // Adjusted for zero-based index
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetList;