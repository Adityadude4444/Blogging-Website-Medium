import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Appbar = () => {
  const navigator = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="flex justify-between items-center px-4 py-2 h-[20%] cursor-pointer">
      <img
        src="https://logo-download.com/wp-content/data/images/png/Medium-logo.png"
        alt="Medium Logo"
        className="h-auto w-28"
        onClick={() => {
          navigator("/blogs");
        }}
      />
      <div className="flex gap-5">
        <button
          type="button"
          className="text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => {
            navigator("/blog/create");
          }}
        >
          New
        </button>
        <div
          className="relative"
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-xs text-gray-600 dark:text-gray-300">U</span>
          </div>
          {showLogout && (
            <button
              className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 bg-white text-gray-800 py-1 rounded-md shadow-md hover:bg-gray-200"
              onClick={() => {
                localStorage.removeItem("token");
                navigator("/signup");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
