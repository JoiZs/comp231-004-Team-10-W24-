import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";

const ReservChangeSitter = ({ reservId }) => {
  const toast = useToast();
  const changeStatusHandler = async (st) => {
    await axios
      .patch(
        import.meta.env.VITE_SERV_URL + "/reserve/acpt_updatereserv",
        {
          resvId: reservId,
          status: st,
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
      <h1>Owner's offer</h1>
      <div className="flex flex-row  gap-2 flex-wrap justify-end">
        <Button onClick={() => changeStatusHandler("On-Going")}>Accept</Button>
        <Button onClick={() => changeStatusHandler("Rejected")}>Reject</Button>
      </div>
    </div>
  );
};

export default ReservChangeSitter;
