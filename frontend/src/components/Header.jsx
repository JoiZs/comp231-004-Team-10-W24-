import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../context";

export default function Header() {
  const { isAuth, setIsAuth } = useContext(AuthCtx);

  console.log(isAuth);

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
          {isAuth ? (
            <>
              <Link to="/reservations">Reservations</Link>
              <Link to="/me">Profile</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
          {isAuth && (
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
