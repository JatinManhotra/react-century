import { useContext } from "react";
import { CenturyContext } from "../../context/CenturyContext";

const WelcomeGreeting = ({ isSignedIn }) => {
  const { username } = useContext(CenturyContext);

  return (

    <div
      className={`flex ${isSignedIn ? "h-[calc(100%_-_16rem)] xl:h-[calc(100%_-_14.5rem)]" : "h-[calc(100%_-_15rem)] xl:h-[calc(100%_-_13rem)]"} w-full items-center justify-center`}
    >

      {isSignedIn ? (

        // for logged in users
        <h1 className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-center text-3xl xl:text-4xl text-transparent">
          Hello, {username}
        </h1>
      ) : (
        
        // for new users
        <h1 className="text-center text-3xl xl:text-5xl text-[#424242] dark:text-white">
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
