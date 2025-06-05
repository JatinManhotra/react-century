import React, { createContext, useEffect, useState } from "react";
import { generateGeminiResponse } from "../services/geminiService";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

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

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const getOrCreateId = () => {
    const id = crypto.randomUUID();
    setGeneratedId(id);
    return id;
  };

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

      // Add user prompt
      setMessages((prev) => [
        ...prev,
        { id: generatedId, role: "user", text: prompt },
      ]);

      setLoading(true);

      const data = await generateGeminiResponse(prompt);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        { id: generatedId, role: "ai", text: data },
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMsg(true);
      console.log(error);
      setPromptInput("");
    }
  }



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
      }}
    >
      {children}
    </CenturyContext.Provider>
  );
};

export default CenturyContextProvider;
