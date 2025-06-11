import { IoMenu, IoSearch } from "react-icons/io5";

const SidebarHeader = ({ hideSidebar, setHideSidebar }) => {
  return (
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
  );
};

export default SidebarHeader;
