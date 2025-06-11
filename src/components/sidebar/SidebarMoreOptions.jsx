import { useContext, useState } from "react";
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
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const SidebarMoreOptions = ({
  toggleSidebarOptions,
  setToggleSidebarOptions,
  collapsed,
}) => {
  const { dark, setDark, showOptions, setShowOptions } = useContext(CenturyContext);

  // sets the theme and store it in local storage and firestore storage

  async function setLightMode() {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "false");

    setDark(false);

    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { dark: false }, { merge: true });
    }
  }

  async function setDarkMode() {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");

    setDark(true);

    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { dark: true }, { merge: true });
    }
  }

  return (
    <ul
      className={`${toggleSidebarOptions ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} ${collapsed ? "-right-40" : "right-0"} absolute -top-80 cursor-pointer rounded-lg bg-[#f0f4f9] whitespace-nowrap shadow shadow-black/50 transition-opacity duration-100 ease-in dark:bg-[#1b1c1d] dark:text-white`}
    >
      <li className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
        <FaHistory className="text-lg" /> Activity
      </li>

      <li className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
        <HiOutlineUserPlus className="text-xl" /> Saved info
      </li>

      <li className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
        <IoExtensionPuzzleOutline className="text-xl" /> Apps
      </li>

      <li className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
        <IoMdLink className="text-xl" /> Your public links
      </li>

      {/* dropdown to show on mobile devices */}
      <li onClick={()=>setShowOptions({show:(!showOptions.show), title:"Theme"})} className={`relative block xl:hidden  mt-2 mb-2 px-6 py-1 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]`}>
        <div className="flex items-center gap-5">
          <TbSunMoon className="text-3xl" />{" "}
          <p className="flex w-full items-center justify-between">
            Theme <MdArrowRight className="text-lg" />
          </p>
        </div>

        <div className={`${(showOptions.title === "Theme" &&  showOptions.show) ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}  absolute -top-0 -right-45  transition-opacity duration-100 ease-in `}>
          <ul className="w-50 bg-[#f0f4f9] py-2 whitespace-nowrap shadow shadow-black/50 transition-opacity duration-100 ease-in dark:bg-[#1b1c1d] dark:text-white">
            <li className="mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
              System
            </li>

            <li
              onClick={setLightMode}
              className="mb-2 flex w-full items-center justify-between gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]"
            >
              Light {dark ? null : <LuCircleCheckBig className="text-lg" />}
            </li>

            <li
              onClick={setDarkMode}
              className="flex w-full items-center justify-between gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]"
            >
              Dark {dark ? <LuCircleCheckBig className="text-lg" /> : null}
            </li>
          </ul>
        </div>
      </li>

       {/* dropdown to show on large devices */}
      <li className={`group hidden xl:block relative mt-2 mb-2 px-6 py-1 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]`}>
        <div className="flex items-center gap-5">
          <TbSunMoon className="text-3xl" />{" "}
          <p className="flex w-full items-center justify-between">
            Theme <MdArrowRight className="text-lg" />
          </p>
        </div>

        <div className={`opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute -top-0 -right-45  transition-opacity duration-100 ease-in `}>
          <ul className="w-50 bg-[#f0f4f9] py-2 whitespace-nowrap shadow shadow-black/50 transition-opacity duration-100 ease-in dark:bg-[#1b1c1d] dark:text-white">
            <li className="mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
              System
            </li>

            <li
              onClick={setLightMode}
              className="mb-2 flex w-full items-center justify-between gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]"
            >
              Light {dark ? null : <LuCircleCheckBig className="text-lg" />}
            </li>

            <li
              onClick={setDarkMode}
              className="flex w-full items-center justify-between gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]"
            >
              Dark {dark ? <LuCircleCheckBig className="text-lg" /> : null}
            </li>
          </ul>
        </div>
      </li>

      <li className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
        <MdOutlineFeedback className="text-xl" /> Send feedback
      </li>

      {/* dropdown to show on mobile devices */}
      <li onClick={()=>setShowOptions({show:(!showOptions.show), title:"Help"})}  className="group relative block xl:hidden mt-2 mb-2 px-6 py-1 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
        <div className="flex items-center gap-5">
          <MdOutlineHelpCenter className="text-3xl" />{" "}
          <p className="flex w-full items-center justify-between">
            Help <MdArrowRight className="text-lg" />
          </p>
        </div>

        <div className={`${(showOptions.title === "Help" &&  showOptions.show) ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} absolute -top-5 -right-45  transition-opacity duration-100 ease-in `}>
          <ul className="w-50 bg-[#f0f4f9] py-2 whitespace-nowrap shadow shadow-black/50 transition-opacity duration-100 ease-in dark:bg-[#1b1c1d] dark:text-white">
            <li className="mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
              <IoIosHelpCircleOutline className="text-xl" /> Help center
            </li>

            <li className="flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
              <MdOutlinePrivacyTip className="text-xl" />
              Privacy
            </li>
          </ul>
        </div>
      </li>

      {/* dropdown to show on large devices */}
      <li className="group relative hidden xl:block mt-2 mb-2 px-6 py-1 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
        <div className="flex items-center gap-5">
          <MdOutlineHelpCenter className="text-3xl" />{" "}
          <p className="flex w-full items-center justify-between">
            Help <MdArrowRight className="text-lg" />
          </p>
        </div>

        <div className={`group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none absolute -top-5 -right-45  transition-opacity duration-100 ease-in `}>
          <ul className="w-50 bg-[#f0f4f9] py-2 whitespace-nowrap shadow shadow-black/50 transition-opacity duration-100 ease-in dark:bg-[#1b1c1d] dark:text-white">
            <li className="mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
              <IoIosHelpCircleOutline className="text-xl" /> Help center
            </li>

            <li className="flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234] dark:active:bg-[#313234]">
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
