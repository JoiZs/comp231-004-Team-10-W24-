import React, { useRef, useState } from "react";
import { Select, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReservationConfirmation from "./ReservationConfirmation";

export default function Book({ sitterId }) {
  const checkInDate = useRef();
  const checkOutDate = useRef();
  const numOfPet = useRef();
  const dayRate = useRef();
  const petType = useRef();
  const msgRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservationData, setReservationData] = useState(null);

  const bookHandler = async () => {
    await axios
      .post(
        "http://localhost:4000/reserve/create",
        {
          sitterId: sitterId,
          petCount: parseInt(numOfPet.current.value),
          petType: petType.current.value,
          checkIn: new Date(checkInDate.current.value),
          checkOut: new Date(checkOutDate.current.value),
          ratePerDay: parseFloat(dayRate.current.value),
          messageTxt: msgRef.current.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data) {
          toast({
            title: "Reservation",
            status: res.data.type,
            description: res.data.message,
            isClosable: true,
            onCloseComplete: () => {
              navigate("/reservations");
            },
          });
          // Store reservation data
          setReservationData({
            sitterId: sitterId,
            petCount: parseInt(numOfPet.current.value),
            petType: petType.current.value,
            checkIn: new Date(checkInDate.current.value),
            checkOut: new Date(checkOutDate.current.value),
            ratePerDay: parseFloat(dayRate.current.value),
            messageTxt: msgRef.current.value,
          });
          // Show confirmation dialog
          setShowConfirmation(true);
        }
      })
      .catch((err) => {
        toast({
          title: "Reservation",
          status: "error",
          description: "Internal Server Error.",
        });
      });
  };

  return (
    <div className="bg-gray-100 max-w-none m-auto">
      <div className="bg-white p-4 rounded-lg">
        <div className="border rounded-2xl">
          <div className="flex flex-row flex-wrap">
            <div className="p-3 px-4">
              <label>Check in date: </label>
              <input ref={checkInDate} type="date" />
            </div>
            <div className="p-3 px-4 border-l">
              <label>Check out date: </label>
              <input ref={checkOutDate} type="date" />
            </div>
          </div>
          <div className="p-3 px-4 border-t">
            <label>Number of pets</label>
            <input
              ref={numOfPet}
              className="border rounded-lg p-1 m-1"
              type="number"
              defaultValue={1}
            />
          </div>
          <div className="p-3 px-4 border-t">
            <label>Day Rate</label>
            <input
              ref={dayRate}
              className="border rounded-lg p-1 m-1"
              type="number"
              defaultValue={1}
            />
          </div>
          <div className="p-3 px-4 border-t flex flex-row">
            <label>Pet Type</label>
            <Select ref={petType} defaultValue={"Dog"}>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
            </Select>
          </div>
          <div className="p-3 px-4 border-t flex flex-row">
            <textarea
              ref={msgRef}
              className="border rounded-lg p-1 m-1 flex-1"
              type="number"
              placeholder="Message Something..."
            />
          </div>
        </div>
        <div className="p-2 w-full">
          {showConfirmation ? (
            <ReservationConfirmation reservationData={reservationData} />
          ) : (
            <Button onClick={bookHandler} colorScheme="blue" w={"full"}>
              Book this for my pet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
