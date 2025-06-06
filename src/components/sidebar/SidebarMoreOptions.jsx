import React, { useContext } from "react";
import { FaHistory } from "react-icons/fa";
import { IoIosHelpCircleOutline, IoMdLink } from "react-icons/io";
import { TbSunMoon } from "react-icons/tb";
import {
  MdArrowRight,
  MdOutlineFeedback,
  MdOutlineHelpCenter,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { LuCircleCheckBig } from "react-icons/lu";
import { CenturyContext } from "../../context/CenturyContext";


const SidebarMoreOptions = ({
  toggleSidebarOptions,
  setToggleSidebarOptions,
  collapsed
}) => {
  const { dark, setDark } = useContext(CenturyContext);

  function setLightMode() {
    document.documentElement.classList.remove("dark");
    setDark(false);
  }

  function setDarkMode() {
    document.documentElement.classList.add("dark");
    setDark(true);
  }

  return (
    <ul
      className={`${toggleSidebarOptions ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} ${collapsed ? "-right-40" : "right-0"} absolute -top-80  z-10 cursor-pointer bg-[#1b1c1d] whitespace-nowrap text-white shadow shadow-black transition-opacity duration-100 ease-in`}
    >
      <li className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]">
        <FaHistory className="text-lg" /> Activity
      </li>
      <li className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]">
        <HiOutlineUserPlus className="text-xl" /> Saved info
      </li>
      <li className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]">
        <IoExtensionPuzzleOutline className="text-xl" /> Apps
      </li>
      <li className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]">
        <IoMdLink className="text-xl" /> Your public links
      </li>
      <li className="group relative mt-2 mb-2 px-6 py-1 text-sm hover:bg-[#313234]">
        <div className="flex items-center gap-5">
          <TbSunMoon className="text-3xl" />{" "}
          <p className="flex w-full items-center justify-between">
            Theme <MdArrowRight className="text-lg" />
          </p>
        </div>

        <div className="pointer-events-none absolute -top-0 -right-45 opacity-0 transition-opacity duration-100 ease-in group-hover:pointer-events-auto group-hover:opacity-100">
          <ul className="w-50 bg-[#1b1c1d] py-2 whitespace-nowrap text-white shadow shadow-black transition-opacity duration-100 ease-in">
            <li className="mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]">
              System
            </li>
            <li
              onClick={setLightMode}
              className="mb-2 flex w-full items-center justify-between gap-5 px-6 py-2 text-sm hover:bg-[#313234]"
            >
              Light {dark ? null : <LuCircleCheckBig className="text-lg" />}
            </li>
            <li
              onClick={setDarkMode}
              className="flex w-full items-center justify-between gap-5 px-6 py-2 text-sm hover:bg-[#313234]"
            >
              Dark {dark ? <LuCircleCheckBig className="text-lg" /> : null}
            </li>
          </ul>
        </div>
      </li>
      <li className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]">
        <MdOutlineFeedback className="text-xl" /> Send feedback
      </li>

      <li className="group relative mt-2 mb-2 px-6 py-1 text-sm hover:bg-[#313234]">
        <div className="flex items-center gap-5">
          <MdOutlineHelpCenter className="text-3xl" />{" "}
          <p className="flex w-full items-center justify-between">
            Help <MdArrowRight className="text-lg" />
          </p>
        </div>

        <div className="pointer-events-none absolute -top-5 -right-45 opacity-0 transition-opacity duration-100 ease-in group-hover:pointer-events-auto group-hover:opacity-100">
          <ul className="w-50 bg-[#1b1c1d] py-2 whitespace-nowrap text-white shadow shadow-black transition-opacity duration-100 ease-in">
            <li className="mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]">
              <IoIosHelpCircleOutline className="text-xl" /> Help center
            </li>
            <li className="flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]">
              <MdOutlinePrivacyTip className="text-xl" />
              Privacy
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
};

export default SidebarMoreOptions;
