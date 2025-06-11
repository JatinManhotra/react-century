import { useContext } from "react";
import { CenturyContext } from "../../context/CenturyContext";
import Modal from "../../components/modal/modal.jsx";
import WelcomeHeader from "./WelcomeHeader.jsx";
import WelcomeGreeting from "./WelcomeGreeting.jsx";
import WelcomeChat from "./WelcomeChat.jsx";
import WelcomeTermsAndPolicy from "./WelcomeTermsAndPolicy.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import logo from "../../assets/logo.png";

const Welcome = () => {
  const {
    isSignedIn,
    setIsSignedIn,
    showModal,
    handleSubmit,
    promptInput,
    setPromptInput,
    fetchPrompt,
    getOrCreateId,
  } = useContext(CenturyContext);

  const { loading } = useAuth();

  // shows a loading ui when auth is in progress
  if (loading) {
    return (
      <div className="relative flex h-screen w-screen bg-[#fff] dark:bg-[#1b1c1d] items-center justify-center ">
        <div className="div-spinner flex h-75 w-75 items-center justify-center rounded-full"></div>
        <img
          className="scale-img absolute top-[50%] left-[50%] w-70 translate-x-[-50%] translate-y-[-50%] rounded-full"
          src={logo}
          alt="Century logo"
        />
      </div>
    );
  }

  return (
    <section className="h-screen w-screen bg-[#fff] dark:bg-[#1b1c1d]">
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
