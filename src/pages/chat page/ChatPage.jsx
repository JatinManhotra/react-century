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
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/modal/Modal";
import useFeedbackMsg from "../../hooks/useFeedbackMsg";

const ChatPage = () => {

  const {
    isSignedIn,
    setIsSignedIn,
    showModal,
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
    recentChat,
  } = useContext(CenturyContext);

  const {handleFeedback} = useFeedbackMsg()

  const [editingIndex, setEditingIndex] = useState(null); // user's prompt index which will be edited

  const [editingText, setEditingText] = useState(""); // text to show after edited

  const [feedbacks, setFeedbacks] = useState({}); // feedback messages

  const [activeFeedbackIndex, setActiveFeedbackIndex] = useState(null); // using the index of a ai response to show feedback msg

  const { id } = useParams();
  const bottomRef = useRef();
  const moreBtnRef = useRef();

  const { setUserData } = useAuth();

  // sets the received index and text to editing states
  function handleEditText(index, text) {
    setEditingIndex(index);
    setEditingText(text);
  }

  // cancels prompt editing
  function handleCancelEdit() {
    setEditingIndex(null);
    setEditingText("");
  }

  // sends the new prompt to ai
  async function handleSaveEdit(index, newPrompt, generatedId) {

    setEditingIndex(null);
    setEditingText("");

    // clears all the msgs after that prompt
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
      handleFeedback("Failed to send new prompt", true)
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // re-fetches the same user prompt
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
      handleFeedback("Failed to regenerate", true)
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // copies the ai response to clipboard
  const handleCopy = (text, index) => {

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowMoreOptions(false);
        setFeedbacks((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            msg: "Copied to clipboard",
            feedbackVisible: true,
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
      })
      .catch((err) => {
         handleFeedback("Failed to copy", true)
        console.error(err);
      });
  };

  // auto adjusts the height of textarea while editing user's prompt
  function handleTextChange(e) {
    setEditingText(e.target.value);
    e.target.style.height = "auto"; // reset height
    e.target.style.height = e.target.scrollHeight + "px"; // set new height
  }

  // shows a feedback after liking AI response
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

   // shows a feedback after disliking AI response
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

  // opens a popup to share the project
  const handleShare = async () => {
    const url = "https://JatinManhotra.github.io/react-century";

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this app!",
          text: "AI chat app by Jatin 👇",
          url,
        });
      } catch (err) {
        console.error(err);
        handleFeedback("Sharing failed", true)
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

  // shows the full conversation after clicking on a recent chat
  useEffect(() => {
    if (!id || !recentChat?.length) return;

    const chat = recentChat.find((c) => c.id === id);
    if (chat) {
      setMessages(chat.messages);
    }
  }, [id, recentChat]);

  // load msgs in a conversation after reloading page
  useEffect(() => {
    const fetchMessages = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const conversation = data.conversations.find((c) => c.id === id);

        if (conversation) {
          setMessages(conversation.messages);
          setUserData(data);
        }
      }

      setLoading(false);
    };

    fetchMessages();
  }, [id]);

  // scrolls to the bottom after a new msg arrives/send
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="relative h-screen w-screen bg-white dark:bg-[#1b1c1d]">
      
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
      <ChatTermsAndPolicy />

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
