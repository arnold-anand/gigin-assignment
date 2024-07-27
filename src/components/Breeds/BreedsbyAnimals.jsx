import React, { useEffect, useState } from "react";
import PetListUI from "../PetList/PetList.component";

const BreedsbyAnimals = () => {
  const [pets, setPets] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false); // State for no results

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch("https://pets-v2.dev-apis.com/animals");
        const animalsData = await response.json();
        setAnimals(animalsData.animals);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  useEffect(() => {
    const fetchBreeds = async () => {
      if (!selectedAnimal) return;
      try {
        const response = await fetch(`https://pets-v2.dev-apis.com/breeds?animal=${selectedAnimal}`);
        const breedsData = await response.json();
        setBreeds(breedsData.breeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, [selectedAnimal]);

  const handleAnimalChange = (e) => {
    setSelectedAnimal(e.target.value);
    setSelectedBreed("");
  };

  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
  };

  const handleSearch = async () => {
    if (!selectedAnimal || !selectedBreed) return;
    setIsLoading(true);
    setNoResults(false); // Reset noResults state before fetching
    try {
      const response = await fetch(`https://pets-v2.dev-apis.com/pets?animal=${selectedAnimal}&breed=${selectedBreed}`);
      const petsData = await response.json();
      setPets(petsData.pets);
      if (petsData.pets.length === 0) {
        setNoResults(true); // Set noResults state if no pets are found
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <form className="flex flex-col md:flex-row md:space-x-5 w-full space-y-3 items-center justify-center my-4">
        <span></span>
        <select className="border rounded h-8 w-32 outline-none" name="animal" id="animal" onChange={handleAnimalChange} value={selectedAnimal}>
          <option value="">Select an animal</option>
          {animals.map((animal) => (
            <option className="capitalize" key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>

        {selectedAnimal && (
          <select className="border rounded h-8 w-32 outline-none" name="breed" id="breed" onChange={handleBreedChange} value={selectedBreed}>
            <option value="">Select a breed</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        )}

        <div>
        <button className="bg-indigo-500 text-white rounded py-1 w-32" type="button" onClick={handleSearch}>Search</button>
        </div>
      </form>

      {isLoading ? (
        <div className="flex items-center justify-center h-60">
          <p>Loading...</p> {/* Replace with your loading animation or component */}
        </div>
      ) : noResults ? (
        <div className="flex items-center justify-center text-6xl h-60">
          <p>No results found for the selected animal and breed.</p>
        </div>
      ) : (
        <PetListUI
          pets={pets}
          isLoading={isLoading}
          currentPage={0}
          totalPages={1}
          onPreviousPage={() => {}}
          onNextPage={() => {}}
          onPageClick={() => {}}
        />
      )}
    </div>
  );
};

export default BreedsbyAnimals;