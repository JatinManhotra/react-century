import { useContext, useEffect, useRef, useState } from "react";

import { CenturyContext } from "../../context/CenturyContext";


import { useLocation, useParams } from "react-router-dom";

import logo from "../../assets/logo.png";

import { generateGeminiResponse } from "../../services/geminiService";

import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatField from "./ChatField";
import ChatTermsAndPolicy from "./ChatTermsAndPolicy";
import ChatFeedback from "./ChatFeedback";
import Modal from "../../components/modal/modal";

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
    showMoreOptions,
    setShowMoreOptions,
    hideSidebar,
  } = useContext(CenturyContext);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [feedbacks, setFeedbacks] = useState({});
  const [activeFeedbackIndex, setActiveFeedbackIndex] = useState(null);

  const location = useLocation();
  const { id } = useParams();
  const bottomRef = useRef();
  const moreBtnRef = useRef();

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
        setShowMoreOptions(false);
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

  function handleLike(index) {
    setFeedbacks((prev) => ({
      ...prev,
      [index]: {
        like: true,
        dislike: false,
        feedbackVisible: true,
        msg: "Thank you, Your feedback helps make Century better for everyone",
      },
    }));
    setActiveFeedbackIndex(index);

    setTimeout(() => {
      setFeedbacks((prev) => ({
        ...prev,
        [index]: { ...prev[index], feedbackVisible: false },
      }));
      setActiveFeedbackIndex(null);
    }, 3000);
  }

  function handleDislike(index) {
    setFeedbacks((prev) => ({
      ...prev,
      [index]: {
        like: false,
        dislike: true,
        feedbackVisible: true,
        msg: "Thank you for helping improve Century",
      },
    }));
    setActiveFeedbackIndex(index);

    setTimeout(() => {
      setFeedbacks((prev) => ({
        ...prev,
        [index]: { ...prev[index], feedbackVisible: false },
      }));
      setActiveFeedbackIndex(null);
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
      <ChatHeader isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />

      {/* modal */}
      {showModal && <Modal />}

      {/* ai responses field */}
      <ChatBody
      handleEditText={handleEditText}
        isSignedIn={isSignedIn}
        messages={messages}
        editingIndex={editingIndex}
        editingText={editingText}
        handleTextChange={handleTextChange}
        handleSaveEdit={handleSaveEdit}
        id={id}
        handleCancelEdit={handleCancelEdit}
        feedbacks={feedbacks}
        handleLike={handleLike}
        handleDislike={handleDislike}
        handleRedo={handleRedo}
        loading={loading}
        handleShare={handleShare}
        showMoreOptions={showMoreOptions}
        setShowMoreOptions={setShowMoreOptions}
        handleCopy={handleCopy}
        moreBtnRef={moreBtnRef}
        bottomRef={bottomRef}
        logo={logo}
      />

      {/* chat field */}
      <ChatField
        isSignedIn={isSignedIn}
        promptInput={promptInput}
        setPromptInput={setPromptInput}
        fetchPrompt={fetchPrompt}
        handleSubmit={handleSubmit}
        id={id}
      />

      {/* terms and policy */}
      <ChatTermsAndPolicy isSignedIn={isSignedIn} />

      {/* feedback message */}
      <ChatFeedback
        activeFeedbackIndex={activeFeedbackIndex}
        feedbacks={feedbacks}
        hideSidebar={hideSidebar}
      />
    </section>
  );
};

export default ChatPage;
