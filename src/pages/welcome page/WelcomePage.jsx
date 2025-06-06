import { useContext, useState } from "react";
import { CenturyContext } from "../../context/CenturyContext";
import Modal from "../../components/modal/modal.jsx";
import WelcomeHeader from "./WelcomeHeader.jsx";
import WelcomeGreeting from "./WelcomeGreeting.jsx";
import WelcomeChat from "./WelcomeChat.jsx";
import WelcomeTermsAndPolicy from "./WelcomeTermsAndPolicy.jsx";

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
      <WelcomeHeader isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />

      {/* modal */}
      {showModal && <Modal />}

      {/* greeting message */}
      <WelcomeGreeting isSignedIn={isSignedIn} />

      {/* chat field */}
      <WelcomeChat
        isSignedIn={isSignedIn}
        promptInput={promptInput}
        setPromptInput={setPromptInput}
        fetchPrompt={fetchPrompt}
        getOrCreateId={getOrCreateId}
        handleSubmit={handleSubmit}
      />

      {/* terms and policy */}
      <WelcomeTermsAndPolicy isSignedIn={isSignedIn} />
    </section>
  );
};

export default Welcome;
