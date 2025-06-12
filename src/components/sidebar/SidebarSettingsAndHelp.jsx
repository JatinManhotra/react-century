import { useContext } from "react";
import { FaGear } from "react-icons/fa6";
import SidebarMoreOptions from "./SidebarMoreOptions";
import { CenturyContext } from "../../context/CenturyContext";

const SidebarSettingsAndHelp = ({
  showMoreOptions,
  setShowMoreOptions,
  collapsed,
}) => {
  const { hideSidebar, toggleSidebarOptions, setToggleSidebarOptions } =
    useContext(CenturyContext);

    

  return (
    <>
      {!hideSidebar ? (
        // full btn in full width sidebar
        <div className="relative">
          <button
            onClick={() => setToggleSidebarOptions((prev) => !prev)}
            aria-label="Settings & help"
            className={`${
              toggleSidebarOptions
                ? "bg-blue-200 text-blue-800 dark:bg-[#1f3760] dark:text-white"
                : "hover:bg-[#dde3ea] dark:hover:bg-[#3d3f41]"
            } group relative flex w-full cursor-pointer items-center gap-3 rounded-full px-3 py-2 pl-5 text-[#525657] active:bg-[#b5bac0] dark:text-[#878e8f] dark:active:bg-[#484a4d]`}
          >
            <FaGear className="xl:text-lg" />
            <h3 className="overflow-hidden text-sm xl:text-base">Settings & help</h3>
            <p className="side-tooltip -right-32">Settings & help</p>
          </button>

          <SidebarMoreOptions
            toggleSidebarOptions={toggleSidebarOptions}
            setToggleSidebarOptions={setToggleSidebarOptions}
          />
        </div>
      ) : (
        // small btn for collapsed sidebar
        <div className="absolute bottom-8">
          <div className="relative">
            <button
              onClick={() => setToggleSidebarOptions((prev) => !prev)}
              aria-label="Settings & help"
              className="group relative"
            >
              <FaGear
                className={`${
                  toggleSidebarOptions
                    ? "bg-blue-200 text-blue-800 dark:bg-[#1f3760] dark:text-white"
                    : "hover:bg-[#dde3ea] dark:hover:bg-[#3d3f41]"
                } rounded-full p-2 text-4xl text-[#525657] active:bg-[#b5bac0] dark:active:bg-[#484a4d]`}
              />

              <p className="side-tooltip -right-32">Settings & help</p>
            </button>

            <SidebarMoreOptions
              collapsed
              toggleSidebarOptions={toggleSidebarOptions}
              setToggleSidebarOptions={setToggleSidebarOptions}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarSettingsAndHelp;
