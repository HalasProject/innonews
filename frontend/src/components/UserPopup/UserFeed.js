import React, { useContext } from "react";
import NotyfContext from "../../contexts/NotyfContext";
import { ArticleContext } from "../../providers/ArticleProvider";
import { AuthContext } from "../../providers/AuthProvider";
import { UPDATE_USER_FEED } from "../../utils/api";
import axiosInstance from "../../utils/axiosInstance";
import { checkIfAtLeaseOneSourceIsTrue } from "../../utils/helpers";

function UserFeed() {
  const { categories } = useContext(ArticleContext);
  const { user, setUser } = useContext(AuthContext);
  const notyf = useContext(NotyfContext);
  const sources = user.feed.sources;

  const updateSource = async (source) => {
    const updatedValue = { [source]: !sources[source] };

    const newObject = { ...sources, ...updatedValue };

    if (checkIfAtLeaseOneSourceIsTrue(newObject)) {
      setUser({
        ...user,
        feed: {
          ...user.feed,
          sources: newObject,
        },
      });
      try {
        const { data } = await axiosInstance.put(UPDATE_USER_FEED, {
          ...user.feed,
          sources: newObject,
        });
        if (!data.success) {
          notyf.error(data.message);
        } else {
          notyf.success("Your feed has been updated");
        }

        // login(data.result);
      } catch (err) {
        if (err.response.status === 422) {
          // setErrors({ ...err.response.data.errors });
        }
        console.error(err);
      }
    }
  };

  const handleCategoryChange = async (event) => {
    try {
      const { id } = event.target;
      const feed = {
        ...user.feed,
        category: id,
      };
      setUser({
        ...user,
        feed,
      });
      const { data } = await axiosInstance.put(UPDATE_USER_FEED, feed);
      if (!data.success) {
        notyf.error(data.message);
      } else {
        notyf.success("Your feed has been updated");
      }

      // login(data.result);
    } catch (err) {
      if (err.response.status === 422) {
        // setErrors({ ...err.response.data.errors });
      }
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center divide-gray-400 divide-y-2 space-y-8 px-4">
      <div className="place-items-start items-start grid grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {categories.map((category, key) => (
          <div className="flex flex-row items-center" key={key}>
            <input
              id={category}
              type="radio"
              checked={category == user.feed.category}
              onChange={handleCategoryChange}
              name="category-radio"
              className="w-4 h-4 cursor-pointer text-blue-600  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            <label
              htmlFor="radio-1"
              className="capitalize ml-2 text-sm font-medium text-gray-300"
            >
              {category == "*" ? "All" : category}
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
              checked={user.feed.sources.newsapi}
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
              checked={user.feed.sources.nyt}
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
              onChange={() => updateSource("theguardian")}
              checked={user.feed.sources.theguardian}
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
