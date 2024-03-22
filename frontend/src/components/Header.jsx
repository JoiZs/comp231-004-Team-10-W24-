import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";

export default function Header() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (    
    <header className="bg-slate-200 shadow-md">
      <div className="border-stone-600  flex  justify-between items-center max-w-none mx-auto p-3 px-5 ">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
        <Link to={"/"}>
          <span className="text-blue-800">PetCare</span>
          </Link>
          <span className="text-yellow-600">BnB</span>
        </h1>
        <ul className="flex gap-4">
          <li>
          {isAuthenticated ? (
              <>
                <Link to="/reservations">Reservations</Link>
                <Link to="/profile">Profile</Link>
              </>
            ) : (
              <button onClick={() => loginWithRedirect()}>Log in</button>
            )}
            {isAuthenticated && (
              <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}