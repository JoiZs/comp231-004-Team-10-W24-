import {
  Badge,
  Button,
  Divider,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthCtx } from "../context";

const ReservationConfirmation = ({ iscomplete = true }) => {
  const { rid } = useParams();
  const [reserv, setReserv] = useState();
  const { isAuth } = useContext(AuthCtx);
  const {
    isOpen: isOpenReview,
    onOpen: onOpenReview,
    onClose: onCloseReview,
  } = useDisclosure();
  const toast = useToast();
  const ratingRef = useRef();
  const cmtRef = useRef();

  useEffect(() => {
    const getConfirm = async () => {
      await axios
        .post(
          import.meta.env.VITE_SERV_URL + "/reserve/onereserv",
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
        import.meta.env.VITE_SERV_URL + "/reserve/acpt_updatereserv",
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
            duration: 500,
            status: res.data.type,
            description: res.data.message,
            onCloseComplete: () => {
              if (res.data.type === "success") {
                onOpenReview();
              }
            },
          });
        }
      });
  };

  const reviewHandler = async () => {
    await axios
      .post(
        import.meta.env.VITE_SERV_URL + "/review/postreview",
        {
          rating: parseFloat(ratingRef.current.value),
          comment: cmtRef.current.value,
          sitterId: reserv?.sitterId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data) {
          toast({
            title: "Review Status",
            isClosable: true,
            duration: 1000,
            status: res.data.type,
            description: res.data.message,
            onCloseComplete: () => {
              if (res.data.type === "success") {
                onCloseReview();
              }
            },
          });
        }
      });
  };

  return (
    <div>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenReview}
        onClose={onCloseReview}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a review.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <div className="p-2 flex justify-between">
                <span>Rating:</span>
                <select ref={ratingRef} defaultValue={5}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              <textarea
                ref={cmtRef}
                placeholder="Comment..."
                rows={6}
                className="w-full p-2 border"
              ></textarea>
            </div>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button onClick={reviewHandler}>Submit</Button>
            <Button onClick={onCloseReview}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
          {(isAuth?.Profile?.profileType === "Owner") & iscomplete && (
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
