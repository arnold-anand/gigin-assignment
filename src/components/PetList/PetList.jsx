import React, { useEffect, useState } from "react";
import PetListUI from "./PetList.component";
import { useSearchParams } from "react-router-dom";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const petsPerPage = 10;

  const currentPage = parseInt(searchParams.get("page") || "0", 10);

  useEffect(() => {
    const fetchPets = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://pets-v2.dev-apis.com/pets?page=${currentPage}`);
        const data = await response.json();
        setPets(data.pets);
        setTotalPages(Math.ceil(data.numberOfResults / petsPerPage));
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
    if (currentPage < totalPages - 1) {
      setSearchParams({ page: currentPage + 1 });
    }
  };

  const handlePageClick = (page) => {
    setSearchParams({ page });
  };

  return (
    <PetListUI
      pets={pets}
      isLoading={isLoading}
      currentPage={currentPage}
      totalPages={totalPages}
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
      onPageClick={handlePageClick}
    />
  );
};

export default PetList;