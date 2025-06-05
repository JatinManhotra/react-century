import { useContext, useState } from "react";
import { FaCaretDown, FaMicrophone } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { CenturyContext } from "../context/CenturyContext";
import user from "../assets/user.png";
import { PiShootingStar } from "react-icons/pi";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { MdOutlineDraw } from "react-icons/md";
import Modal from "../components/Modal";
import { IoSend } from "react-icons/io5";

const Welcome = () => {
  const {
    isSignedIn,
    setIsSignedIn,
    showModal,
    setShowModal,
    handleSubmit,
    promptInput,
    setPromptInput,
    fetchPrompt,
    generatedId,
    setGeneratedId,
    getOrCreateId,
  } = useContext(CenturyContext);

  return (
    <section className="h-screen w-screen bg-[#1b1c1d]">
      {/* top component with login / signup modal*/}
      <div className="flex w-full items-center justify-between px-3 py-2">
        <div className="text-white">
          <h2 className="text-xl">Century</h2>
          <h3 className="flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#282a2c] px-2 py-1 text-xs text-[#9a9fa5] hover:bg-[#383b3e] active:bg-[#323537]">
            2.5 Flash <FaCaretDown />
          </h3>
        </div>

        {isSignedIn ? (
          // shows when user is logged in
          <div className="mr-5 flex items-center gap-5 text-sm">
            <button
              aria-label="Upgrade"
              className="flex cursor-pointer items-center gap-2 rounded-sm bg-[#282a2c] px-4 py-2 text-white hover:bg-[#3d3f41] active:bg-[#3a3c3e]"
            >
              <PiShootingStar className="text-lg text-rose-400" />
              Upgrade
            </button>

            <button
              aria-label="User"
              className="w-10 cursor-pointer"
              onClick={() => setIsSignedIn(!isSignedIn)}
            >
              <img
                src={user}
                className="w-10 rounded-full object-cover"
                alt="User"
              />
            </button>
          </div>
        ) : (
          // not logged in component
          <div className="mr-5 flex items-center gap-5 text-sm">
            <h3 className="cursor-pointer text-blue-200">About Century</h3>
            <button
              aria-label="Sign in"
              onClick={() => setIsSignedIn(!isSignedIn)}
              className="cursor-pointer rounded-sm bg-blue-300 px-4 py-1.5"
            >
              Sign in
            </button>
          </div>
        )}
      </div>

      {/* modal */}
      {showModal && <Modal />}

      {/* greeting message */}
      <div
        className={`flex ${isSignedIn ? "h-[calc(100%_-_14rem)]" : "h-[calc(100%_-_12rem)]"} w-full items-center justify-center`}
      >
        {isSignedIn ? (
          // for logged in users
          <h1 className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-center text-4xl text-transparent">
            Hello, Jatin
          </h1>
        ) : (
          // for new users
          <h1 className="text-center text-5xl text-white">
            Meet{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Century
            </span>
            , <br /> your personal AI Assistant
          </h1>
        )}
      </div>

      {/* chat field */}
      {isSignedIn ? (
        // for logged in users
        <div className="m-auto flex w-[45rem] flex-col rounded-3xl border border-[#9a9fa5]/50 px-4 py-3 text-[#9a9fa5]">
          <input
            placeholder="Ask Century"
            className="flex-1 border-none px-3 text-base text-white outline-none placeholder:text-[#9a9fa5]"
            type="text"
            name="chat-field"
            id="chat-field"
          />
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="group relative">
                <GoPlus className="menu-btns text-4xl text-[#9a9fa5]" />
                <p className="bottom-tooltip">Add files</p>
              </div>
              <div className="group relative">
                <button
                  aria-label="Deep research"
                  className="menu-btns flex items-center gap-2 text-sm text-[#9a9fa5]"
                >
                  <LiaGlobeAmericasSolid className="text-xl" />
                  Deep Research
                </button>
                <p className="bottom-tooltip">Get in depth answers</p>
              </div>
              <div className="group relative">
                <button
                  aria-label="Canvas"
                  className="menu-btns flex items-center gap-2 text-sm text-[#9a9fa5]"
                >
                  <MdOutlineDraw className="text-xl" />
                  Canvas
                </button>
                <p className="bottom-tooltip">Create docs and apps</p>
              </div>
            </div>
            <div className="group relative">
              <FaMicrophone className="menu-btns text-4xl text-[#9a9fa5]" />
              <p className="bottom-tooltip">Use microphone</p>
            </div>
          </div>
        </div>
      ) : (
        // for new users
        <div className="m-auto mt-5 flex w-[45rem] items-center rounded-full border border-[#9a9fa5]/50 px-4 py-2 text-[#868a8f]">
          <div className="group relative">
            <GoPlus className="menu-btns text-4xl text-[#868a8f]" />
            <p className="bottom-tooltip">Add files</p>
          </div>
          <input
            placeholder="Ask Century"
            className="flex-1 border-none px-3 text-base text-white outline-none placeholder:text-[#9a9fa5]"
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
                className="menu-btns flex h-9 w-9 items-center justify-center rounded-full p-2 text-white"
              >
                <IoSend className="text-4xl" />
              </span>
              <p className="bottom-tooltip">Submit</p>
            </div>
          ) : (
            <div className="group relative">
              <FaMicrophone className="menu-btns text-4xl text-[#868a8f]" />
              <p className="bottom-tooltip">Use microphone</p>
            </div>
          )}
        </div>
      )}

      {/* terms and policy */}
      {!isSignedIn && (
        // only shown in not logged in page
        <h3 className="m-auto mt-4 w-fit text-sm text-[#9a9fa5]">
          <span className="underline">Terms</span> and the{" "}
          <span className="underline">Privacy Policy</span> apply, Century can
          make mistakes, so double-check it
        </h3>
      )}
    </section>
  );
};

export default Welcome;
