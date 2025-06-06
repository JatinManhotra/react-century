import React, { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CenturyContext } from "../../context/CenturyContext";

const SidebarRecent = ({
  messages,
  generatedId,
  setGeneratedId,
  getOrCreateId,
 
}) => {
  const { hideSidebar, isSignedIn, setShowModal } = useContext(CenturyContext);

  return (
    <>
      {!hideSidebar && (
        // hide in collapsed sidebar
        <div
          className={`custom-scrollbar mt-8 overflow-x-hidden overflow-y-scroll ${
            isSignedIn ? "h-[calc(100%_-_15rem)]" : "h-[calc(100%_-_12rem)]"
          }`}
        >
          <h3
            className={`${isSignedIn ? "text-[#7d8283]" : "text-white"} ml-5`}
          >
            Recent
          </h3>

          {isSignedIn ? (
            // recent chats with century, top 5 chats will be shown and the rest will be shown after clicking on show more btn
            <div className="mt-2 flex flex-col">
              {/* Repeated chat items */}
              {[...Array(13)].map((_, idx) => (
                <div
                  key={idx}
                  className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]"
                >
                  <h3 className="w-[11rem] truncate overflow-hidden">
                    Settings & help
                  </h3>
                  <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                  <p className="side-tooltip -right-35">Settings & help</p>
                </div>
              ))}

              <button
                aria-label="Show more"
                className="group relative flex w-full cursor-pointer items-center gap-2 rounded-full px-3 py-2 pl-5 text-[#a3abac] hover:bg-gray-700 active:bg-[#484a4d]"
              >
                <h3 className="overflow-hidden">Show more</h3>
                <RiArrowDropDownLine className="text-2xl" />
                <p className="side-tooltip -right-30">Show more</p>
              </button>
            </div>
          ) : (
            // not logged in msg
            <div className="mt-2 overflow-hidden rounded-lg bg-[#454849] px-4 py-3 pb-6 text-sm text-white">
              <p>
                Sign in to start saving your <br /> chats <br /> Once you're
                signed in, you can <br /> access your recent chats here.
              </p>
              <button
                aria-label="Sign in"
                onClick={() => setShowModal(true)} // open signup / login modal
                className="mt-10 cursor-pointer text-blue-400"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SidebarRecent;
