import { ChevronDownIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import NotyfContext from "../../NotyfContext";
import { ArticleContext } from "../../providers/ArticleProvider";
import { AuthContext } from "../../providers/AuthProvider";
import { REGISTER, USER_UPDATE_PASSWORD } from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";
function UserFeed() {
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
    <div className="flex flex-col items-center justify-center divide-gray-400 divide-y-2 space-y-8 ">
      <div className="place-items-start items-start grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        {categories.map((category, key) => (
          <div className="flex flex-row items-center" key={key}>
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              class="capitalize ml-2 text-sm font-medium text-gray-300"
            >
              {category == "" ? "All" : category}
            </label>
          </div>
        ))}
      </div>
      <ul
        className="text-sm text-gray-200 flex flex-row items-center justify-center space-x-4 px-3 py-4"
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
              className="ml-2 text-sm font-medium  "
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
              className="ml-2 text-sm font-medium "
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
              className="ml-2 text-sm font-medium "
            >
              The Guardian
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default UserFeed;
