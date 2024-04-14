import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../context";
import axios from "axios";
import {
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Header() {
  const { isAuth, setIsAuth } = useContext(AuthCtx);
  const navigate = useNavigate();

  const LogoutHandler = async () => {
    await axios
      .delete(import.meta.env.VITE_SERV_URL + "/auth/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setIsAuth(false);
          navigate("/");
        }
      });
  };

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="border-stone-600  flex  justify-between items-center max-w-none mx-auto p-3 px-5 ">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <Link to={"/"}>
            <span className="text-blue-800">PetCare</span>
          </Link>
          <span className="text-yellow-600">BnB</span>
        </h1>
        <div className="flex gap-4 items-center text-sm">
          <Link to={"/"}>
            <span>Home</span>
          </Link>
          {isAuth ? (
            <Menu>
              <MenuButton
                cursor={"pointer"}
                as={Badge}
                variant={"solid"}
                colorScheme="blue"
              >
                {isAuth.firstname + " " + isAuth.lastname} <ChevronDownIcon />
              </MenuButton>
              <MenuList p={2}>
                <MenuItem as={Link} to={"/reservations"}>
                  Reservations
                </MenuItem>
                <MenuItem as={Link} to={"/me"}>
                  My Profile
                </MenuItem>
                <MenuItem as={Button} size={"xs"} onClick={LogoutHandler}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
