import React, { useRef } from "react";
import { Input, Button, useToast } from "@chakra-ui/react";
import axios from "axios";

const ReservChangeOwner = ({ resv }) => {
  const slotRef = useRef(null);
  const rateRef = useRef(null);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const toast = useToast();

  const changeStatusHandler = async (st) => {
    await axios
      .patch(
<<<<<<< HEAD
        "http://localhost:4000/reserve/req_updatereserv",
=======
        import.meta.env.VITE_SERV_URL + "/reserve/req_updatereserv",
>>>>>>> b2d7069 (build(docker): dockerize the app)
        {
          resvId: resv.reserveId,
          dayRate: parseFloat(rateRef.current.value),
          petCount: parseInt(slotRef.current.value),
          checkIn: new Date(checkInRef.current.value),
          checkOut: new Date(checkOutRef.current.value),
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data) {
          toast({
            title: "Reservation Status",
            isClosable: true,
            duration: 2000,
            status: res.data.type,
            description: res.data.message,
          });
        }
      });
  };

  return (
    <div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-gray-500">Pet Slot:</span>
        <Input ref={slotRef} className="px-2" defaultValue={resv.petCount} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-gray-500">
          Rate Per Day:
        </span>
        <Input
          ref={rateRef}
          type="number"
          className="px-2"
          defaultValue={resv.ratePerDay}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-gray-500">Check In:</span>
        <Input
          ref={checkInRef}
          className="px-2"
          type="date"
          defaultValue={new Date(resv.checkIn).toLocaleDateString()}
        />
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-semibold text-gray-500">Check Out:</span>
        <Input
          ref={checkOutRef}
          className="px-2"
          type="date"
          defaultValue={new Date(resv.checkOut).toLocaleDateString()}
        />
      </div>
      <div className="py-2 flex justify-end">
        <Button onClick={changeStatusHandler}>Submit</Button>
      </div>
    </div>
  );
};

export default ReservChangeOwner;
