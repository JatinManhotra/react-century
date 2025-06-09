import React, { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CenturyContext } from "../../context/CenturyContext";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GoPencil } from "react-icons/go";
import SidebarRenameModal from "./SidebarRenameModal";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";


const TimestampConverter = ({ timestamp }) => {
  if(!timestamp) return;
  const seconds = timestamp.seconds;
  const nanoseconds = timestamp.nanoseconds;

  const date = new Date(seconds * 1000 + nanoseconds / 1000000); // Convert seconds + nanoseconds to milliseconds

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Get full month name
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes; // Add leading zero for minutes < 10

    return `${hours}:${minutesStr} ${ampm}`;
  };

  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);

  return (
    <span className="text-sm text-gray-400">
      {formattedDate} <br/> {formattedTime}
    </span>
  );
};

const SidebarRecent = ({
  messages,
  generatedId,
  setGeneratedId,
  getOrCreateId,
}) => {
  const { hideSidebar, isSignedIn, setShowModal, recentChat, setRecentChat } =
    useContext(CenturyContext);

  const navigate = useNavigate();

  const match = useMatch("/chat/:id");
  const currentChatId = match?.params?.id;

  const [showAll, setShowAll] = useState(false);
  const [showDelete, setShowDelete] = useState(false)

  const sortedChats = [...(recentChat || [])].reverse();
  const topChats = sortedChats.slice(0, 5);
  const remainingChats = sortedChats.slice(5);
  const hasMore = remainingChats.length > 0;

  const [openMenuId, setOpenMenuId] = useState(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChatTitle, setSelectedChatTitle] = useState("");

  const [timestamp, setTimestamp] = useState(null)

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

        await updateDoc(userRef, {
          conversations: updatedConversations,
        });

        // Update local state
        setRecentChat(updatedConversations);
        setShowDelete(true);
        setTimeout(() => {
          setShowDelete(false)
        }, 3000);
        if (currentChatId === chatIdToDelete) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Failed to delete conversation ❌", error);
    }
  };

  useEffect(() => {
    if (!isSignedIn) {
      setShowRenameModal(false);
      setSelectedChatId(null);
      setSelectedChatTitle("");
    }
  }, [isSignedIn]);

  const chatClass = (chatId) =>
    `group relative flex w-full cursor-pointer items-center justify-between rounded-full mb-2 px-3  pl-5 ${
      chatId === currentChatId
        ? "bg-[#1f3760] text-white"
        : "text-[#878e8f] hover:bg-[#3d3f41] active:bg-[#3a3c3e]"
    }`;

    // console.log(timestamp)

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
                      className="menu-btns cursor-pointer text-3xl text-white"
                      onClick={() =>
                      {
                        setOpenMenuId((prev) =>
                          prev === item.id ? null : item.id,
                        ),
                       
                       setTimestamp(
                        {
                          seconds:item.createdAt.seconds,
                          nanoseconds:item.createdAt.nanoseconds,
                        }
                       )
                      }
                      
                    }
                    />

                    <ul
                      className={`${
                        openMenuId === item.id
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      } absolute -left-30 z-10 bg-[#1b1c1d] whitespace-nowrap text-white shadow shadow-black transition-opacity duration-150 ease-in`}
                    >
                      <li
                        
                        className=" flex items-center gap-5 px-6 py-2 text-sm "
                      >
                        <p>Created on : <br/> <TimestampConverter timestamp={timestamp} /></p>
                      </li>
                      <hr className="text-gray-400"/>
                      <li
                        onClick={() => handleRenameClick(item.id, item.title)}
                        className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]"
                      >
                        <GoPencil className="text-lg" /> Rename
                      </li>
                      <li
                        onClick={() => deleteConversation(item.id)}
                        className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]"
                      >
                        <BsTrash className="text-lg" /> Delete
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
                  className="group relative flex w-full cursor-pointer items-center gap-2 rounded-full px-3 py-2 pl-5 text-[#a3abac] hover:bg-gray-700 active:bg-[#484a4d]"
                >
                  <h3>{showAll ? "Show less" : "Show more"}</h3>
                  <RiArrowDropDownLine className="text-2xl" />
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
                      className="menu-btns cursor-pointer text-3xl text-white"
                      onClick={() =>
                      {
                        setOpenMenuId((prev) =>
                          prev === item.id ? null : item.id,
                        ),
                       
                       setTimestamp(
                        {
                          seconds:item.createdAt.seconds,
                          nanoseconds:item.createdAt.nanoseconds,
                        }
                       )
                      }
                      
                    }
                    />

                    <ul
                      className={`${
                        openMenuId === item.id
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      } absolute -left-30 z-10 bg-[#1b1c1d] whitespace-nowrap text-white shadow shadow-black transition-opacity duration-150 ease-in`}
                    >
                      <li
                        
                        className=" flex items-center gap-5 px-6 py-2 text-sm "
                      >
                        <p>Created on : <br/> <TimestampConverter timestamp={timestamp} /></p>
                      </li>
                      <hr className="text-gray-400"/>
                      <li
                        onClick={() => handleRenameClick(item.id, item.title)}
                        className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]"
                      >
                        <GoPencil className="text-lg" /> Rename
                      </li>
                      <li
                        onClick={() => deleteConversation(item.id)}
                        className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]"
                      >
                        <BsTrash className="text-lg" /> Delete
                      </li>
                    </ul>
                  </div>
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

           <div
          className={` ${(showDelete) ? "opacity-100" : "opacity-0"} ${
            !hideSidebar ? "left-5" : "left-0"
          } absolute pointer-events-none bottom-5 z-[105] rounded-lg bg-black px-4 py-2 text-white transition-opacity duration-300 ease-in`}
        >
          Deleted Successfully
        </div>
        </div>
      )}
    </>
  );
};

export default SidebarRecent;
