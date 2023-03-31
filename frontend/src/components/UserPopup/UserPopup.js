import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import UserProfile from "./UserProfile";
import UserSecurity from "./UserSecurity";
import UserFeed from "./UserFeed";

function UserPopup({ togglePopup }) {
  const [selectedTab, setSelectedTab] = useState("profile");
  const { logout } = useContext(AuthContext);

  const tabs = ["profile", "security", "feed"];
  return (
    <div className="bg-gray-500/75 absolute flex justify-center align-center h-screen w-full text-white">
      <div className="divide-y divide-slate-600 absolute bottom-0 top-0 m-auto h-fit z-10  bg-gray-800 rounded-xl shadow-lg">
        <div
          id="auth_header"
          className="flex flex-row py-6 px-6 justify-between"
        >
          <span className="text-md font-bold">Settings</span>
          <XMarkIcon
            className="cursor-pointer"
            onClick={() => togglePopup(false)}
            width={24}
          ></XMarkIcon>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul
            className="flex items-center justify-center flex-wrap -mb-px text-sm font-medium text-center"
            id="myTab"
            data-tabs-toggle="#myTabContent"
            role="tablist"
          >
            {tabs.map((tab, key) => (
              <li key={key} className="mr-2" role="presentation">
                <button
                  onClick={() => setSelectedTab(tab)}
                  className={`capitalize inline-block p-4 rounded-t-lg ${
                    tab == selectedTab
                      ? "border-b-2"
                      : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                  id={`${tab}-tab`}
                  data-tabs-target={`#${tab}`}
                  type="button"
                  role="tab"
                  aria-controls={tab}
                  aria-selected="false"
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div id="myTabContent">
          {selectedTab == "profile" && (
            <div
              className="p-4"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <UserProfile />
            </div>
          )}
          {selectedTab == "security" && (
            <div
              className="p-4 w-full"
              id="security"
              role="tabpanel"
              aria-labelledby="security-tab"
            >
              <UserSecurity />
            </div>
          )}
          {selectedTab == "feed" && (
            <div
              className="p-4 w-full"
              id="feed"
              role="tabpanel"
              aria-labelledby="feed-tab"
            >
              <UserFeed />
            </div>
          )}
        </div>
        <div id="auth_footer" className="justify-center flex py-5 ">
          <a onClick={() => logout()} className="underline cursor-pointer">
            Log out
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserPopup;
