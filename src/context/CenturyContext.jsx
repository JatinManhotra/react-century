import React, { createContext, useEffect, useState } from "react";

export const CenturyContext = createContext();

const CenturyContextProvider = ({ children }) => {
  // declaring states
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      }}
    >
      {children}
    </CenturyContext.Provider>
  );
};

export default CenturyContextProvider;
