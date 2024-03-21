import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="border-stone-600  flex  justify-between items-center max-w-none mx-auto p-3 px-5 ">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-blue-800">PetCare</span>
          <span className="text-yellow-600">BnB</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search location..."
            className="bg-transparent focus:outline-none w-30 sm:w-64"
          ></input>
          <FaSearch className="bg-transparent"></FaSearch>
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="text-slate-500 hover:underline">Home</li>
          </Link>
          <li className="text-slate-500 hover:underline">About</li>
          <Link to={"/signup"}>
            <li className="text-slate-500 hover:underline">SignUp</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
