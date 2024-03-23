import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthCtx } from "../context";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, setIsAuth } = useContext(AuthCtx);
  const navigate = useNavigate();

  const toast = useToast();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "http://localhost:4000/auth/login",
        { email: username, password },
        { withCredentials: true }
      )
      .then((res) => {
        toast({
          title: "Login",
          status: res.data.type,
          description: res.data.message,
          isClosable: true,
          duration: 2000,
          onCloseComplete: async () => {
            if (res.data.type == "success") {
              setIsAuth(true);
              // navigate("/");
              await axios
                .get("http://localhost:4000/profile/me", {
                  withCredentials: true,
                })
                .then((rrs) => console.log(rrs));
            }
          },
        });
      });
  };

  return (
    <div className="p-5 max-w-md w-full flex justify-center flex-col">
      <h2 className="text-2xl font-semibold mb-5">Account Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="username"
            type="email"
            value={username}
            aria-autocomplete="none"
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </div>
      </form>
      <span className="self-end text-sm">
        New here?<Link to={"/register"}> To Register</Link>
      </span>
    </div>
  );
};

export default Login;
