import { useContext } from "react";
import { FaGear, FaRegGem } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMenu, IoSearch } from "react-icons/io5";
import { CenturyContext } from "../context/CenturyContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

const Sidebar = () => {
  const { isSignedIn, hideSidebar, setHideSidebar, setShowModal } =
    useContext(CenturyContext);

  return (
    <section
      className={`relative h-screen w-full bg-[#282a2c] p-4 whitespace-nowrap transition-all duration-300 ease-in-out ${hideSidebar ? "max-w-[4rem]" : "max-w-[18rem]"} `}
    >
      {/* first two menu btns with tooltips*/}
      <div className="flex justify-between text-4xl">
        <button
          aria-label="Collapse menu"
          onClick={() => setHideSidebar((prev) => !prev)}
          className="group relative"
        >
          <IoMenu className="menu-btns" />
          <p className="bottom-tooltip">Collapse menu</p>
        </button>

        {!hideSidebar && (
          // hide in collapsed sidebar
          <button aria-label="Search" className="group relative">
            <IoSearch className="menu-btns" />
            <p className="bottom-tooltip">Search</p>
          </button>
        )}
      </div>

      {/* new chat and explore btn */}
      <div className="mt-10 flex flex-col gap-2">
        {!hideSidebar ? (
          // btn for full width sidebar
          <button
            disabled={true}
            aria-label="New chat"
            className="group relative flex w-full cursor-pointer items-center gap-4 pl-5 text-[#757a7c] disabled:cursor-default"
          >
            <HiOutlinePencilSquare className="text-xl" />
            <h3 className="overflow-hidden">New Chat</h3>
            <p className="side-tooltip">New Chat</p>
          </button>
        ) : (

          // small btn for collapsed sidebar
          <button
            disabled={true}
            aria-label="New chat"
            className="group relative ml-2 cursor-pointer text-xl disabled:cursor-default"
          >
            <HiOutlinePencilSquare className="text-[#757a7c]" />
            <p className="side-tooltip -top-1">New Chat</p>
          </button>
        )}

        {isSignedIn && !hideSidebar && (
          // only show this btn in signed in page and hide in collapsed sidebar
          <button
            aria-label="Explore Gems"
            className="group relative flex w-full cursor-pointer items-center gap-3 rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#484a4d]"
          >
            <FaRegGem className="text-lg" />
            <h3 className="overflow-hidden">Explore Gems</h3>
            <p className="side-tooltip -right-32">Explore Gems</p>
          </button>
        )}
      </div>

      {/* recent chats */}
      {!hideSidebar && (
        // hide in collapsed sidebar
        <div
          className={`custom-scrollbar mt-8 overflow-x-hidden overflow-y-scroll ${isSignedIn ? "h-[calc(100%_-_14rem)]" : "h-[calc(100%_-_11rem)]"}`}
        >
          <h3
            className={`${isSignedIn ? "text-[#7d8283]" : "text-white"} ml-5`}
          >
            Recent
          </h3>

          {isSignedIn ? (

            // recent chats with century, top 5 chats will be shown and the rest will be shown after clicking on show more btn

            <div className="mt-2 flex flex-col">
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>


              <button
                aria-label="Show more"
                className="group relative flex w-full cursor-pointer items-center gap-2 rounded-full px-3 py-2 pl-5 text-[#a3abac] hover:bg-gray-700 active:bg-[#484a4d]"
              >
                <h3 className="overflow-hidden">Show more</h3>
                <RiArrowDropDownLine className="text-2xl" />
                <p className="side-tooltip -right-30">Show more</p>
              </button>
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>
              <div className="group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]">
                <h3 className="w-[11rem] truncate overflow-hidden">
                  Settings & help
                </h3>
                <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                <p className="side-tooltip -right-35">Settings & help</p>
              </div>
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
                className="mt-10 text-blue-400"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      )}

      {/* settings & help */}
      {!hideSidebar ? (
        // full btn in full width sidebar
        <button
          aria-label="Settings & help"
          className="group relative flex w-full cursor-pointer items-center gap-3 rounded-full px-3 py-2 pl-5 text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#484a4d]"
        >
          <FaGear className="text-lg" />
          <h3 className="overflow-hidden">Settings & help</h3>
          <p className="side-tooltip -right-32">Settings & help</p>
        </button>
      ) : (

        // small btn for collapsed sidebar
        <div className="absolute bottom-4">
          <button aria-label="Settings & help" className="group relative">
            <FaGear className="menu-btns text-4xl text-[#878e8f]" />
            <p className="side-tooltip -right-32">Settings & help</p>
          </button>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
