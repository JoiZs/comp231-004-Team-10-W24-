import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../context";
import axios from "axios";

export default function Header() {
  const { isAuth, setIsAuth } = useContext(AuthCtx);
  const navigate = useNavigate();

  const LogoutHandler = async () => {
    await axios
      .delete("http://localhost:4000/auth/logout", {
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
        <div className="flex gap-4">
          <Link to={"/"}>
            <span>Home</span>
          </Link>
          {isAuth ? (
            <>
              <Link to="/reservations">Reservations</Link>
              <Link to="/me">Profile</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
          {isAuth && <button onClick={LogoutHandler}>Logout</button>}
        </div>
      </div>
    </header>
  );
}
