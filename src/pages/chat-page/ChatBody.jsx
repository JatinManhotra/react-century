import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { IoRefreshOutline } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaRegCopy, FaVolumeLow } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { LuFlag } from "react-icons/lu";
import { CenturyContext } from "../../context/CenturyContext";
import { LiaTimesCircleSolid } from "react-icons/lia";

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
  const { dark, errorMsg, setErrorMsg } = useContext(CenturyContext);

  return (
    <div
      className={`${dark ? "custom-scrollbar" : "light-scrollbar"} w-full overflow-y-scroll ${isSignedIn ? "h-[calc(100%_-_16rem)] sm:h-[calc(100%_-_17rem)] xl:h-[calc(100%_-_15.5rem)]" : "h-[calc(100%_-_15rem)] xl:h-[calc(100%_-_13rem)]"} `}
    >

      <div
        className={`m-auto flex h-full w-full  max-w-[98%] xl:max-w-[70%] flex-col items-center`}
      >
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`${msg.role === "user" ? "self-end" : "self-start"} flex pb-6 text-justify`}
          >

            <img
              className={`${msg.role === "ai" ? "block" : "hidden"} mr-2 xl:mr-4 h-fit w-12 xl:w-15`}
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
                      className="w-75 sm:w-120 text-sm sm:text-base xl:w-150 resize-none overflow-hidden rounded-3xl border-2 border-blue-600 bg-[#fff] p-4 text-black outline-none dark:border-blue-300 dark:bg-[#27292b] dark:text-white"
                      value={editingText}
                      onChange={handleTextChange}
                    />

                    <div className="mt-2 flex flex-row-reverse gap-2">
                      <button
                        aria-label="Update your prompt"
                        disabled={editingText === msg.text ? true : false}
                        onClick={() => handleSaveEdit(index, editingText, id)}
                        className="cursor-pointer rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-500 disabled:cursor-default dark:bg-blue-300 dark:text-blue-800 dark:hover:bg-blue-400 dark:disabled:bg-[#27292b] dark:disabled:text-[#7e848b] text-sm xl:text-base"
                      >
                        Update
                      </button>

                      <button
                        aria-label="Cancel editing"
                        onClick={handleCancelEdit}
                        className="cursor-pointer rounded-full px-5 py-2 text-blue-600 hover:bg-[#f0f4f9] dark:text-blue-200 dark:hover:bg-gray-800 text-sm xl:text-base"
                      >
                        Cancel
                      </button>

                    </div>
                  </div>
                ) : (


                  <div className="group flex flex-row-reverse items-start gap-2">
                    <p className="max-w-[60vw] text-sm md:text-base xl:max-w-[30vw] self-center rounded-l-2xl rounded-br-2xl bg-[#f0f4f9] p-3 text-black dark:bg-[#333537] dark:text-white">
                      {msg.text}
                    </p>

                    <div
                      onClick={() => handleEditText(index, msg.text)}
                      className="relative self-center flex xl:hidden sm:h-10 sm:w-10 h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#575757] xl:group-hover:flex hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:text-[#949a9c] dark:hover:bg-[#353739] dark:active:bg-[#494c4e]"
                    >
                      <FaPencilAlt className="w-3 sm:w-4" />
                      <p className="bottom-tooltip">Edit text</p>
                    </div>
                  </div>
                )
              ) : (


                <div className="prose dark:prose-invert text-sm md:text-base animate-height max-w-60 sm:max-w-140 md:max-w-[90vw] xl:max-w-[60vw] self-start overflow-hidden break-words text-black dark:text-white">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              )}


              {msg.role === "ai" && (
                <div
                  className={`animate-slow-opacity mt-2 flex w-fit cursor-pointer md:text-lg`}
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
                      className={`${showMoreOptions === index ? "opacity-100" : "pointer-events-none opacity-0"} absolute -left-20 xl:-left-0 z-10 rounded-lg bg-[#f0f4f9] whitespace-nowrap shadow shadow-black/50 transition-opacity duration-100 ease-in dark:bg-[#1b1c1d] dark:text-white`}
                    >

                      <li
                        onClick={() => handleCopy(msg.text)}
                        className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-xs sm:text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234]"
                      >
                        <FaRegCopy className="text-base xl:text-lg" /> Copy
                      </li>

                      <li className="mb-2 flex items-center gap-5 px-6 py-2 text-xs sm:text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234]">
                        <FaVolumeLow className="text-base xl:text-lg" /> Listen
                      </li>

                      <li className="mb-2 flex items-center gap-5 px-6 py-2 text-xs sm:text-sm hover:bg-[#dde3ea] active:bg-[#b5bac0] dark:hover:bg-[#313234]">
                        <LuFlag className="text-base xl:text-lg" /> Report legal issue
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
                className={`mr-2 xl:mr-4 h-fit w-12 xl:w-15`}
                src={logo}
                alt="Century logo"
              />
              <p className="text-sm md:text-base">Century is thinking...</p>
            </div>
            <div className="pb-20" ref={bottomRef} />
          </>
        )}

        {errorMsg && (
          <>
            <div className="self-start w-[80%] sm:w-[70%] text-sm xl:text-base p-3 relative group rounded-xl xl:w-[50%] bg-transparent border border-red-500 gap-2 text-black dark:text-red-500">
             
              <p className="w-[95%]">An error occurred while getting a response from Century, please try again!</p>

            <LiaTimesCircleSolid onClick={()=>setErrorMsg(false)} className="text-red-500 xl:hidden group-hover:block text-2xl cursor-pointer absolute top-2 right-2" />
            </div>
            <div className="pb-20" ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBody;
