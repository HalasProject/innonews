import {
  AtSymbolIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function ForgotPassword() {
  return (
    <div id="auth_content" className="py-12 px-12 flex flex-col space-y-3">
      <p className="text-gray-400 text-sm">
        Enter the email address you registered with and we will send you a
        verification code.
      </p>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AtSymbolIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          id="input-group-1"
          className="border text-sm rounded-lg  block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="example@innonews.com"
        />
      </div>

      <div className="flex flex-row items-center justify-center">
        <button className="bg-purple-500 w-full text-white px-6 py-2 rounded-md font-semibold">
          Send verification code
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
