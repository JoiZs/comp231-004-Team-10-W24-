import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="my-6">
      Home
      <div className="my-6">
        <Link to={"/book"}>
          <button className="bg-slate-300 p-3 rounded-xl">Book Now</button>
        </Link>
      </div>
    </div>
  );
}
