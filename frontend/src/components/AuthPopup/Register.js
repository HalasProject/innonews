import {
  AtSymbolIcon,
  LockClosedIcon,
  PencilIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import NotyfContext from "../../NotyfContext";
import { AuthContext } from "../../providers/AuthProvider";
import { REGISTER } from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";
function Register() {
  const notyf = useContext(NotyfContext);
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const registration = async () => {
    try {
      const { data } = await axiosInstance.post(REGISTER, {
        email,
        password,
        password_confirmation: passwordConfirmation,
        firstname,
        lastname,
      });
      if (data.success == false) {
        notyf.error(data.message);
      }
      login(data.result);
    } catch (err) {
      console.error(err);
    }
  };

  const isValidForm = () => {
    return (
      email.length > 0 &&
      password.length > 0 &&
      passwordConfirmation.length > 0 &&
      firstname.length > 0 &&
      lastname.length > 0
    );
  };

  return (
    <div id="auth_content" className="py-12 px-12 flex flex-col space-y-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AtSymbolIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          id="input-group-1"
          className="border text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="example@innonews.com"
        />
      </div>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <UserIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            type="text"
            id="input-group-1"
            className="border text-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Firstname"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <UserIcon className="w-5 h-5  text-gray-400" />
          </div>
          <input
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            type="text"
            id="input-group-1"
            className="border text-sm rounded-lg block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Lastname"
          />
        </div>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <LockClosedIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          id="input-group-2"
          className="border text-sm rounded-lg  focus:border-blue-500 block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 ocus:border-blue-500"
          placeholder="Password"
        />
      </div>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <LockClosedIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
          type="password"
          id="input-group-2"
          className="border text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Repeat password"
        />
      </div>

      <div className="flex flex-row items-center justify-center">
        <button
          disabled={!isValidForm()}
          onClick={() => registration()}
          className="bg-purple-500  disabled:cursor-not-allowed text-white w-full px-6 py-2 rounded-md font-semibold"
        >
          Sign up
        </button>
      </div>
      <small className="text-xs text-gray-400">
        By signing up I accept the Terms of Service and the Privacy Policy.
      </small>
    </div>
  );
}

export default Register;
