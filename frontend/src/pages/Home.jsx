import React from "react";
import { Link } from "react-router-dom";
import house1 from "../assets/house1.jpg";
import house2 from "../assets/house2.jpg";
import house3 from "../assets/house3.jpg";
import house4 from "../assets/house4.jpg";

export default function Home() {
  return (
    <div className="my-6 px-5">
      {/* insert listings here */}
      <div>
        <div className="bg-gray-100">
          <img src={house1} />
        </div>
        Arianna's Pet-Friendly Home
      </div>
    </div>
  );
}
