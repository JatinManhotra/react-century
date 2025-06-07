import React, { useContext } from "react";
import { FaCaretDown } from "react-icons/fa";
import { PiShootingStar } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import user from "../../assets/user.png"; // ✅ Adjust path if needed
import { CenturyContext } from "../../context/CenturyContext";

const ChatHeader = ({ isSignedIn, setIsSignedIn }) => {
  const { handleLogout } = useContext(CenturyContext);

  return (
    <div className="flex w-full items-center justify-between px-3 py-2">
      <div className="text-white">
        <h2 className="text-xl">Century</h2>
        <h3 className="flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#282a2c] px-2 py-1 text-xs text-[#9a9fa5] hover:bg-[#383b3e] active:bg-[#323537]">
          2.5 Flash <FaCaretDown />
        </h3>
      </div>

      {isSignedIn ? (
        // shows when user is logged in
        <div className="mr-5 flex items-center gap-5 text-sm">
          <button
            aria-label="Upgrade"
            className="flex cursor-pointer items-center gap-2 rounded-sm bg-[#282a2c] px-4 py-2 text-white hover:bg-[#3d3f41] active:bg-[#3a3c3e]"
          >
            <PiShootingStar className="text-lg text-rose-400" />
            Upgrade
          </button>

          <div className="group relative">
            <button aria-label="User" className="w-10 cursor-pointer">
              <img
                src={user}
                className="w-10 rounded-full object-cover"
                alt="User"
              />
            </button>
            <ul
              className={`pointer-events-none absolute -right-5 z-[10] w-32 cursor-pointer bg-[#1b1c1d] whitespace-nowrap text-white opacity-0 shadow shadow-black transition-opacity duration-100 ease-in group-hover:pointer-events-auto group-hover:opacity-100`}
            >
              <li
                onClick={() => {
                  handleLogout(), setIsSignedIn(false);
                }}
                className="mt-2 mb-2 flex items-center gap-3 px-6 py-2 text-base text-red-400 hover:bg-[#272729]"
              >
                <MdLogout className="text-lg" /> Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // not logged in component
        <div className="mr-5 flex items-center gap-5 text-sm">
          <a
            target="_blank"
            href="https://github.com/JatinManhotra/react-century"
            className="cursor-pointer text-blue-200"
          >
            About Century
          </a>
          <button
            aria-label="Sign in"
            onClick={() => setIsSignedIn(true)}
            className="cursor-pointer rounded-sm bg-blue-300 px-4 py-1.5"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
