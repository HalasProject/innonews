import React, { useContext, useEffect } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { ArticleContext } from "../providers/ArticleProvider";
import Spinner from "./Spinner";
import Datepicker from "react-tailwindcss-datepicker";
import { checkIfAtLeaseOneSourceIsTrue } from "../utils/helpers";
import { AuthContext } from "../providers/AuthProvider";

const SearchBar = React.memo(() => {
  const {
    fetchArticles,
    sources,
    setSources,
    search,
    showLoader,
    setSearch,
    setCategory,
    categories,
    category,
    fetchFeedArticles,
    setDate,
    date,
  } = useContext(ArticleContext);
  const { user } = useContext(AuthContext);
  const handleCategory = async (_category) => {
    setCategory(_category);
  };

  const handleDateChange = async (_dates) => {
    setDate((prev) => ({
      ...prev,
      ..._dates,
    }));
  };

  const handleSourceChange = async (_source) => {
    const updatedValue = { [_source]: !sources[_source] };

    const newObject = { ...sources, ...updatedValue };

    if (checkIfAtLeaseOneSourceIsTrue(newObject)) {
      setSources((prevState) => ({
        ...prevState,
        ...updatedValue,
      }));
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [category, date, sources]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await fetchArticles();
      }}
      className="flex flex-col  items-center justify-center space-y-3  md:flex-row md:space-y-0"
    >
      <div className="w-full md:max-w-max">
        {user && (
          <div
            onClick={async () => await fetchFeedArticles()}
            className="flex md:hidden hover:bg-gray-700 cursor-pointer px-4 py-2 rounded-md justify-center items-center space-x-2 text-white"
          >
            <span className="font-medium text-md">My feed</span>
            <NewspaperIcon color="white" width={28} />
          </div>
        )}
      </div>
      <div className="w-full md:max-w-max">
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="capitalize relative w-full rounded-r-lg md:rounded-r-none rounded-l-lg flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center  border r  focus:outline-none  bg-gray-700 hover:bg-gray-600  text-white border-gray-600"
          type="button"
        >
          {category == "*" ? "All Categories" : category}
          <ChevronDownIcon
            className="w-4 absolute md:static right-4 h-4 ml-1 "
            viewBox="0 0 20 20"
          />
        </button>
        <div
          id="dropdown"
          className="hidden z-30 bg-white  rounded-lg shadow w-44"
        >
          <ul
            className=" divide-y divide-gray-300/40 text-sm text-gray-700"
            aria-labelledby="dropdown-button"
          >
            {categories.map((_category, index) => (
              <li key={index} onClick={() => handleCategory(_category)}>
                <button
                  type="button"
                  className={`${index === 0 ? "rounded-t-lg pt-2.5" : ""} ${
                    index === categories.length - 1 ? "rounded-b-lg pb-2.5" : ""
                  } ${
                    _category == category
                      ? "bg-gray-500 text-white"
                      : "hover:bg-gray-300"
                  } capitalize inline-flex w-full px-4 py-2`}
                >
                  {_category == "*" ? "All Categories" : _category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full md:max-w-max">
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown-source"
          className="flex-shrink-0 relative w-full inline-flex items-center rounded-lg md:rounded-none py-2.5 px-4 text-sm font-medium text-center  border   focus:outline-none  bg-gray-700 hover:bg-gray-600  text-white border-gray-600"
          type="button"
        >
          {Object.values(sources).reduce((source, item) => source + item, 0)}{" "}
          Sources
          <ChevronDownIcon
            className="w-4 h-4 ml-1  absolute md:static right-4"
            viewBox="0 0 20 20"
          />
        </button>

        <div
          id="dropdown-source"
          className="hidden z-30 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul
            className="text-sm text-gray-700 px-3 py-4 space-y-4"
            aria-labelledby="dropdown-button"
          >
            <li>
              <div className="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={sources.newsapi}
                  onChange={() => handleSourceChange("newsapi")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-600 "
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  News API
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={() => handleSourceChange("nyt")}
                  checked={sources.nyt}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  The New York Time
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center ">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  onChange={() => handleSourceChange("theguardian")}
                  checked={sources.theguardian}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-600 "
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  The Guardian
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full md:max-w-max">
        <Datepicker
          primaryColor={"red"}
          value={date}
          placeholder={"Date range"}
          inputClassName="rounded-lg md:rounded-none w-full border-gray-600 !text-gray-100 !bg-gray-700 dark:!bg-gray-700"
          showFooter={true}
          onChange={handleDateChange}
        />
      </div>

      <div className="w-full md:max-w-max relative">
        <input
          type="search"
          id="search-dropdown"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block p-2.5 w-full text-sm rounded-lg md:rounded-l-none md:rounded-r-lg  outlin  border-l-2 border bg-gray-700 border-l-gray-700  border-gray-600 placeholder-gray-400 text-white "
          placeholder="Search Article"
        />
        <button
          type="submit"
          disabled={showLoader}
          className="disabled:cursor-not-allowed absolute top-0 right-0 p-2.5 text-sm font-medium text-white rounded-r-lg border border-red-600  4 focus:outline-none  bg-red-600 hover:bg-red-700 "
        >
          {!showLoader && (
            <MagnifyingGlassIcon
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            />
          )}
          {showLoader && (
            <div role="status">
              <Spinner className="w-5 h-5 relative animate-spin text-red-400 fill-gray-100" />
            </div>
          )}
        </button>
      </div>
    </form>
  );
});

export default SearchBar;
