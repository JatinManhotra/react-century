import { useContext } from "react";
import { CenturyContext } from "../../context/CenturyContext";

const WelcomeGreeting = ({ isSignedIn }) => {
  const { username } = useContext(CenturyContext);

  return (
    <div
      className={`flex ${isSignedIn ? "h-[calc(100%_-_14rem)]" : "h-[calc(100%_-_12rem)]"} w-full items-center justify-center`}
    >
      {isSignedIn ? (
        // for logged in users
        <h1 className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-center text-4xl text-transparent">
          Hello, {username}
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
  );
};

export default WelcomeGreeting;
