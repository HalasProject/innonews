import {
  AtSymbolIcon,
  LockClosedIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import NotyfContext from "../../NotyfContext";
import { AuthContext } from "../../providers/AuthProvider";
import {
  REGISTER,
  SEND_EMAIL_VERIFICATION,
  USER_REMOVE_AVATAR,
  USER_UPDATE_INFO,
} from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";
function UserProfile() {
  const notyf = useContext(NotyfContext);
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    avatar: null,
  });

  // if user update email a new verification code will be sent to his email
  const [message, setMessage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Clear the error for the input when the user interacts with it
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

  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const formDataToSend = new FormData();
      if (formData.avatar) formDataToSend.append("avatar", formData.avatar);
      formDataToSend.append("firstname", formData.firstname);
      formDataToSend.append("lastname", formData.lastname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("_method", "PUT");

      const { data } = await axiosInstance.post(
        USER_UPDATE_INFO,
        formDataToSend,
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

        <div className="flex flex-row space-x-2">
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
        <p className="text-sm text-gray-400">
          <span className="font-small">Max Size: 2 Mo</span>
        </p>

        <div className="flex flex-row items-center justify-center">
          <button
            thype="submit"
            className="bg-purple-500  disabled:cursor-not-allowed text-white w-full px-6 py-2 rounded-md font-semibold"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
}

export default UserProfile;
