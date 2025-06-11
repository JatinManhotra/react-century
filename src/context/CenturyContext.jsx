import { createContext, useEffect, useState } from "react";
import { generateGeminiResponse } from "../services/geminiService";
import { doc, Timestamp, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import useFeedbackMsg from "../hooks/useFeedbackMsg";

export const CenturyContext = createContext();

const CenturyContextProvider = ({ children }) => {
  // declaring states
  const [generatedId, setGeneratedId] = useState(null); // random ids to navigate on new chat

  const [isSignedIn, setIsSignedIn] = useState(false);

  const [hideSidebar, setHideSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [promptInput, setPromptInput] = useState(""); // user prompt

  const [loading, setLoading] = useState(false); // if data is been fetched after sending prompt
  const [errorMsg, setErrorMsg] = useState(false); // if any error occurred

  const [messages, setMessages] = useState([]); // prompt + ai responses

  const [globalFeedback, setGlobalFeedback] = useState({
    msg: "",
    visible: false,
    errorIcon: false,
  });

  const [dark, setDark] = useState(true);

  const [showMoreOptions, setShowMoreOptions] = useState(false); // more options dialog in ai responses

   const [showOptions, setShowOptions] = useState({show:false, title:""}) // show these options in mobile devices

  const [toggleSidebarOptions, setToggleSidebarOptions] = useState(false); // more options dialog in sidebar settings and help btn

  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [recentChat, setRecentChat] = useState(); // user's recent chats in sidebar

  // sets the message in global feedback
  const handleFeedback = (msg, errorIcon) => {
  setGlobalFeedback({ msg, visible: true, errorIcon });
  setTimeout(() => {
    setGlobalFeedback((prev) => ({ ...prev, visible: false }));
  }, 3000);
};

  // generate random id after new chat, and after sending prompt
  const getOrCreateId = () => {
    const id = crypto.randomUUID();
    setGeneratedId(id);
    return id;
  };

  // logout user
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate(`/`);
      handleFeedback("Log out successfully", false);
    } catch (error) {
      console.log(error);
      handleFeedback("Error occurred during logout", true);
    }
  };

  // fetch response from api
  async function handleSubmit(prompt, generatedId) {
    try {
      setPromptInput("");

      // Navigate if not already on the correct route
      const currentPath = location.pathname;
      const expectedPath = `/chat/${generatedId}`;

      if (currentPath !== expectedPath) {
        navigate(expectedPath);
      }

      const userMsg = { id: generatedId, role: "user", text: prompt };
      setMessages((prev) => [...prev, userMsg]);

      setLoading(true); // data is being fetched

      const data = await generateGeminiResponse(prompt); // AI response
      const aiMsg = { id: generatedId, role: "ai", text: data };

      setMessages((prev) => [...prev, aiMsg]);

      const conversation = [userMsg, aiMsg];
      saveConversation(conversation, prompt, generatedId); // pass conversation to store in db

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMsg(true);
      console.log(error);
      setPromptInput("");
    }
  }

  const saveConversation = async (messages, firstPrompt, chatId) => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    try {
      const userSnap = await getDoc(userRef);
      let updatedConversations = [];
      const newMessageObjs = messages.map((msg) => ({
        id: msg.id,
        role: msg.role,
        text: msg.text,
      }));

      if (userSnap.exists()) {
        const data = userSnap.data();
        const existing = data.conversations || [];

        const convoIndex = existing.findIndex((c) => c.id === chatId);

        if (convoIndex !== -1) {
          // Append to existing conversation
          const convo = existing[convoIndex];
          convo.messages = [...convo.messages, ...newMessageObjs];

          updatedConversations = [
            ...existing.slice(0, convoIndex),
            convo,
            ...existing.slice(convoIndex + 1),
          ];
        } else {
          // Create new conversation
          updatedConversations = [
            ...existing,
            {
              id: chatId,
              createdAt: Timestamp.now(),
              title: firstPrompt.split(" ").slice(0, 6).join(" "),
              messages: newMessageObjs,
            },
          ];
        }
      } else {
        // First time user
        updatedConversations = [
          {
            id: chatId,
            createdAt: Timestamp.now(),
            title: firstPrompt.split(" ").slice(0, 6).join(" "),
            messages: newMessageObjs,
          },
        ];
      }

      await setDoc(
        userRef,
        {
          conversations: updatedConversations,
          dark,
        },
        { merge: true }, // to avoid overwriting name/email
      );

      setRecentChat(updatedConversations);

      console.log("Conversation saved ✅");
    } catch (error) {
      console.error("Error saving conversation ❌", error);
    }
  };

  // use enter key to send prompts
  function fetchPrompt(e, prompt, generatedId) {
    if (e.key === "Enter" && prompt.trim().length !== 0) {
      handleSubmit(prompt, generatedId);
      setPromptInput("");
    }
  }

  // a shortcut to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        setHideSidebar((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // sets the body background color on reload
  useEffect(() => {
    if (dark) {
      document.body.style.backgroundColor = "#282a2c";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [dark]);

  // auto hide Sidebar on mobile devices
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHideSidebar(true);
      } else {
        setHideSidebar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CenturyContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        hideSidebar,
        setHideSidebar,
        showModal,
        setShowModal,
        handleSubmit,
        promptInput,
        setPromptInput,
        fetchPrompt,
        loading,
        setLoading,
        errorMsg,
        setErrorMsg,
        messages,
        setMessages,
        generatedId,
        setGeneratedId,
        getOrCreateId,
        showMoreOptions,
        setShowMoreOptions,
        dark,
        setDark,
        toggleSidebarOptions,
        setToggleSidebarOptions,
        username,
        setUsername,
        recentChat,
        setRecentChat,
        handleLogout,
        globalFeedback,
        setGlobalFeedback,
        showOptions,
        setShowOptions
      }}
    >
      {children}
    </CenturyContext.Provider>
  );
};

export default CenturyContextProvider;
