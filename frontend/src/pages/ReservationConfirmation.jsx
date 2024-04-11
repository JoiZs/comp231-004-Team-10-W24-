import { Badge, Button, Divider, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthCtx } from "../context";

const ReservationConfirmation = () => {
  const { rid } = useParams();
  const [reserv, setReserv] = useState();
  const { isAuth } = useContext(AuthCtx);
  const toast = useToast();

  useEffect(() => {
    const getConfirm = async () => {
      await axios
        .post(
          "http://localhost:4000/reserve/onereserv",
          { resId: rid },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data) setReserv(res.data.data);
        });
    };

    getConfirm();
  }, [rid]);

  const completeHandler = async () => {
    await axios
      .patch(
        "http://localhost:4000/reserve/acpt_updatereserv",
        { resvId: rid, status: "Completed" },
        {
          withCredentials: true,
        }
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
      <div className="flex max-w-lg w-full flex-col h-full">
        <div className="flex flex-col p-2 h-full gap-2 justify-center">
          <h1 className="font-semibold text-2xl">Confirmation</h1>
          <div className="flex flex-col gap-4 justify-evenly">
            <div className="flex flex-col flex-1">
              <Badge>
                <h2 className="font-semibold text-sm">Owner</h2>
              </Badge>
              <div className="px-4">
                <div className="flex flex-row">
                  Name:{" "}
                  {reserv?.owner?.firstname + " " + reserv?.owner?.lastname}
                </div>
                <div className="flex flex-row">
                  Email: {reserv?.owner?.email}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <Badge>
                <h2 className="font-semibold text-sm">Sitter</h2>
              </Badge>
              <div className="flex flex-col">
                <div className="px-4">
                  <div className="flex flex-row">
                    Name:{" "}
                    {reserv?.sitter?.firstname + " " + reserv?.sitter?.lastname}
                  </div>
                  <div className="flex flex-row">
                    Email: {reserv?.sitter?.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Badge>
            <h2 className="font-semibold text-sm">Reservation</h2>
          </Badge>
          <div className="grid grid-cols-3 gap-4 tracking-wide rounded-lg p-2">
            <div className="flex flex-col">
              <span className="text-sm font-semibold underline">Status:</span>
              <span className="px-2">{reserv?.status}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold underline">Check In:</span>
              <span className="px-2">
                {new Date(reserv?.checkIn).toDateString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold underline">
                Check Out:
              </span>
              <span className="px-2">
                {new Date(reserv?.checkOut).toDateString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col text-sm">
            <Badge>
              <h2 className="font-semibold text-sm">Estimated Cost</h2>
            </Badge>
            <div className="px-4 text-gray-500">
              <div className="flex flex-row justify-between">
                <span>Pet Count</span>
                <span>x {reserv?.petCount}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Day Count</span>
                <span>
                  x{" "}
                  {new Date(reserv?.checkOut).getDate() -
                    new Date(reserv?.checkIn).getDate()}
                </span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Rate Per Day</span>
                <span> {reserv?.ratePerDay}</span>
              </div>
              <Divider />
              <div className="flex flex-row justify-between font-semibold">
                <span>Est. subtotal</span>
                <span>
                  {" "}
                  {reserv?.ratePerDay *
                    reserv?.petCount *
                    (new Date(reserv?.checkOut).getDate() -
                      new Date(reserv?.checkIn).getDate())}
                </span>
              </div>
            </div>
          </div>
          {isAuth?.Profile?.profileType === "Sitter" && (
            <div>
              <Button
                onClick={completeHandler}
                className="w-full"
                colorScheme="blue"
              >
                Complete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmation;
