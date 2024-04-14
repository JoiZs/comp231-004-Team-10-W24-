import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { Button, Badge } from "@chakra-ui/react";
import PopoverResvStatus from "../component/popoverResvStatus";
import { Link } from "react-router-dom";

const Reservation = () => {
  const [reserv, setReserv] = useState([]);
  const [resStatus, setResStatus] = useState(undefined);

  useLayoutEffect(() => {
    const reqReserv = async () => {
      await axios
        .post(
<<<<<<< HEAD
          "http://localhost:4000/reserve/reserv",
=======
          import.meta.env.VITE_SERV_URL + "/reserve/reserv",
>>>>>>> b2d7069 (build(docker): dockerize the app)
          { status: resStatus },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data) setReserv(res.data.data);
        });
    };

    reqReserv();
  }, [resStatus]);

  const ResStatusHandler = (st) => {
    if (resStatus === st) {
      setResStatus(undefined);
    } else {
      setResStatus(st);
    }
  };

  return (
    <div className="flex max-w-lg w-full flex-col h-full">
      <div className="flex flex-row justify-between p-4">
        <Button
          variant={resStatus == "Pending" ? "solid" : "outline"}
          onClick={() => ResStatusHandler("Pending")}
          size={"sm"}
          borderRadius={"full"}
          colorScheme="blue"
        >
          Pending
        </Button>
        <Button
          variant={resStatus == "Completed" ? "solid" : "outline"}
          onClick={() => ResStatusHandler("Completed")}
          size={"sm"}
          borderRadius={"full"}
          colorScheme="blue"
        >
          Completed
        </Button>
        <Button
          variant={resStatus == "Rejected" ? "solid" : "outline"}
          onClick={() => ResStatusHandler("Rejected")}
          size={"sm"}
          borderRadius={"full"}
          colorScheme="blue"
        >
          Rejected
        </Button>
        <Button
          variant={resStatus == "On-Going" ? "solid" : "outline"}
          onClick={() => ResStatusHandler("On-Going")}
          size={"sm"}
          borderRadius={"full"}
          colorScheme="blue"
        >
          On-Going
        </Button>
      </div>
      {reserv?.length <= 0 && <span>No reservation has been made.</span>}
      <div className="flex flex-col gap-2 flex-1">
        {reserv?.map((el, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col p-2 h-full rounded-md border-blue-100 border gap-2"
            >
              <div className="flex flex-row justify-evenly">
                <div className="flex flex-col flex-1">
                  <Badge>Owner</Badge>
                  <div className="flex flex-row">
                    Name: {el.owner.firstname + " " + el.owner.lastname}
                  </div>
                  <div className="flex flex-row">Email: {el.owner.email}</div>
                </div>
                <div className="flex flex-col flex-1">
                  <Badge>Sitter</Badge>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      Name: {el.sitter.firstname + " " + el.sitter.lastname}
                    </div>
                    <div className="flex flex-row">
                      Email: {el.sitter.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 tracking-wide rounded-lg p-2">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold underline">
                    Pet Slot:
                  </span>
                  <span className="px-2">{el.petCount}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold underline">
                    Status:
                  </span>
                  <span className="px-2">{el.status}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold underline">
                    Rate Per Day:
                  </span>
                  <span className="px-2">{el.ratePerDay}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold underline">
                    Check In:
                  </span>
                  <span className="px-2">
                    {new Date(el.checkIn).toDateString()}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold underline">
                    Check Out:
                  </span>
                  <span className="px-2">
                    {new Date(el.checkOut).toDateString()}
                  </span>
                </div>
                <div className="flex justify-end gap-2">
                  <PopoverResvStatus resv={el} />
                  <Link to={`/chat/${el.reserveId}`}>
                    <Button variant={"solid"}>Chat</Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reservation;
