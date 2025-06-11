import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CenturyContext } from "../../context/CenturyContext";
import SidebarHeader from "./SidebarHeader";
import SidebarChatAndExploreBtn from "./SidebarChatAndExploreBtn";
import SidebarRecent from "./SidebarRecent";
import SidebarSettingsAndHelp from "./SidebarSettingsAndHelp";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const {
    isSignedIn,
    hideSidebar,
    setHideSidebar,
    messages,
    setMessages,
    generatedId,
    setGeneratedId,
    getOrCreateId,
    showMoreOptions,
    setShowMoreOptions,
    toggleSidebarOptions,
    setToggleSidebarOptions,
  } = useContext(CenturyContext);

  const { loading } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  function newChat() {
    setMessages([]);
    navigate("/");
  }

  if (loading) {
    // hides the sidebar when the data is been fetched from firestore
    return;
  }

  return (
    <section
      className={`relative z-[95] h-screen w-full bg-[#f0f4f9] p-4 whitespace-nowrap transition-all duration-300 ease-in-out dark:bg-[#282a2c] ${
        hideSidebar ? "max-w-[4rem]" : "max-w-[18rem]"
      }`}
    >
      {/* first two menu btns with tooltips*/}
      <SidebarHeader
        hideSidebar={hideSidebar}
        setHideSidebar={setHideSidebar}
      />

      {/* new chat and explore btn */}
      <SidebarChatAndExploreBtn
        hideSidebar={hideSidebar}
        isSignedIn={isSignedIn}
        newChat={newChat}
        location={location}
      />

      {/* recent chats */}
      <SidebarRecent
        messages={messages}
        generatedId={generatedId}
        setGeneratedId={setGeneratedId}
        getOrCreateId={getOrCreateId}
        hideSidebar={hideSidebar}
      />

      {/* settings & help */}
      <SidebarSettingsAndHelp
        showMoreOptions={showMoreOptions}
        setShowMoreOptions={setShowMoreOptions}
        toggleSidebarOptions={toggleSidebarOptions}
        setToggleSidebarOptions={setToggleSidebarOptions}
        collapsed={hideSidebar}
      />
    </section>
  );
};

export default Sidebar;
