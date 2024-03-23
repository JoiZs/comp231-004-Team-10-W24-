import { useContext, useState } from "react";
import { VStack, Breadcrumb, BreadcrumbItem, Divider } from "@chakra-ui/react";
import { RegisterCtx } from "../context";
import Registration1 from "../component/registration1";
import Registration2 from "../component/registration2";
import Registration3 from "../component/registration3";
import { Link } from "react-router-dom";

function Registration() {
  const { registerPl, setRegisterPl } = useContext(RegisterCtx);
  const [pgNum, setPgNum] = useState(1);

  return (
    <VStack
      maxWidth={"md"}
      margin={"auto"}
      flex={1}
      justifyContent={"space-around"}
      alignItems={"flex-end"}
    >
      <h2 className="text-2xl font-semibold mb-5 self-start">
        Account Register
      </h2>

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
      <Divider />
      <span className="text-sm">
        Already have an account?{" "}
        <Link className="font-light" to={"/login"}>
          Login
        </Link>
      </span>
    </VStack>
  );
}

export default Registration;
