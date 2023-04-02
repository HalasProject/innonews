import React, { useContext, useEffect, useState } from "react";
import AuthPopup from "./components/AuthPopup/AuthPopup";
import Home from "./pages/Home";
import "notyf/notyf.min.css";
import { AuthContext } from "./providers/AuthProvider";
import axiosInstance from "./utils/axiosInstance";
import { USER_INFO } from "./utils/api";
import UserPopup from "./components/UserPopup/UserPopup";
import Spinner from "./components/Spinner";

const App = React.memo(() => {
  const { showAuthPopup, toggleAuthPopup, login, user } =
    useContext(AuthContext);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    // Check if user is connected
    const userLogin = async () => {
      try {
        if (localStorage.getItem("token")) {
          axiosInstance.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("token");
          const {
            data: { result },
          } = await axiosInstance.get(USER_INFO);
          login({
            user: result,
            token: localStorage.getItem("token"),
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        isLoading(false);
      }
    };

    userLogin();
  }, []);
  return (
    <div className="App bg-gray-700">
      {loading && (
        <div className="z-50 bg-gray-700 h-screen w-full absolute flex flex-col space-y-4 justify-center items-center">
          <div className="text-6xl text-gray-300 font-extralight ">
            Inno<span className="text-red-500 animate-pulse">news</span>
          </div>
          <div role="status">
            <Spinner className="w-8 h-8 mr-2 text-gray-600 fill-red-600" />
          </div>
        </div>
      )}
      {showAuthPopup && !user && (
        <AuthPopup togglePopup={toggleAuthPopup}></AuthPopup>
      )}
      {showAuthPopup && user && (
        <UserPopup togglePopup={toggleAuthPopup}></UserPopup>
      )}
      <Home />
    </div>
  );
});

export default App;
