import { AtSymbolIcon } from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
import NotyfContext from "../../contexts/NotyfContext";
import { FORGOT_PASSWORD } from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../Spinner";

function ForgotPassword() {
  const notyf = useContext(NotyfContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setErrors({});
    setMessage(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage(null);
    setErrors({});
    try {
      const { data } = await axiosInstance.post(FORGOT_PASSWORD, { email });
      if (!data.success) {
        notyf.error(data.message);
        return;
      }

      if (data.message) {
        setMessage(data.message);
      }
    } catch (err) {
      if (err.response?.status === 422) {
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

  return (
    <form onSubmit={handleFormSubmit}>
      <div id="auth_content" className="py-12 px-12 flex flex-col space-y-3">
        <p className="text-gray-400 text-sm">
          Enter the email address you registered with and we will send you a
          verification code.
        </p>
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AtSymbolIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="email_input"
              value={email}
              required
              onChange={handleInputChange}
              name="email"
              className={`border ${
                errors?.email
                  ? "border-red-500 text-red-500"
                  : "border-gray-600 text-white"
              } ${
                message
                  ? "border-green-500 text-green-500"
                  : "border-gray-600 text-white"
              } text-sm rounded-lg  block w-full pl-10 p-2.5  bg-gray-700  placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="example@innonews.com"
            />
          </div>
          {message && (
            <p className="mt-2 text-sm text-green-500 ">
              <span className="font-medium">{message}</span>
            </p>
          )}
          {errors.email &&
            errors.email.map((err, key) => (
              <p key={key} className="mt-2 text-sm text-red-500 ">
                <span className="font-medium">{err}</span>
              </p>
            ))}
        </div>

        <div className="flex flex-row items-center justify-center">
          <button
            type="submit"
            disabled={formLoading}
            className="bg-purple-500 disabled:cursor-not-allowed flex items-center justify-center w-full text-white px-6 py-2 rounded-md font-semibold"
          >
            {formLoading && (
              <Spinner className="inline w-5 h-5 mr-3 text-white animate-spin" />
            )}
            Send verification code
          </button>
        </div>
      </div>
    </form>
  );
}

export default ForgotPassword;
