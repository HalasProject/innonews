import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
import NotyfContext from "../../contexts/NotyfContext";
import { AuthContext } from "../../providers/AuthProvider";
import { REGISTER } from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../Spinner";
function Register() {
  const notyf = useContext(NotyfContext);
  const { login } = useContext(AuthContext);
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const initFormData = {
    email: "",
    password: "",
    password_confirmation: "",
    firstname: "",
    lastname: "",
  };

  const [formData, setFormData] = useState(initFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setErrors({ ...errors, [name]: undefined });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setErrors({});
    try {
      const { data } = await axiosInstance.post(REGISTER, formData);
      if (!data.success) {
        notyf.error(data.message);
      } else {
        notyf.success("Registration successful! Welcome to innonews.");
      }
      login(data.result);
    } catch (err) {
      if (err.response.status === 422) {
        setErrors({ ...err.response.data.errors });
      }
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div id="auth_content" className="py-12 px-12 flex flex-col space-y-3">
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AtSymbolIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              onChange={handleInputChange}
              value={formData.email}
              name="email"
              type="email"
              required
              id="email_input"
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
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                onChange={handleInputChange}
                value={formData.firstname}
                type="text"
                required
                id="firstname_input"
                name="firstname"
                className={`border text-sm ${
                  errors.firstname
                    ? "border-red-500 text-red-500"
                    : "border-gray-600 text-white"
                } rounded-lg block w-full pl-10 p-2.5 bg-gray-700  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Firstname"
              />
            </div>
            {errors.firstname &&
              errors.firstname.map((err, key) => (
                <p key={key} className="mt-2 text-sm text-red-500">
                  <span className="font-medium">{err}</span>
                </p>
              ))}
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserIcon className="w-5 h-5  text-gray-400" />
              </div>
              <input
                onChange={handleInputChange}
                value={formData.lastname}
                type="text"
                name="lastname"
                required
                id="lastname_input"
                className={`border text-sm ${
                  errors.lastname
                    ? "border-red-500 text-red-500"
                    : "border-gray-600 text-white"
                } rounded-lg block w-full pl-10 p-2.5 bg-gray-700  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Lastname"
              />
            </div>
            {errors.lastname &&
              errors.lastname.map((err, key) => (
                <p key={key} className="mt-2 text-sm text-red-500">
                  <span className="font-medium">{err}</span>
                </p>
              ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockClosedIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              onChange={handleInputChange}
              value={formData.password}
              name="password"
              type="password"
              required
              id="password_input"
              className={`border text-sm rounded-lg ${
                errors.password
                  ? "border-red-500 text-red-500"
                  : "border-gray-600 text-white"
              }  focus:border-blue-500 block w-full pl-10 p-2.5  bg-gray-700  placeholder-gray-400  focus:ring-blue-500 ocus:border-blue-500`}
              placeholder="Password"
            />
          </div>
          {errors.password &&
            errors.password.map((err, key) => (
              <p key={key} className="mt-2 text-sm text-red-500">
                <span className="font-medium">{err}</span>
              </p>
            ))}
        </div>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockClosedIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              onChange={handleInputChange}
              value={formData.password_confirmation}
              type="password"
              required
              name="password_confirmation"
              id="password_confirmation_input"
              className={`border ${
                errors.password
                  ? "border-red-500 text-red-500"
                  : "border-gray-600 text-white"
              } text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Repeat password"
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center">
          <button
            type="submit"
            disabled={formLoading}
            className="bg-purple-500 flex items-center justify-center disabled:cursor-not-allowed text-white w-full px-6 py-2 rounded-md font-semibold"
          >
            {formLoading && (
              <Spinner className="inline w-5 h-5 mr-3 text-white animate-spin" />
            )}
            Sign up
          </button>
        </div>
        <small className="text-xs text-gray-400">
          By signing up I accept the Terms of Service and the Privacy Policy.
        </small>
      </div>
    </form>
  );
}

export default Register;
