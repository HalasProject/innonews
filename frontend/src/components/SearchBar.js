// business, entertainment, general, health, science, sports, technology

import { useContext, useEffect, useState } from "react";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ArticleContext } from "../providers/ArticleProvider";
import DateRangePicker from "flowbite-datepicker/DateRangePicker";

function SearchBar() {
  const {
    fetchArticles,
    sources,
    setSources,
    search,
    showLoader,
    setSearch,
    setCategory,
    category,
  } = useContext(ArticleContext);

  const categories = [
    "",
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  useEffect(() => {
    const dateRangePickerEl = document.getElementById("dateRangePickerId");
    new DateRangePicker(dateRangePickerEl, {
      // options
    });
  }, []);

  const updateSource = (source) => {
    const updatedValue = { [source]: !sources[source] };

    const newObject = { ...sources, ...updatedValue };

    if (checkIfAtLeaseOneSourceIsTrue(newObject)) {
      setSources((prevState) => ({
        ...prevState,
        ...updatedValue,
      }));
    }
  };

  const checkIfAtLeaseOneSourceIsTrue = (sources) => {
    for (let source in sources) {
      if (sources[source]) {
        return true;
      }
    }
    return false;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchArticles();
      }}
      className="px-4"
    >
      <div className="flex">
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="capitalize flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center  border rounded-l-lg  focus:outline-none  bg-gray-700 hover:bg-gray-600  text-white border-gray-600"
          type="button"
        >
          {category == "" ? "All Categories" : category}
          <ChevronDownIcon className="w-4 h-4 ml-1" viewBox="0 0 20 20" />
        </button>
        <div
          id="dropdown"
          className=" hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdown-button"
          >
            {categories.map((_category, index) => (
              <li key={index} onClick={() => setCategory(_category)}>
                <button
                  type="button"
                  className={`${
                    _category == category ? "bg-gray-300" : "hover:bg-gray-100"
                  } capitalize inline-flex w-full px-4 py-2`}
                >
                  {_category == "" ? "All Categories" : _category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown-source"
          className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center  border   focus:outline-none  bg-gray-700 hover:bg-gray-600  text-white border-gray-600"
          type="button"
        >
          {Object.values(sources).reduce((source, item) => source + item, 0)}{" "}
          Sources
          <ChevronDownIcon className="w-4 h-4 ml-1" viewBox="0 0 20 20" />
        </button>
        <div
          id="dropdown-source"
          className="hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
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
                  onChange={() => updateSource("newsapi")}
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
                  onChange={() => updateSource("nyt")}
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
                  onChange={() => updateSource("guardian")}
                  checked={sources.guardian}
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

        <div
          date-rangepicker
          id="dateRangePickerId"
          className="flex items-center"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              name="start"
              type="text"
              className="border text-sm block w-full pl-10 p-2.5 focus:outline-0  bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              placeholder="from"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              name="end"
              type="text"
              className="border text-sm  block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              placeholder="to"
            />
          </div>
        </div>

        <div className="relative w-1/4">
          <input
            type="search"
            id="search-dropdown"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block p-2.5 w-full text-sm rounded-r-lg  outlin  border-l-2 border bg-gray-700 border-l-gray-700  border-gray-600 placeholder-gray-400 text-white "
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
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 relative animate-spin text-red-400 fill-gray-100"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
