import React, { useContext } from "react";
import {
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import ReservChangeOwner from "../component/reservChangeOwner";
import ReservChangeSitter from "../component/reservChangeSitter";
import { AuthCtx } from "../context";

const PopoverResvStatus = ({ resv }) => {
  const { isAuth } = useContext(AuthCtx);
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button variant={"solid"}>Change</Button>
      </PopoverTrigger>
      <PopoverContent p={2}>
        <PopoverArrow />
        <PopoverCloseButton />
        {isAuth?.Profile?.profileType === "Owner" && (
          <ReservChangeOwner resv={resv} />
        )}
        {isAuth?.Profile?.profileType === "Sitter" && (
          <ReservChangeSitter reservId={resv.reserveId} />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverResvStatus;
