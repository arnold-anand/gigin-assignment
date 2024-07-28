import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-white py-4 border-b-[1px]">
      <div className="flex items-center justify-between px-5 lg:px-20">
        <Link to="/">
        <div className="text-2xl ">Pets Directory</div>
        </Link>
        <div className="flex space-x-3">
          <div><Link to="breeds-search">Search by Breeds</Link></div>  
          <div><Link to="location-search">Search by Location</Link></div>  
        </div>
      </div>
    </div>
  );
};

export default Navbar;
