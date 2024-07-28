import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import PetList from "./components/PetList/PetList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetDetails from "./components/PetDetails/PetDetails";
import BreedsbyAnimals from "./components/Breeds/BreedsbyAnimals";
import SearchForm from "./components/SearchByLocation/SearchForm";

function App() {
  return (
    <div className="App p-7 select-none">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="breeds-search" element={<BreedsbyAnimals />} />
          <Route path="location-search" element={<SearchForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
