import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegGem } from "react-icons/fa";

const SidebarChatAndExploreBtn = ({
  hideSidebar,
  isSignedIn,
  newChat,
  location,
}) => {
  return (
    <div className="mt-10 flex flex-col gap-2">
      {!hideSidebar ? (
        // btn for full width sidebar
        <button
          disabled={location.pathname !== "/" ? false : true} // disabled in homepage
          aria-label="New chat"
          onClick={newChat}
          className="group relative flex w-full cursor-pointer items-center gap-4 rounded-full px-3 py-2 pl-5 disabled:cursor-default disabled:text-[#757a7c] dark:text-white dark:hover:bg-[#3d3f41] dark:active:bg-[#484a4d] dark:disabled:hover:bg-[#282a2c] dark:disabled:active:bg-[#282a2c]"
        >
          <HiOutlinePencilSquare className="text-lg xl:text-xl" />
          <h3 className="xl:text-base text-sm overflow-hidden">New Chat</h3>
          <p className="side-tooltip">New Chat</p>
        </button>
      ) : (
        // small btn for collapsed sidebar
        <button
          disabled={location.pathname !== "/" ? false : true}
          aria-label="New chat"
          onClick={newChat}
          className="group relative w-fit cursor-pointer rounded-full p-2 text-xl disabled:cursor-default disabled:text-[#757a7c] dark:text-white dark:hover:bg-[#3d3f41] dark:active:bg-[#484a4d] dark:disabled:hover:bg-[#282a2c] dark:disabled:active:bg-[#282a2c]"
        >
          <HiOutlinePencilSquare />
          <p className="side-tooltip">New Chat</p>
        </button>
      )}

      {isSignedIn && !hideSidebar && (
        // only show this btn in signed in page and hide in collapsed sidebar
        <button
          aria-label="Explore Gems"
          className="group relative flex w-full cursor-pointer items-center gap-3 rounded-full px-3 py-2 pl-5 text-[#5a5f5f] hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:text-[#878e8f] dark:hover:bg-[#3d3f41] dark:active:bg-[#484a4d]"
        >
          <FaRegGem className="xl:text-lg" />
          <h3 className="overflow-hidden text-sm xl:text-base">Explore Gems</h3>
          <p className="side-tooltip -right-32">Explore Gems</p>
        </button>
      )}
    </div>
  );
};

export default SidebarChatAndExploreBtn;
