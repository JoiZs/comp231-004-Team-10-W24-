import { useContext, useState } from "react";
import { VStack, Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { RegisterCtx } from "../context";
import Registration1 from "../component/registration1";
import Registration2 from "../component/registration2";
import Registration3 from "../component/registration3";

function Registration() {
  const { registerPl, setRegisterPl } = useContext(RegisterCtx);
  const [pgNum, setPgNum] = useState(1);

  console.log(registerPl);

  return (
    <VStack
      maxWidth={"md"}
      margin={"auto"}
      flex={1}
      justifyContent={"space-around"}
      alignItems={"flex-end"}
    >
      <Breadcrumb fontSize={"sm"}>
        <BreadcrumbItem
          cursor={"pointer"}
          isCurrentPage={1 == pgNum}
          fontWeight={1 == pgNum && "600"}
          onClick={() => {
            setPgNum(1);
          }}
        >
          <span>Location</span>
        </BreadcrumbItem>

        <BreadcrumbItem
          cursor={"pointer"}
          isCurrentPage={2 == pgNum}
          fontWeight={2 == pgNum && "600"}
          onClick={() => {
            if (!!registerPl?.locDisplay) setPgNum(2);
          }}
        >
          <span>User Info</span>
        </BreadcrumbItem>

        <BreadcrumbItem
          cursor={"pointer"}
          onClick={() => {
            if (
              registerPl?.firstname ||
              registerPl?.lastname ||
              registerPl?.email ||
              registerPl?.password
            )
              setPgNum(3);
          }}
          isCurrentPage={3 == pgNum}
          fontWeight={3 == pgNum && "600"}
        >
          <span>Confirmation</span>
        </BreadcrumbItem>
      </Breadcrumb>
      {pgNum == 1 && <Registration1 setPgNum={setPgNum} />}
      {pgNum == 2 && <Registration2 setPgNum={setPgNum} />}
      {pgNum == 3 && <Registration3 setPgNum={setPgNum} />}
    </VStack>
  );
}

export default Registration;
