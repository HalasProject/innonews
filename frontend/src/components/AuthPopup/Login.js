import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
import NotyfContext from "../../contexts/NotyfContext";
import { AuthContext } from "../../providers/AuthProvider";
import { LOGIN } from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../Spinner";
function Login({ changeScreenTo }) {
  const notyf = useContext(NotyfContext);
  const { login, toggleAuthPopup } = useContext(AuthContext);
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const initFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initFormData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setErrors({});
    try {
      const { data } = await axiosInstance.post(LOGIN, formData);
      if (data.success == false) {
        notyf.error(data.message);
        setFormData((prevState) => ({
          ...prevState,
          password: "",
        }));
        return;
      }

      login(data.result);
      toggleAuthPopup(false);
    } catch (err) {
      setFormData((prevState) => ({
        ...prevState,
        password: "",
      }));
      if (err.response.status === 422) {
        setErrors({ ...err.response.data.errors });
      }
      if (err.response?.data?.message) {
        notyf.error(err.response.data.message);
      }

      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setErrors({ ...errors, [name]: undefined });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div id="auth_content" className="py-12 px-12 flex flex-col space-y-3">
        <div className="">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AtSymbolIcon className="w-5 h-5  text-gray-400" />
            </div>
            <input
              onChange={handleInputChange}
              value={formData.email}
              type="email"
              name="email"
              id="email_input"
              required
              className={`border ${
                errors.email
                  ? "border-red-500 text-red-500"
                  : "border-gray-600 text-white"
              } text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500`}
              placeholder="example@innonews.com"
            />
          </div>
          {errors.email &&
            errors.email.map((err, key) => (
              <p key={key} className="mt-2 text-sm text-red-500">
                <span className="font-medium">{err}</span>
              </p>
            ))}
        </div>

        <div className="mb-6">
          <div className="relative ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockClosedIcon className="w-5 h-5  text-gray-400" />
            </div>
            <input
              onChange={handleInputChange}
              value={formData.password}
              type="password"
              name="password"
              id="password_input"
              required
              className={`bordertext-sm ${
                errors.password
                  ? "border-red-500 text-red-500"
                  : "border-gray-600 text-white"
              } rounded-lg block w-full pl-10 p-2.5 bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="password"
            />
          </div>
          {errors.password &&
            errors.password.map((err, key) => (
              <p key={key} className="mt-2 text-sm text-red-500">
                <span className="font-medium">{err}</span>
              </p>
            ))}
        </div>

        <div className="flex flex-row items-center space-x-12 justify-between">
          <span
            onClick={() => changeScreenTo("forgot")}
            className="text-gray-400 underline cursor-pointer"
          >
            Forgot password?
          </span>
          <button
            type="submit"
            disabled={formLoading}
            className="bg-purple-600 flex justify-center items-center disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-semibold"
          >
            {formLoading && (
              <Spinner className="inline w-5 h-5 mr-3 text-white animate-spin" />
            )}
            Log in
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
