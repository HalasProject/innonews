import {
  AtSymbolIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";

function AuthPopup({ togglePopup }) {
  const [screenType, setScreenType] = useState("login");

  const displayScreen = () => {
    switch (screenType) {
      case "login":
        return <Login changeScreenTo={setScreenType}></Login>;

      case "register":
        return <Register />;

      case "forgot":
        return <ForgotPassword />;
      default:
        return null;
    }
  };

  const displayFooter = () => {
    if (screenType == "login") {
      return (
        <span>
          Don't have an account ?{" "}
          <a
            onClick={() => setScreenType("register")}
            className="underline cursor-pointer"
          >
            Sing up
          </a>
        </span>
      );
    } else {
      return (
        <span>
          Already have an account ?{" "}
          <a
            onClick={() => setScreenType("login")}
            className="underline cursor-pointer"
          >
            Log in
          </a>
        </span>
      );
    }
  };

  return (
    <div className="bg-gray-500/75 absolute flex justify-center align-center h-screen w-full text-white">
      <div className="divide-y divide-slate-600 absolute bottom-0 top-0 m-auto max-w-md h-fit z-30  bg-gray-800 rounded-xl shadow-lg">
        <div
          id="auth_header"
          className="flex flex-row py-6 px-6 justify-between"
        >
          <span className="text-md font-bold">
            {screenType == "login"
              ? "Log in"
              : screenType == "register"
              ? "Sign up"
              : "Recovery"}{" "}
            to innonews
          </span>
          <XMarkIcon
            className="cursor-pointer"
            onClick={() => togglePopup(false)}
            width={24}
          ></XMarkIcon>
        </div>
        {displayScreen()}
        <div id="auth_footer" className="justify-center flex py-6 ">
          {displayFooter()}
        </div>
      </div>
    </div>
  );
}

export default AuthPopup;
