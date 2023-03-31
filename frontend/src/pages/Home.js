import { useContext, useEffect, useState } from "react";
import ArticleBox from "../components/ArticleBox";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../providers/AuthProvider";
import no_results from "../images/no-results.png";
import ArticleSkeleton from "../components/ArticleSkeleton";
import { ArticleContext } from "../providers/ArticleProvider";
import { UserCircleIcon } from "@heroicons/react/24/outline";
function Home() {
  const { toggleAuthPopup, user } = useContext(AuthContext);
  const { showLoader, articles } = useContext(ArticleContext);
  return (
    <div className="text-bold bg-gray-800 flex flex-col h-screen overflow-hidden">
      <div
        id="header"
        className="bg-gray-800 border-b-2 border-b-gray-500 flex flex-row justify-between items-center px-12 py-4 "
      >
        <div className="text-4xl text-gray-300 font-extralight">
          Inno<span className="text-red-500">news</span>
        </div>

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
              <div className="bg-gray-400 w-8 h-8 rounded-full">
                {user.avatar && (
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={`${process.env.REACT_APP_BACKEND_URL}/${user.avatar}`}
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
      <div className="flex flex-col items-center bg-gray-800 space-y-8 pt-8">
        <SearchBar></SearchBar>
        {showLoader && (
          <div className="w-full shadow scroll overflow-x-hidden pb-64 h-screen overflow-y-scroll place-items-center items-start grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {[...Array(3).keys()].map((key, index) => (
              <ArticleSkeleton key={index} />
            ))}
          </div>
        )}
        {!showLoader && articles.length > 0 && (
          <div className="w-full shadow scroll overflow-x-hidden pb-64 h-screen overflow-y-scroll place-items-center items-start grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {articles.map((article, i) => (
              <ArticleBox article={article} key={i}></ArticleBox>
            ))}
          </div>
        )}

        {!showLoader && articles.length == 0 && (
          <div className="w-full flex flex-col items-center justify-center h-full">
            <img className="w-80" src={no_results} />
            <h1 className="text-xl lg:text-5xl text-gray-300 font-extralight">
              No articles found. Please adjust your search.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
