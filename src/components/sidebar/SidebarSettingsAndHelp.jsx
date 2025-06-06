import React, { useContext } from "react";
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
                ? "bg-gray-800 text-white"
                : "hover:bg-[#3d3f41]"
            } group relative flex w-full cursor-pointer items-center gap-3 rounded-full px-3 py-2 pl-5 text-[#878e8f] active:bg-[#484a4d]`}
          >
            <FaGear className="text-lg" />
            <h3 className="overflow-hidden">Settings & help</h3>
            <p className="side-tooltip -right-32">Settings & help</p>
          </button>
          <SidebarMoreOptions
            toggleSidebarOptions={toggleSidebarOptions}
            setToggleSidebarOptions={setToggleSidebarOptions}
          />
        </div>
      ) : (
        // small btn for collapsed sidebar
        <div className="absolute bottom-4">
          <div className="relative">
            <button
              onClick={() => setToggleSidebarOptions((prev) => !prev)}
              aria-label="Settings & help"
              className="group relative"
            >
              <FaGear className="menu-btns text-4xl text-[#878e8f]" />
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
