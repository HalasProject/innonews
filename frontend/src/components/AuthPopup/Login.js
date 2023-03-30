import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import NotyfContext from "../../NotyfContext";
import { AuthContext } from "../../providers/AuthProvider";
import { LOGIN } from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";
function Login({ changeScreenTo }) {
  const notyf = useContext(NotyfContext);
  const { login, toggleAuthPopup } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authentication = async () => {
    try {
      const { data } = await axiosInstance.post(LOGIN, {
        email,
        password,
      });
      if (data.success == false) {
        notyf.error(data.message);
        setPassword("");
        return;
      }

      login(data.result);
      toggleAuthPopup(false);
    } catch (err) {
      console.error(err);
    }
  };

  const isValidForm = () => {
    return email.length > 0 && password.length > 0;
  };

  return (
    <div id="auth_content" className="py-12 px-12 flex flex-col space-y-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AtSymbolIcon className="w-5 h-5  text-gray-400" />
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          id="input-group-1"
          className=" border  text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="example@innonews.com"
        />
      </div>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <LockClosedIcon className="w-5 h-5  text-gray-400" />
        </div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          id="input-group-2"
          className="bordertext-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="password"
        />
      </div>

      <div className="flex flex-row items-center space-x-12 justify-between">
        <span
          onClick={() => changeScreenTo("forgot")}
          className="text-gray-400 underline cursor-pointer"
        >
          Forgot password?
        </span>
        <button
          disabled={!isValidForm()}
          onClick={() => authentication()}
          className="bg-purple-500 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-semibold"
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export default Login;
