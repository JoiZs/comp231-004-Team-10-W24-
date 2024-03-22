import React from "react";
import { Link } from "react-router-dom";
import house1 from "../assets/house1.jpg";
import house2 from "../assets/house2.jpg";
import house3 from "../assets/house3.jpg";
import house4 from "../assets/house4.jpg";

export default function Home() {
  return (
    <div className="mt-8 px-5 grid gap-y-6 gap-x-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div>
        <div className="bg-gray-500 rounded-2xl mb-2 flex">
          <Link to={"/book"}>
            <img
              className="rounded-2xl object-cover aspect-square"
              src={house1}
            />
          </Link>
        </div>
        <div className="mt-3 text-left">
          <h2 className="text-sm font-bold truncate leading-5">
            Arianna's Pet-Friendly Home
          </h2>
          <h3 className="text-sm leading-5">
            941 Progress Ave, Scarborough M1T3T8
          </h3>
          <h2 className="text-sm font-bold truncate leading-5">
            CAD 45.00 per day
          </h2>
        </div>
      </div>
      <div>
        <div className="bg-gray-500 rounded-2xl flex">
          <Link to={"/book"}>
            <img
              className="rounded-2xl object-cover aspect-square"
              src={house2}
            />
          </Link>
        </div>
        <div className="mt-3 text-left">
          <h2 className="text-sm font-bold truncate leading-5">
            Arianna's Pet-Friendly Home
          </h2>
          <h3 className="text-sm leading-5">
            941 Progress Ave, Scarborough M1T3T8
          </h3>
          <h2 className="text-sm font-bold truncate leading-5">
            CAD 45.00 per day
          </h2>
        </div>
      </div>
      <div>
        <div className="bg-gray-500 rounded-2xl flex">
          <Link to={"/book"}>
            <img
              className="rounded-2xl object-cover aspect-square"
              src={house3}
            />
          </Link>
        </div>
        <div className="mt-3 text-left">
          <h2 className="text-sm font-bold truncate leading-5">
            Arianna's Pet-Friendly Home
          </h2>
          <h3 className="text-sm leading-5">
            941 Progress Ave, Scarborough M1T3T8
          </h3>
          <h2 className="text-sm font-bold truncate leading-5">
            CAD 45.00 per day
          </h2>
        </div>
      </div>
      <div>
        <div className="bg-gray-500 rounded-2xl flex">
          <Link to={"/book"}>
            <img
              className="rounded-2xl object-cover aspect-square"
              src={house4}
            />
          </Link>
        </div>
        <div className="mt-3 text-left">
          <h2 className="text-sm font-bold truncate leading-5">
            Arianna's Pet-Friendly Home
          </h2>
          <h3 className="text-sm leading-5">
            941 Progress Ave, Scarborough M1T3T8
          </h3>
          <h2 className="text-sm font-bold truncate leading-5">
            CAD 45.00 per day
          </h2>
        </div>
      </div>
    </div>
  );
}
