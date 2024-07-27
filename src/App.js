import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import PetList from "./components/PetList/PetList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetDetails from "./components/PetDetails/PetDetails";

function App() {
  return (
    <div className="App p-7">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/pet/:id" element={<PetDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
