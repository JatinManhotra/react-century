import React, { createContext, useEffect, useState } from "react";
import { generateGeminiResponse } from "../services/geminiService";
import {
  doc,
  Timestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import { signOut } from "firebase/auth";

export const CenturyContext = createContext();

const CenturyContextProvider = ({ children }) => {
  // declaring states
  const [generatedId, setGeneratedId] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [messages, setMessages] = useState([]);

  const [dark, setDark] = useState(true);

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [toggleSidebarOptions, setToggleSidebarOptions] = useState(false);

  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [recentChat, setRecentChat] = useState();

  const getOrCreateId = () => {
    const id = crypto.randomUUID();
    setGeneratedId(id);
    return id;
  };

   const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate(`/`)
        console.log("User logged out")
      } catch (error) {
        console.log("Logout error",error)
      }
    }

  // console.log(getOrCreateId());

  // fetch response from api
  async function handleSubmit(prompt, generatedId) {
    try {
      // Only navigate to /chat/:id the first time
      setPromptInput("");

      // Navigate if not already on the correct route
      const currentPath = location.pathname;
      const expectedPath = `/chat/${generatedId}`;

      if (currentPath !== expectedPath) {
        navigate(expectedPath);
      }

      setLoading(true);

      const data = await generateGeminiResponse(prompt);

      const userMsg = { id: generatedId, role: "user", text: prompt };
      const aiMsg = { id: generatedId, role: "ai", text: data };
      const conversation = [userMsg, aiMsg];

      setMessages((prev) => {
        const updated = [...prev, ...conversation];
        saveConversation(conversation, prompt, generatedId); // Pass the ID too
        return updated;
      });

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
        recentChat, setRecentChat,handleLogout
      }}
    >
      {children}
    </CenturyContext.Provider>
  );
};

export default CenturyContextProvider;
