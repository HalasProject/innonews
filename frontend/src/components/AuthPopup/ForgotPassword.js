import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import NotyfContext from "../../NotyfContext";
import { FORGOT_PASSWORD } from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";

function ForgotPassword() {
  const notyf = useContext(NotyfContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
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
    }
    setFormLoading(false);
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
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-5 h-5 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Send verification code
          </button>
        </div>
      </div>
    </form>
  );
}

export default ForgotPassword;
