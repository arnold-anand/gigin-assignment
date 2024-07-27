import React, { useEffect, useState } from "react";
import loadingAnimation from "/Users/arnold/Dev/gigin-assignment/src/assets/LoadingAnimation/animation.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 10;
  const startId = 1;
  const endId = 63;

  const fetchPetById = async (id) => {
    try {
      const response = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`);
      const data = await response.json();
      return data.pets[0]; // Assuming the API returns an array of pets
    } catch (error) {
      console.error("Error fetching pet:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchPets = async () => {
      setIsLoading(true);
      const startIdForPage = startId + (currentPage - 1) * petsPerPage;
      const endIdForPage = Math.min(startIdForPage + petsPerPage - 1, endId);
      const petPromises = [];

      for (let id = startIdForPage; id <= endIdForPage; id++) {
        petPromises.push(fetchPetById(id));
      }

      const petsData = await Promise.all(petPromises);
      setPets(petsData.filter(Boolean)); // Filter out null values
      setIsLoading(false);
    };

    fetchPets();
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil((endId - startId + 1) / petsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length <= 15) return description;
    return words.slice(0, 15).join(" ") + "...";
  };

  const totalPages = Math.ceil((endId - startId + 1) / petsPerPage);

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
              <div key={pet.id} className="p-4 md:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="w-full object-cover object-center"
                    src={pet.images[0]}
                    alt={pet.name}
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 text-left capitalize">
                      {pet.breed} {pet.animal}
                    </h2>
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
                      <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
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
                        {pet.city}, {pet.state}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="mr-4 text-gray-500 disabled:text-gray-300"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`mx-1 text-gray-500 ${
                  index + 1 === currentPage ? "font-bold" : ""
                }`}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="ml-4 text-indigo-500 disabled:text-gray-300"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
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