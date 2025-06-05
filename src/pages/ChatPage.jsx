import { useContext, useEffect, useRef, useState } from "react";
import {
  FaCaretDown,
  FaMicrophone,
  FaRegCopy,
  FaVolumeLow,
} from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { CenturyContext } from "../context/CenturyContext";
import user from "../assets/user.png";
import { PiDotsThreeVerticalBold, PiShootingStar } from "react-icons/pi";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { MdOutlineDraw } from "react-icons/md";
import Modal from "../components/Modal";
import { IoRefreshOutline, IoSend } from "react-icons/io5";
import { useLocation, useParams } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";
import ReactMarkdown from "react-markdown";
import { generateGeminiResponse } from "../services/geminiService";
import { LuFlag } from "react-icons/lu";


const ChatPage = () => {
  const {
    isSignedIn,
    setIsSignedIn,
    showModal,
    setShowModal,
    handleSubmit,
    promptInput,
    setPromptInput,
    fetchPrompt,
    messages,
    setMessages,
    loading,
    setLoading,
  } = useContext(CenturyContext);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [feedback, setFeedback] = useState({ msg: "", visible: false });

  const location = useLocation();
  const { id } = useParams();
  const bottomRef = useRef();
  const moreBtnRef = useRef();

  const [showMoreOptions, setShowMoreOptions] = useState(false);

  function handleEditText(index, text) {
    setEditingIndex(index);
    setEditingText(text);
  }

  function handleCancelEdit() {
    setEditingIndex(null);
    setEditingText("");
  }

  async function handleSaveEdit(index, newPrompt, generatedId) {
    setEditingIndex(null);
    setEditingText("");

    const updatedMessages = messages.slice(0, index + 1);
    updatedMessages[index].text = newPrompt;

    setMessages(updatedMessages);
    setPromptInput("");

    try {
      setLoading(true);
      const data = await generateGeminiResponse(newPrompt);
      setMessages((prev) => [
        ...prev,
        { id: generatedId, role: "ai", text: data },
      ]);
    } catch (err) {
      console.error("Failed to regenerate:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleRedo = async (index, prompt, generatedId) => {
    try {
      setLoading(true);

      // Remove the old AI response
      const updatedMessages = messages.slice(0, index + 1);
      setMessages(updatedMessages);

      // Fetch new AI response
      const data = await generateGeminiResponse(prompt);

      // Add new response
      setMessages((prev) => [
        ...prev,
        { id: generatedId, role: "ai", text: data },
      ]);
    } catch (err) {
      console.error("Failed to regenerate:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowMoreOptions(false)
        setFeedback({
          msg: "Copied to clipboard",
          visible: true,
        });
        setTimeout(() => {
          setFeedback((prev) => ({ ...prev, visible: false }));
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  function handleTextChange(e) {
    setEditingText(e.target.value);
    e.target.style.height = "auto"; // reset height
    e.target.style.height = e.target.scrollHeight + "px"; // set new height
  }

  function handleLike() {
    setLike(true);
    setDislike(false);
    setFeedback({
      msg: "Thank you, Your feedback helps make Century better for everyone",
      visible: true,
    });
    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, visible: false }));
    }, 3000);
  }

  function handleDislike() {
    setLike(false);
    setDislike(true);
    setFeedback({
      msg: "Thank you for helping improve Century",
      visible: true,
    });
    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, visible: false }));
    }, 3000);
  }

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this app!",
          text: "AI chat app by Jatin 👇",
          url,
        });
        console.log("Shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
        alert("Could not copy the link.");
      }
    }
  };

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="relative h-screen w-screen bg-[#1b1c1d]">
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

      {/* ai responses field */}
      <div
        className={`custom-scrollbar w-full overflow-y-scroll ${isSignedIn ? "h-[calc(100%_-_14rem)]" : "h-[calc(100%_-_10.5rem)]"} `}
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
              <div className="flex flex-col text-white">
                {msg.role === "user" ? (
                  editingIndex === index ? (
                    <div className="flex flex-col items-end gap-2">
                      <textarea
                        rows={1}
                        name="update-prompt"
                        id="update-prompt"
                        className="w-150 resize-none overflow-hidden rounded-3xl border-2 border-blue-300 bg-[#27292b] p-4 text-white outline-none"
                        value={editingText}
                        onChange={handleTextChange}
                      />
                      <div className="mt-2 flex flex-row-reverse gap-2">
                        <button
                          disabled={editingText === msg.text ? true : false}
                          onClick={() => handleSaveEdit(index, editingText, id)}
                          className="cursor-pointer rounded-full bg-blue-300 px-5 py-2 text-blue-800 hover:bg-blue-400 disabled:cursor-default disabled:bg-[#27292b] disabled:text-[#7e848b]"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="cursor-pointer rounded-full px-5 py-2 text-blue-200 hover:bg-gray-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="group flex flex-row-reverse items-start gap-2">
                      <p className="self-center rounded-l-2xl rounded-br-2xl bg-[#333537] p-3">
                        {msg.text}
                      </p>
                      <div
                        onClick={() => handleEditText(index, msg.text)}
                        className="relative hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#949a9c] group-hover:flex hover:bg-[#353739] active:bg-[#494c4e]"
                      >
                        <FaPencilAlt className="w-4" />
                        <p className="bottom-tooltip">Edit text</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="prose prose-invert animate-height max-w-none self-center overflow-hidden">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
                {msg.role === "ai" && (
                  <div
                    className={`animate-slow-opacity mt-2 flex w-fit cursor-pointer text-lg`}
                  >
                    <div className="group menu-btns relative">
                      {like ? (
                        <BiSolidLike onClick={() => setLike(false)} />
                      ) : (
                        <BiLike onClick={handleLike} />
                      )}
                      <p className="bottom-tooltip">Good response</p>
                    </div>

                    <div className="group menu-btns relative">
                      {dislike ? (
                        <BiSolidDislike onClick={() => setDislike(false)} />
                      ) : (
                        <BiDislike onClick={handleDislike} />
                      )}
                      <p className="bottom-tooltip">Bad response</p>
                    </div>

                    <div className="group menu-btns relative">
                      <IoRefreshOutline
                        onClick={() =>
                          !loading &&
                          handleRedo(index - 1, messages[index - 1]?.text, id)
                        }
                        className={`hover:text-white ${loading ? "pointer-events-none opacity-50" : ""}`}
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
                        className={`${showMoreOptions === index ? "opacity-100" : "pointer-events-none opacity-0"} absolute z-10 bg-[#1b1c1d] whitespace-nowrap text-white shadow shadow-black transition-opacity duration-100 ease-in`}
                      >
                        <li
                          onClick={() => handleCopy(msg.text)}
                          className="mt-2 mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]"
                        >
                          <FaRegCopy className="text-lg" /> Copy
                        </li>
                        <li className="mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]">
                          <FaVolumeLow className="text-lg" /> Listen
                        </li>
                        <li className="mb-2 flex items-center gap-5 px-6 py-2 text-sm hover:bg-[#313234]">
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
              <div className="flex w-full animate-pulse items-center justify-start gap-2 text-white">
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
        <div className="prompt-shadow m-auto flex w-[45rem] items-center rounded-full border border-[#9a9fa5]/50 px-4 py-2 text-[#868a8f]">
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
            onKeyDown={(e) => fetchPrompt(e, promptInput, id)}
          />

          {/* show a send icon when a prompt is added */}
          {promptInput.trim().length >= 1 ? (
            <div className="group relative">
              <span
                onClick={() => handleSubmit(promptInput, id)}
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
          Century can make mistakes, so double-check it
        </h3>
      )}

      <div
        className={`${feedback.visible ? "opacity-100" : "opacity-0"} absolute bottom-5 -left-65 rounded-lg bg-black px-4 py-2 text-white transition-opacity duration-300 ease-in`}
      >
        {feedback.msg}
      </div>
    </section>
  );
};

export default ChatPage;
