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
import { REGISTER, USER_UPDATE_PASSWORD } from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";
function Register() {
  const notyf = useContext(NotyfContext);

  const initFormData = {
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  };
  const [formData, setFormData] = useState(initFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Clear the error for the input when the user interacts with it
    setErrors({ ...errors, [name]: undefined });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const { data } = await axiosInstance.put(USER_UPDATE_PASSWORD, formData);
      if (!data.success) {
        notyf.error(data.message);
      }
      if (data.message) {
        notyf.success(data.message);
      }
      setFormData(initFormData);
    } catch (err) {
      if (err.response.status === 422) {
        setErrors({ ...err.response.data.errors });
      }
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div id="auth_content" className="py-12 px-12 flex flex-col space-y-3">
        <div className="">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockClosedIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              onChange={handleInputChange}
              value={formData.current_password}
              name="current_password"
              type="password"
              required
              id="current_password_input"
              className={`border text-sm rounded-lg ${
                errors.current_password
                  ? "border-red-500 text-red-500"
                  : "border-gray-600 text-white"
              }  focus:border-blue-500 block w-full pl-10 p-2.5  bg-gray-700  placeholder-gray-400  focus:ring-blue-500 ocus:border-blue-500`}
              placeholder="Current Password"
            />
          </div>
          {errors.current_password &&
            errors.current_password.map((err, key) => (
              <p key={key} className="mt-2 text-sm text-red-500">
                <span className="font-medium">{err}</span>
              </p>
            ))}
        </div>

        <div className="">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockClosedIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              onChange={handleInputChange}
              value={formData.new_password}
              name="new_password"
              type="password"
              required
              id="new_password_input"
              className={`border text-sm rounded-lg ${
                errors.new_password
                  ? "border-red-500 text-red-500"
                  : "border-gray-600 text-white"
              }  focus:border-blue-500 block w-full pl-10 p-2.5  bg-gray-700  placeholder-gray-400  focus:ring-blue-500 ocus:border-blue-500`}
              placeholder="New Password"
            />
          </div>
          {errors.new_password &&
            errors.new_password.map((err, key) => (
              <p key={key} className="mt-2 text-sm text-red-500">
                <span className="font-medium">{err}</span>
              </p>
            ))}
        </div>

        <div className="">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockClosedIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              onChange={handleInputChange}
              value={formData.new_password_confirmation}
              type="password"
              required
              name="new_password_confirmation"
              id="new_password_confirmationn_input"
              className={`border ${
                errors.new_password
                  ? "border-red-500 text-red-500"
                  : "border-gray-600 text-white"
              } text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Repeat new password"
            />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center">
          <button
            thype="submit"
            className="bg-purple-500  disabled:cursor-not-allowed text-white w-full px-6 py-2 rounded-md font-semibold"
          >
            Update Password
          </button>
        </div>
      </div>
    </form>
  );
}

export default Register;
