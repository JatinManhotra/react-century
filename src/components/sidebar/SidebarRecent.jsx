import { useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CenturyContext } from "../../context/CenturyContext";
import { useMatch, useNavigate } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import SidebarRenameModal from "./SidebarRenameModal";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFeedbackMsg from "../../hooks/useFeedbackMsg";

const TimestampConverter = ({ timestamp }) => {
  if (!timestamp) return;
  const seconds = timestamp.seconds;
  const nanoseconds = timestamp.nanoseconds;

  const date = new Date(seconds * 1000 + nanoseconds / 1000000); // convert into milliseconds

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // Get short month name
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes; // Add leading zero for minutes < 10

    return `${hours}:${minutesStr} ${ampm}`;
  };

  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);

  return (
    <span className="text-xs xl:text-sm text-gray-600 dark:text-gray-400">
      {formattedDate} <br /> {formattedTime}
    </span>
  );
};

const SidebarRecent = ({
  messages,
  generatedId,
  setGeneratedId,
  getOrCreateId,
}) => {
  const {
    hideSidebar,
    isSignedIn,
    setShowModal,
    recentChat,
    setRecentChat,
    dark,
  } = useContext(CenturyContext);

  const [openMenuId, setOpenMenuId] = useState(null); // sets the current response index from AI
  const [showRenameModal, setShowRenameModal] = useState(false);

  const [selectedChatId, setSelectedChatId] = useState(null); // chat id to be renamed
  const [selectedChatTitle, setSelectedChatTitle] = useState(""); // what new title to give to that conversation

  const [timestamp, setTimestamp] = useState(null);

  const [showAll, setShowAll] = useState(false); // shows user's chats after 5th index

  const [showDelete, setShowDelete] = useState(false);

  const navigate = useNavigate();

  const match = useMatch("/chat/:id");
  const currentChatId = match?.params?.id;

  const sortedChats = [...(recentChat || [])].reverse();
  const topChats = sortedChats.slice(0, 5);
  const remainingChats = sortedChats.slice(5);
  const hasMore = remainingChats.length > 0;

  const { handleFeedback } = useFeedbackMsg();

  const handleRenameClick = (id, title) => {
    setSelectedChatId(id);
    setSelectedChatTitle(title);
    setShowRenameModal(true);
    setOpenMenuId(null);
  };

  const deleteConversation = async (chatIdToDelete) => {
    const user = auth.currentUser;
    if (!user || !chatIdToDelete) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const updatedConversations = (data.conversations || []).filter(
          (c) => c.id !== chatIdToDelete,
        );

        // update in firestore db
        await updateDoc(userRef, {
          conversations: updatedConversations,
        });

        // Update local state
        setRecentChat(updatedConversations);
        setShowDelete(true);
        setTimeout(() => {
          setShowDelete(false);
        }, 3000);
        if (currentChatId === chatIdToDelete) {
          navigate("/");
        }
      }
    } catch (error) {
      handleFeedback("Failed to delete conversation", true);
      console.log(error);
    }
  };

  // prevents rename on new chats and guest mode
  useEffect(() => {
    if (!isSignedIn) {
      setShowRenameModal(false);
      setSelectedChatId(null);
      setSelectedChatTitle("");
    }
  }, [isSignedIn]);

  // common classes for same component
  const chatClass = (chatId) =>
    `group relative flex w-full cursor-pointer text-sm xl:text-base items-center justify-between rounded-full mb-2 px-3  pl-5 ${
      chatId === currentChatId
        ? "bg-blue-200 text-blue-800 dark:bg-[#1f3760] dark:text-white"
        : "text-[#5a5f5f] hover:bg-[#dde3ea] dark:text-[#878e8f] dark:hover:bg-[#3d3f41]"
    }`;

  return (
    <>
      {!hideSidebar && (
        <div
          className={`${dark ? "custom-scrollbar" : "light-scrollbar"} mt-8 -mr-2 xl:-mr-0 overflow-x-hidden overflow-y-scroll ${
            isSignedIn ? "h-[calc(100%_-_16rem)]" : "h-[calc(100%_-_13rem)]"
          }`}
        >
          <h3
            className={`${isSignedIn ? "text-[#5a5f5f] dark:text-[#7d8283]" : "text-[#5a5f5f] dark:text-white"} text-sm xl:text-base  ml-5`}
          >
            Recent
          </h3>

          {isSignedIn ? (
            <div className="mt-2 flex flex-col">
              {/* Top 5 chats */}

              {topChats.map((item) => (
                <div
                  key={item.id}
                  className={`${chatClass(item.id)} group relative`}
                >
                  <h3
                    onClick={() => navigate(`/chat/${item.id}`)}
                    className="w-[11rem] truncate overflow-hidden py-2"
                  >
                    {item.title}
                  </h3>

                  <div className="group relative">
                    <BsThreeDotsVertical
                      className="menu-btns cursor-pointer text-3xl text-black dark:text-white"
                      onClick={() => {
                        setOpenMenuId((prev) =>
                          prev === item.id ? null : item.id,
                        ),
                          setTimestamp({
                            seconds: item.createdAt.seconds,
                            nanoseconds: item.createdAt.nanoseconds,
                          });
                      }}
                    />

                    <ul
                      className={`${
                        openMenuId === item.id
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      } absolute -left-30 z-10 rounded-lg bg-[#f0f4f9] whitespace-nowrap text-black shadow shadow-black/50 transition-opacity duration-150 ease-in dark:bg-[#1b1c1d] dark:text-white`}
                    >
                      {/* // creation date */}
                      <li className="flex items-center gap-5 px-6 py-2 text-xs xl:text-sm">
                        <p>
                          Created on : <br />{" "}
                          <TimestampConverter timestamp={timestamp} />
                        </p>
                      </li>

                      <hr className="text-gray-400" />

                      <li
                        onClick={() => handleRenameClick(item.id, item.title)}
                        className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-xs xl:text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234]"
                      >
                        <GoPencil className="xl:text-lg" /> Rename
                      </li>

                      <li
                        onClick={() => deleteConversation(item.id)}
                        className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-xs xl:text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234]"
                      >
                        <BsTrash className="xl:text-lg" /> Delete
                      </li>
                    </ul>
                  </div>
                </div>
              ))}

              {showRenameModal && selectedChatId && (
                <SidebarRenameModal
                  chatId={selectedChatId}
                  currentTitle={selectedChatTitle}
                  showRenameModal={showRenameModal}
                  setShowRenameModal={setShowRenameModal}
                  updateTitleInUI={(id, newTitle) => {
                    // Update recentChat list
                    setRecentChat((prev) =>
                      prev.map((chat) =>
                        chat.id === id ? { ...chat, title: newTitle } : chat,
                      ),
                    );
                  }}
                />
              )}

              {/* Show more button */}
              {hasMore && (
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  aria-label="Show more"
                  className="group relative text-sm xl:text-base flex w-full cursor-pointer items-center gap-2 rounded-full px-3 py-2 pl-5 text-[#444848] hover:bg-blue-200 active:bg-blue-300 dark:text-[#a3abac] dark:hover:bg-gray-700 dark:active:bg-[#484a4d]"
                >
                  <h3>{showAll ? "Show less" : "Show more"}</h3>

                  {!showAll ? (
                    <RiArrowDropDownLine className="text-2xl" />
                  ) : (
                    <RiArrowDropUpLine className="text-2xl" />
                  )}
                </button>
              )}

              {/* Remaining chats below button */}
              {showAll &&
                remainingChats.map((item) => (
                  <div
                    key={item.id}
                    className={`${chatClass(item.id)} group relative`}
                  >
                    <h3
                      onClick={() => navigate(`/chat/${item.id}`)}
                      className="w-[11rem] truncate overflow-hidden py-2"
                    >
                      {item.title}
                    </h3>

                    <div className="group relative">
                      <BsThreeDotsVertical
                        className="menu-btns cursor-pointer text-3xl text-black dark:text-white"
                        onClick={() => {
                          setOpenMenuId((prev) =>
                            prev === item.id ? null : item.id,
                          ),
                            setTimestamp({
                              seconds: item.createdAt.seconds,
                              nanoseconds: item.createdAt.nanoseconds,
                            });
                        }}
                      />

                       <ul
                      className={`${
                        openMenuId === item.id
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      } absolute -left-30 z-10 rounded-lg bg-[#f0f4f9] whitespace-nowrap text-black shadow shadow-black/50 transition-opacity duration-150 ease-in dark:bg-[#1b1c1d] dark:text-white`}
                    >
                      {/* // creation date */}
                      <li className="flex items-center gap-5 px-6 py-2 text-xs xl:text-sm">
                        <p>
                          Created on : <br />{" "}
                          <TimestampConverter timestamp={timestamp} />
                        </p>
                      </li>

                      <hr className="text-gray-400" />

                      <li
                        onClick={() => handleRenameClick(item.id, item.title)}
                        className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-xs xl:text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234]"
                      >
                        <GoPencil className="xl:text-lg" /> Rename
                      </li>

                      <li
                        onClick={() => deleteConversation(item.id)}
                        className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-xs xl:text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234]"
                      >
                        <BsTrash className="xl:text-lg" /> Delete
                      </li>
                    </ul>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            // Not signed in message
            <div className="mt-2 overflow-hidden rounded-lg bg-[#dde3ea] px-2 xl:px-4 py-3 pb-6 text-xs xl:text-sm dark:bg-[#454849] dark:text-white">
              <p>
                Sign in to start saving your <br /> chats <br />{" "}
                <span className="text-gray-600 dark:text-white">
                  Once you're signed in, you can <br /> access your recent chats
                  here.
                </span>
              </p>

              <button
                aria-label="Sign in"
                onClick={() => setShowModal(true)}
                className="mt-10 cursor-pointer text-sm text-blue-600 dark:text-blue-400"
              >
                Sign in
              </button>
            </div>
          )}

          {/* // after deleting message */}
          <div
            className={` ${showDelete ? "opacity-100" : "opacity-0"} ${
              !hideSidebar ? "xl:left-5" : "xl:left-0"
            } pointer-events-none absolute bottom-7 z-[105] text-sm xl:text-base rounded-lg bg-black px-4 py-2 text-white transition-opacity duration-300 ease-in`}
          >
            Deleted Successfully
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarRecent;
