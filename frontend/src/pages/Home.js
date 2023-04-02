import React, { useContext, useEffect, useState } from "react";
import ArticleBox from "../components/ArticleBox";
import SearchBar from "../components/SearchBar";
import no_results from "../images/no-results.png";
import ArticleSkeleton from "../components/ArticleSkeleton";
import { ArticleContext } from "../providers/ArticleProvider";
import Navbar from "../components/Navbar";
import "./Home.css";
import dark0 from "../images/0-dark.png";
import dark1 from "../images/1-dark.png";
import dark4 from "../images/4-dark.png";
import dark5 from "../images/5-dark.png";
import dark6 from "../images/6-dark.png";
import dark7 from "../images/7-dark.png";
import dark8 from "../images/8-dark.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Home = React.memo(() => {
  const { showLoader, articles, fetchArticles } = useContext(ArticleContext);
  const [showSearchBar, setShowSearchBar] = useState(false);
  useEffect(
    () => async () => {
      await fetchArticles();
    },
    []
  );
  return (
    <div className="text-bold overflow-hidden h-screen flex flex-col">
      <div className="w-full">
        <Navbar />
      </div>

      <div
        className="flex h-full overflow-hidden  max-h-max flex-col items-center bg-gray-800 space-y-8 pt-8"
        style={{
          backgroundImage: `
        linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
        url(${dark0}),
        url(${dark1}),
        url(${dark4}),
        url(${dark5}),
        url(${dark6}),
        url(${dark7}),
        url(${dark8})
      `,
        }}
      >
        <div className={`lg:block ${showSearchBar ? "block" : "hidden"}`}>
          <SearchBar />
        </div>

        <div className="scroll overflow-y-scroll  overflow-x-hidden pb-16">
          {showLoader && (
            <div className="w-full scroll px-8 place-items-center items-start grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {[...Array(3).keys()].map((article, index) => (
                <ArticleSkeleton key={index} />
              ))}
            </div>
          )}

          {!showLoader && articles.length > 0 && (
            <div className="w-full h-max scroll px-8 justify-items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {articles.map((article, index) => (
                <ArticleBox article={article} key={index}></ArticleBox>
              ))}
            </div>
          )}

          {!showLoader && articles.length == 0 && (
            <div className="w-full flex flex-col px-8 items-center justify-center h-full">
              <img className="w-80" src={no_results} />
              <h1 className="text-xl lg:text-5xl text-gray-300 font-extralight">
                No articles found. Please adjust your search.
              </h1>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={() => setShowSearchBar(!showSearchBar)}
        className="lg:hidden absolute bg-red-700 text-white h-16 w-16 p-4 right-8 hover:bg-red-600 cursor-pointer bottom-8 shadow-lg rounded-full"
      >
        <MagnifyingGlassIcon fill="none" className="w-full h-full" />
      </div>
    </div>
  );
});

export default Home;
