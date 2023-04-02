import { NewspaperIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { ArticleContext } from "../providers/ArticleProvider";
import { AuthContext } from "../providers/AuthProvider";
import { imageUrl } from "../utils/helpers";
import dark0 from "../images/0-dark.png";
import dark8 from "../images/8-dark.png";
function Navbar() {
  const { toggleAuthPopup, user } = useContext(AuthContext);
  const { fetchFeedArticles } = useContext(ArticleContext);

  return (
    <div
      id="header"
      className="bg-gray-800 border-b-2 border-b-gray-600/90 shadow-inner flex flex-row justify-between space-x-5 items-center px-12 py-4 "
      style={{
        backgroundImage: `
      linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
      url(${dark0}),
      url(${dark8})
    `,
      }}
    >
      <div className="text-4xl text-gray-300 font-extralight">
        Inno<span className="text-red-500">news</span>
      </div>

      <div className="flex space-x-6">
        {user && (
          <div
            onClick={async () => await fetchFeedArticles()}
            className="hidden md:flex hover:bg-gray-700 cursor-pointer px-4 rounded-md justify-center items-center space-x-2 text-white"
          >
            <span className="font-medium text-md">My feed</span>
            <NewspaperIcon color="white" width={28} />
          </div>
        )}
        <button
          onClick={() => toggleAuthPopup(true)}
          className="inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br bg-from-purple-500 bg-to-pink-500 from-purple-500 to-pink-500 text-white focus:ring-4 focus:outline-none  focus:ring-purple-800"
        >
          {!user && (
            <span className=" px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Login / Register
            </span>
          )}
          {user && (
            <span className="flex flex-row items-center space-x-3 px-5 py-2.5 transition-all ease-in duration-75 bg-whit bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <div className="w-8 h-8 rounded-full">
                {user.avatar && (
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={imageUrl(user.avatar)}
                  />
                )}
                {!user.avatar && (
                  <UserCircleIcon
                    fill="none"
                    className="w-full h-full rounded-full"
                  />
                )}
              </div>
              <span>{user.fullName}</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
