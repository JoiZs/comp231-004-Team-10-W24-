import React from "react";
import house1 from "../assets/house1.jpg";
import house2 from "../assets/house2.jpg";
import house3 from "../assets/house3.jpg";
import house4 from "../assets/house4.jpg";

export default function Book() {
  return (
    <div className="mt-4 bg-gray-100 max-w-none mx-auto px-8 p-4">
      <h1 className="mb-2 text-3xl">Arianna's Pet Friendly Home</h1>
      <a
        className="bock font-semibold underline"
        target="_blank"
        href="https://maps.google.com/?q=941 Progress Ave"
      >
        941 Progress Ave, Scarborough M1T3T8
      </a>
      <div className="relative">
        <div className="mt-3 grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden ">
          <div>
            <div>
              <img
                className="aspect-square object-cover w-full h-full"
                src={house1}
              />
            </div>
          </div>
          <div className="grid">
            <img
              className="aspect-square object-cover w-full h-full"
              src={house2}
            />
            <div className="overflow-hidden">
              <img
                className="aspect-square object-cover relative top-2 w-full h-full"
                src={house3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-8">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl my-2">Description</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          Check-in: 8:00 AM
          <br />
          Check-out: 7:00PM
          <br />
          Pet Type: Dog
          <br />
          Total Slots: 5
          <br />
          Available Slot/s: 3
        </div>
        <div>
          <div className="bg-white shadow p-4 rounded-lg">
            <div className="text-xl text-center">Price: 45 per day</div>
            <div className="border rounded-2xl mt-4 mb-4">
              <div className="flex">
                <div className="p-3 px-4">
                  <label>Check in date: </label>
                  <input type="date" />
                </div>
                <div className="p-3 px-4 border-l">
                  <label>Check out date: </label>
                  <input type="date" />
                </div>
              </div>
              <div className="p-3 px-4 border-t">
                <label>Number of pets: </label>
                <input className="border rounded-lg" type="number" value={1} />
              </div>
            </div>
            <button className="green">Book this for my pet</button>
          </div>
        </div>
      </div>
    </div>
  );
}
