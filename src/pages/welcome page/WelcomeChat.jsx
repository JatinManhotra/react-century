import { GoPlus } from "react-icons/go";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { MdOutlineDraw } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const WelcomeChat = ({
  isSignedIn,
  promptInput,
  setPromptInput,
  fetchPrompt,
  getOrCreateId,
  handleSubmit,
}) => {
  return (
    <>
      {isSignedIn ? (

        // for logged in users
        <div className="m-auto flex w-[95%] md:overflow-visible overflow-hidden md:w-[40rem] xl:w-[45rem] flex-col rounded-3xl border border-[#595c5f]/50 px-4 py-3 text-[#595c5f] dark:border-[#9a9fa5]/50 dark:text-[#868a8f]">

          <input
            placeholder="Ask Century"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => fetchPrompt(e, promptInput, getOrCreateId())}
            className="flex-1 text-sm border-none px-3 sm:text-base text-[#505050] outline-none placeholder:text-[#595c5f] dark:text-white dark:placeholder:text-[#9a9fa5]"
            type="text"
            name="chat-field"
            id="chat-field"
          />

          <div className="mt-4 xl:mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">

              <div className="group relative">
                <GoPlus className="menu-btns text-3xl md:text-4xl text-[#595c5f] dark:text-[#868a8f]" />
                <p className="bottom-tooltip">Add files</p>
              </div>

              <div className="group relative">

                <button
                  aria-label="Deep research"
                  className="menu-btns flex items-center gap-2 sm:text-xs text-sm md:text-sm text-[#595c5f] dark:text-[#868a8f]"
                >
                  <LiaGlobeAmericasSolid className="text-lg md:text-xl" />
                  <span className="hidden sm:block">Deep Research</span>
                </button>

                <p className="bottom-tooltip">Get in depth answers</p>
              </div>
              
              <div className="group relative">

                <button
                  aria-label="Canvas"
                  className="menu-btns flex items-center gap-2 sm:text-xs text-sm md:text-sm text-[#595c5f] dark:text-[#868a8f]"
                >
                  <MdOutlineDraw className="text-lg md:text-xl" />
                  <span className="hidden sm:block">Canvas</span>
                </button>

                <p className="bottom-tooltip">Create docs and apps</p>
              </div>
            </div>

            {promptInput.trim().length >= 1 ? (

              <div className="group relative">
                <span
                  onClick={() => handleSubmit(promptInput, getOrCreateId())}
                   className="menu-btns flex md:h-9 md:w-9 w-7 h-7 items-center justify-center rounded-full p-2 text-[#595c5f] dark:text-white"
                >
                  <IoSend className="text-3xl md:text-4xl" />
                </span>
                <p className="bottom-tooltip">Submit</p>
              </div>

            ) : (
              <div className="group relative">
                <FaMicrophone className="menu-btns text-3xl md:text-4xl text-[#595c5f] dark:text-[#868a8f]" />
                <p className="bottom-tooltip">Use microphone</p>
              </div>
            )}
          </div>
        </div>
      ) : (

        // for new users
        <div className="m-auto mt-5 w-[95%] md:w-[40rem] overflow-hidden flex xl:w-[45rem] items-center rounded-full border border-[#595c5f]/50 px-2 sm:px-4 py-1 sm:py-2 text-[#595c5f] dark:border-[#9a9fa5]/50 dark:text-[#868a8f]">

          <div className="group relative">
            <GoPlus className="menu-btns text-3xl md:text-4xl text-[#595c5f] dark:text-[#868a8f]" />
            <p className="bottom-tooltip">Add files</p>
          </div>

          <input
            placeholder="Ask Century"
            className="flex-1 border-none px-1 sm:px-3 text-sm placeholder:text-sm xl:placeholder:text-base  sm:text-base text-[#505050] outline-none placeholder:text-[#595c5f] dark:text-white dark:placeholder:text-[#9a9fa5]"
            type="text"
            name="chat-field"
            id="chat-field"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => fetchPrompt(e, promptInput, getOrCreateId())}
          />

          {/* show a send icon when a prompt is added */}
          {promptInput.trim().length >= 1 ? (

            <div className="group relative">
              <span
                onClick={() => handleSubmit(promptInput, getOrCreateId())}
                className="menu-btns flex md:h-9 md:w-9 w-7 h-7 items-center justify-center rounded-full p-2 text-[#595c5f] dark:text-white"
              >
                <IoSend className="text-3xl md:text-4xl" />
              </span>
              <p className="bottom-tooltip">Submit</p>
            </div>
            
          ) : (
            <div className="group relative">
              <FaMicrophone className="menu-btns text-3xl md:text-4xl text-[#595c5f] dark:text-[#868a8f]" />
              <p className="bottom-tooltip">Use microphone</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WelcomeChat;
