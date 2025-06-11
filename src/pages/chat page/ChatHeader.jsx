import { useContext } from "react";
import { FaCaretDown } from "react-icons/fa";
import { PiShootingStar } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import user from "../../assets/user.png";
import { CenturyContext } from "../../context/CenturyContext";

const ChatHeader = ({ isSignedIn, setIsSignedIn }) => {
  const { handleLogout, setShowModal, username, showOptions, setShowOptions } = useContext(CenturyContext);

  return (
    <div className="flex w-full items-center justify-between px-3 py-2">
      <div className="text-[#4a4a4a] dark:text-white">
        <h2 className="text-xl">Century</h2>

        <h3 className="flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#f0f4f9] px-2 py-1 text-xs text-[#4a4a4a] hover:bg-[#dde3ea] active:bg-[#c0c5cb] dark:bg-[#282a2c] dark:text-[#9a9fa5] dark:hover:bg-[#383b3e] dark:active:bg-[#323537]">
          2.5 Flash <FaCaretDown />
        </h3>
      </div>

      {isSignedIn ? (
        // shows when user is logged in
        <div className="mr-5 flex items-center gap-5 text-sm">
          <button
            aria-label="Upgrade"
            className="flex cursor-pointer items-center gap-2 rounded-sm bg-[#dde3ea] px-4 py-2 hover:bg-[#cbd0d6] active:bg-[#bec3c8] dark:bg-[#282a2c] dark:text-white dark:hover:bg-[#3d3f41] dark:active:bg-[#3a3c3e]"
          >
            <PiShootingStar className="text-lg text-rose-600 dark:text-rose-400" />
            Upgrade
          </button>

          {/* dropdown to show on mobile devices */}

          <div
            onClick={() =>
              setShowOptions({ show: !showOptions.show, title: "User" })
            }
            className="relative block xl:hidden"
          >
            <button aria-label="User" className="w-10 cursor-pointer">
              <img
                src={user}
                className="w-10 rounded-full object-cover"
                alt="User"
              />
            </button>

            <ul
              className={`${showOptions.title === "User" && showOptions.show ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} absolute -right-5 z-[10] w-32 cursor-pointer bg-[#f0f4f9] whitespace-nowrap text-black opacity-0 shadow shadow-black/50 transition-opacity duration-100 ease-in dark:bg-[#1b1c1d] dark:text-white`}
            >
              <li className="mt-2 mb-2 px-6 py-2 text-center text-base text-black dark:text-white">
                {username}
              </li>

              <li
                onClick={() => {
                  handleLogout(), setIsSignedIn(false);
                }}
                className="mt-2 mb-2 flex items-center gap-3 px-6 py-2 text-base text-red-600 hover:bg-[#dde3ea] dark:text-red-400 dark:hover:bg-[#272729]"
              >
                <MdLogout className="text-lg" /> Logout
              </li>
            </ul>
          </div>

          {/* dropdown to show on large devices */}
          <div className="group relative hidden xl:block">
            <button aria-label="User" className="w-10 cursor-pointer">
              <img
                src={user}
                className="w-10 rounded-full object-cover"
                alt="User"
              />
            </button>

            <ul
              className={`pointer-events-none absolute -right-5 z-[10] w-32 cursor-pointer bg-[#f0f4f9] whitespace-nowrap text-black opacity-0 shadow shadow-black/50 transition-opacity duration-100 ease-in group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-[#1b1c1d] dark:text-white`}
            >
              <li className="mt-2 mb-2 px-6 py-2 text-center text-base text-black dark:text-white">
                {username}
              </li>

              <li
                onClick={() => {
                  handleLogout(), setIsSignedIn(false);
                }}
                className="mt-2 mb-2 flex items-center gap-3 px-6 py-2 text-base text-red-600 hover:bg-[#dde3ea] dark:text-red-400 dark:hover:bg-[#272729]"
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
            className="cursor-pointer text-gray-700 dark:text-blue-200"
          >
            About Century
          </a>
          <button
            aria-label="Sign in"
            onClick={() => setShowModal(true)}
            className="cursor-pointer rounded-sm bg-blue-600 px-4 py-1.5 text-white dark:bg-blue-300 dark:text-black"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
