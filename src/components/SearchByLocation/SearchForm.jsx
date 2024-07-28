import React, { useEffect, useState } from 'react';
import PetListUI from '../PetList/PetList.component';

const SearchForm = () => {
  const [pets, setPets] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

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

  useEffect(() => {
    console.log("start")
    const fetchLocations = async () => {
      let allLocations = [];
      for (let id = 1; id <= 63; id++) {
        try {
          const response = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
          const data = await response.json();
          
          const location = `${data.pets[0].city}, ${data.pets[0].state}`;
          if (!allLocations.includes(location)) {
            allLocations.push(location);
          }
        } catch (error) {
          console.error(`Error fetching location data for id ${id}:`, error);
        }
      }
      console.log("end");
      setLocations(allLocations);
    };

    fetchLocations();
  }, []);

  const handleAnimalChange = (e) => {
    setSelectedAnimal(e.target.value);
    setSelectedBreed("");
  };

  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSearch = async () => {
    if (!selectedAnimal || !selectedBreed || !selectedLocation) return;
    setIsLoading(true);
    setNoResults(false);
    const [city, state] = selectedLocation.split(", ");
    try {
      const response = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${selectedAnimal}&city=${city}&breed=${selectedBreed}&state=${state}`
      );
      const petsData = await response.json();
      setPets(petsData.pets);
      if (petsData.pets.length === 0) {
        setNoResults(true);
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

        <select className="border rounded h-8 w-32 outline-none" name="location" id="location" onChange={handleLocationChange} value={selectedLocation}>
          <option value="">Select a location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        <div>
          <button className="bg-indigo-500 text-white rounded py-1 w-32" type="button" onClick={handleSearch}>Search</button>
        </div>
      </form>

      {isLoading ? (
        <div className="flex items-center justify-center h-60">
          <p>Loading...</p>
        </div>
      ) : noResults ? (
        <div className="flex items-center justify-center text-6xl h-60">
          <p>No results found for the selected animal, breed, and location.</p>
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

export default SearchForm;