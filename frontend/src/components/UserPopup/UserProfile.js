import { AtSymbolIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
import NotyfContext from "../../contexts/NotyfContext";
import { AuthContext } from "../../providers/AuthProvider";
import {
  SEND_EMAIL_VERIFICATION,
  USER_REMOVE_AVATAR,
  USER_UPDATE_INFO,
} from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";
import Spinner from "../Spinner";

function UserProfile() {
  const notyf = useContext(NotyfContext);
  const { user, setUser } = useContext(AuthContext);

  const defaultFormData = {
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    avatar: null,
  };

  const [errors, setErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  // if user update email a new verification code will be sent to his email
  const [message, setMessage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setErrors({ ...errors, [name]: undefined });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.files[0],
    });
  };

  const createFormData = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("firstname", formData.firstname);
    formDataToSend.append("lastname", formData.lastname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("_method", "PUT");
    if (formData.avatar) formDataToSend.append("avatar", formData.avatar);

    return formDataToSend;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setErrors({});
    try {
      const { data } = await axiosInstance.post(
        USER_UPDATE_INFO,
        createFormData(),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!data.success) {
        notyf.error(data.message);
      } else {
        if (data.message) setMessage(data.message);
        setUser(data.result);
        setFormData((prev) => ({
          ...prev,
          avatar: null,
        }));
        notyf.success("Your information has been successfully updated");
      }

      // login(data.result);
    } catch (err) {
      if (err.response.status === 422) {
        setErrors({ ...err.response.data.errors });
      }
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const sendEmailVerification = async () => {
    try {
      const { data } = await axiosInstance.get(SEND_EMAIL_VERIFICATION);
      if (!data.success) {
        notyf.error(data.message);
      } else {
        notyf.success(data.message);
      }
    } catch (err) {
      if (err.response.status === 422) {
        setErrors({ ...err.response.data.errors });
      }
      console.error(err);
    }
  };

  const removeAvatar = async () => {
    try {
      const { data } = await axiosInstance.delete(USER_REMOVE_AVATAR);
      if (!data.success) {
        notyf.error(data.message);
      } else {
        setUser({
          ...user,
          avatar: null,
        });
        notyf.success(data.message);
      }
    } catch (err) {
      if (err.response.status === 422) {
        setErrors({ ...err.response.data.errors });
      }
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div id="auth_content" className="p-12 flex flex-col space-y-3">
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
          {!user.email_verified && (
            <p className="mt-2 text-sm text-gray-400 mb-3">
              <a
                onClick={() => sendEmailVerification()}
                className="cursor-pointer  font-medium underline"
              >
                Send verification email
              </a>
            </p>
          )}
          {message && (
            <p className="mt-2 text-sm text-green-400">
              <span className="font-medium">{message}</span>
            </p>
          )}
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

        <div className="flex flex-col">
          <label forHtml="file_input" className="mb-2 text-gray-400">
            Select Avatar
          </label>
          <div className="flex flex-row">
            <input
              className={`border text-sm ${
                errors.avatar
                  ? "border-red-500 text-red-500"
                  : "border-gray-300 text-white"
              } mr-2 mblock w-full text-sm border  rounded-lg cursor-pointer  text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400`}
              id="file_input"
              name="avatar"
              onChange={handleFileChange}
              accept="image/*"
              type="file"
            ></input>

            <div
              onClick={() => removeAvatar()}
              className="bg-gray-700 cursor-pointer border-gray-600 border-2 rounded-lg flex items-center hover:bg-gray-500 justify-center px-3"
            >
              {" "}
              <TrashIcon width={24} />
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          <span className="font-small">Max Size: 2 Mo</span>
        </p>
        {errors.avatar &&
          errors.avatar.map((err, key) => (
            <p key={key} className="mt-2 text-sm text-red-500">
              <span className="font-medium">{err}</span>
            </p>
          ))}

        <div className="flex flex-row items-center justify-center">
          <button
            type="submit"
            disabled={formLoading}
            className="bg-purple-500 flex justify-center items-center  disabled:cursor-not-allowed text-white w-full px-6 py-2 rounded-md font-semibold"
          >
            {formLoading && (
              <Spinner className="inline w-5 h-5 mr-3 text-white animate-spin" />
            )}
            Update
          </button>
        </div>
      </div>
    </form>
  );
}

export default UserProfile;
