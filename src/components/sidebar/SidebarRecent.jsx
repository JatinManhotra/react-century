import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CenturyContext } from "../../context/CenturyContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SidebarRecent = ({
  messages,
  generatedId,
  setGeneratedId,
  getOrCreateId,
}) => {
  const { hideSidebar, isSignedIn, setShowModal, recentChat } =
    useContext(CenturyContext);

  const navigate = useNavigate();
  const { id: currentChatId } = useParams();
  const [showAll, setShowAll] = useState(false);

  const sortedChats = [...(recentChat || [])].reverse();
  const topChats = sortedChats.slice(0, 5);
  const remainingChats = sortedChats.slice(5);
  const hasMore = remainingChats.length > 0;

  const chatClass = (chatId) =>
    `group relative flex w-full cursor-pointer items-center justify-between rounded-full px-3 py-2 pl-5 ${
      chatId === currentChatId
        ? "bg-[#4a4d50] text-white font-semibold"
        : "text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]"
    }`;

  return (
    <>
      {!hideSidebar && (
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
            <div className="mt-2 flex flex-col">
              {/* Top 5 chats */}
              {topChats.map((item) => (
                <div key={item.id} className={`${chatClass(item.id)} group relative`}>
                  <h3
                    onClick={() => navigate(`/chat/${item.id}`)}
                    className="w-[11rem] truncate overflow-hidden"
                  >
                    {item.title}
                  </h3>
                  <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                  <p className="side-tooltip -right-35">Settings & help</p>
                </div>
              ))}

              {/* Show more button */}
              {hasMore && (
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  aria-label="Show more"
                  className="group relative flex w-full cursor-pointer items-center gap-2 rounded-full px-3 py-2 pl-5 text-[#a3abac] hover:bg-gray-700 active:bg-[#484a4d]"
                >
                  <h3>{showAll ? "Show less" : "Show more"}</h3>
                  <RiArrowDropDownLine className="text-2xl" />
                  <p className="side-tooltip -right-30">
                    {showAll ? "Show less" : "Show more"}
                  </p>
                </button>
              )}

              {/* Remaining chats below button */}
              {showAll &&
                remainingChats.map((item) => (
                  <div key={item.id} className={`${chatClass(item.id)} group relative`}>
                    <h3
                      onClick={() => navigate(`/chat/${item.id}`)}
                      className="w-[11rem] truncate overflow-hidden"
                    >
                      {item.title}
                    </h3>
                    <BsThreeDotsVertical className="menu-btns text-3xl text-white" />
                    <p className="side-tooltip -right-35">Settings & help</p>
                  </div>
                ))}
            </div>
          ) : (
            // Not signed in
            <div className="mt-2 overflow-hidden rounded-lg bg-[#454849] px-4 py-3 pb-6 text-sm text-white">
              <p>
                Sign in to start saving your <br /> chats <br /> Once you're
                signed in, you can <br /> access your recent chats here.
              </p>
              <button
                aria-label="Sign in"
                onClick={() => setShowModal(true)}
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
