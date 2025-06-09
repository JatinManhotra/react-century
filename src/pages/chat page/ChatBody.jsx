import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";

import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { IoRefreshOutline } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaRegCopy, FaVolumeLow } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { LuFlag } from "react-icons/lu";
import { CenturyContext } from "../../context/CenturyContext";

const ChatBody = ({
  handleEditText,
  isSignedIn,
  messages,
  editingIndex,
  editingText,
  handleTextChange,
  handleSaveEdit,
  id,
  handleCancelEdit,
  feedbacks,
  handleLike,
  handleDislike,
  handleRedo,
  loading,
  handleShare,
  showMoreOptions,
  setShowMoreOptions,
  handleCopy,
  moreBtnRef,
  bottomRef,
  logo,
}) => {

  const {dark} = useContext(CenturyContext)

  return (
    <div
      className={`${dark ? "custom-scrollbar" : "light-scrollbar"}   w-full overflow-y-scroll ${isSignedIn ? "h-[calc(100%_-_14.5rem)]" : "h-[calc(100%_-_11.5rem)]"} `}
    >
      <div
        className={`m-auto flex h-full w-full max-w-[70%] flex-col items-center`}
      >
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`${msg.role === "user" ? "self-end" : "self-start"} flex pb-6 text-justify`}
          >
            <img
              className={`${msg.role === "ai" ? "block" : "hidden"} mr-4 h-fit w-15`}
              src={logo}
              alt="Century logo"
            />
            <div className="flex flex-col text-black dark:text-white">
              {msg.role === "user" ? (
                editingIndex === index ? (
                  <div className="flex flex-col items-end gap-2">
                    <textarea
                      
                      name="update-prompt"
                      id="update-prompt"
                      className="w-150 resize-none overflow-hidden rounded-3xl border-2 border-blue-600 dark:border-blue-300 bg-[#fff] dark:bg-[#27292b] p-4 text-black dark:text-white outline-none"
                      value={editingText}
                      onChange={handleTextChange}
                    />
                    <div className="mt-2 flex flex-row-reverse gap-2">
                      <button
                        disabled={editingText === msg.text ? true : false}
                        onClick={() => handleSaveEdit(index, editingText, id)}
                        className="cursor-pointer rounded-full text-white bg-blue-600 hover:bg-blue-500 dark:bg-blue-300 px-5 py-2 dark:text-blue-800 dark:hover:bg-blue-400 disabled:cursor-default dark:disabled:bg-[#27292b] dark:disabled:text-[#7e848b]"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="cursor-pointer rounded-full px-5 py-2 text-blue-600 dark:text-blue-200 hover:bg-[#f0f4f9] dark:hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="group flex flex-row-reverse items-start gap-2">
                    <p className="max-w-[30vw] text-black dark:text-white self-center rounded-l-2xl rounded-br-2xl bg-[#f0f4f9] dark:bg-[#333537] p-3">
                      {msg.text}
                    </p>
                    <div
                      onClick={() => handleEditText(index, msg.text)}
                      className="relative hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#575757] dark:text-[#949a9c] group-hover:flex hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#353739] dark:active:bg-[#494c4e]"
                    >
                      <FaPencilAlt className="w-4" />
                      <p className="bottom-tooltip">Edit text</p>
                    </div>
                  </div>
                )
              ) : (
                <div className="prose dark:prose-invert text-black dark:text-white animate-height max-w-full self-start overflow-hidden break-words">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              )}
              {msg.role === "ai" && (
                <div
                  className={`animate-slow-opacity mt-2 flex w-fit cursor-pointer text-lg`}
                >
                  <div className="group menu-btns relative">
                    {feedbacks[index]?.like ? (
                      <BiSolidLike onClick={() => handleLike(index)} />
                    ) : (
                      <BiLike onClick={() => handleLike(index)} />
                    )}

                    <p className="bottom-tooltip">Good response</p>
                  </div>

                  <div className="group menu-btns relative">
                    {feedbacks[index]?.dislike ? (
                      <BiSolidDislike onClick={() => handleDislike(index)} />
                    ) : (
                      <BiDislike onClick={() => handleDislike(index)} />
                    )}

                    <p className="bottom-tooltip">Bad response</p>
                  </div>

                  <div className="group menu-btns relative">
                    <IoRefreshOutline
                      onClick={() =>
                        !loading &&
                        handleRedo(index - 1, messages[index - 1]?.text, id)
                      }
                    />
                    <p className="bottom-tooltip">Redo</p>
                  </div>

                  <div className="group menu-btns relative">
                    <CiShare2
                      onClick={handleShare}
                      className="cursor-pointer"
                    />
                    <p className="bottom-tooltip">Share</p>
                  </div>

                  <div className="relative">
                    <div
                      ref={moreBtnRef}
                      onClick={() =>
                        setShowMoreOptions(
                          showMoreOptions === index ? null : index,
                        )
                      }
                      className="group menu-btns relative"
                    >
                      <PiDotsThreeVerticalBold />
                      <p className="bottom-tooltip">More</p>
                    </div>
                    <ul
                      className={`${showMoreOptions === index ? "opacity-100" : "pointer-events-none opacity-0"} absolute z-10 bg-[#f0f4f9] rounded-lg dark:bg-[#1b1c1d] whitespace-nowrap dark:text-white shadow shadow-black/50 transition-opacity duration-100 ease-in`}
                    >
                      <li
                        onClick={() => handleCopy(msg.text)}
                        className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234]"
                      >
                        <FaRegCopy className="text-lg" /> Copy
                      </li>
                      <li className="mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234]">
                        <FaVolumeLow className="text-lg" /> Listen
                      </li>
                      <li className="mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234]">
                        <LuFlag className="text-lg" /> Report legal issue
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <>
            <div className="flex w-full animate-pulse items-center justify-start gap-2 text-black dark:text-white">
              <img
                className={`mr-4 h-fit w-15`}
                src={logo}
                alt="Century logo"
              />
              <p className="">Century is thinking...</p>
            </div>
            <div className="pb-20" ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBody;
