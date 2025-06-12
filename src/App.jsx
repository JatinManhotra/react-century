import { useContext } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import WelcomePage from "./pages/welcome page/WelcomePage";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/chat page/ChatPage";
import { CenturyContext } from "./context/CenturyContext";
import { AuthProvider } from "./context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";

const App = () => {
  const { globalFeedback } = useContext(CenturyContext);

  return (
    <AuthProvider>
      <>
        <header>
          <h1 className="hidden">This is a header</h1>
        </header>

        <main className="relative flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
          </Routes>
          <div
            className={`${globalFeedback.visible ? "opacity-100" : "opacity-0"} pointer-events-none absolute top-5 left-[50%] z-[101] flex translate-x-[-50%] items-center gap-4 text-sm xl:text-base rounded-lg  bg-black px-4 py-2 text-white transition-opacity duration-300 ease-in`}
          >
            {globalFeedback.errorIcon ? (
              <MdError className=" xl:text-lg text-red-500" />
            ) : (
              <FaCircleCheck className=" xl:text-lg text-green-500" />
            )}
            <p> {globalFeedback.msg}</p>
          </div>
        </main>

        <footer>
          <section className="fixed right-0 bottom-0 left-0 z-[200] bg-blue-500 dark:bg-cyan-500">
            <p className="flex text-sm xl:text-base items-center justify-center gap-2">
              Made with <FaHeart className="text-rose-500" /> by{" "}
              <a
                target="_blank"
                className="hover:text-white"
                href="https://github.com/JatinManhotra"
              >
                Jatin Manhotra
              </a>
            </p>
          </section>
        </footer>
      </>
    </AuthProvider>
  );
};

export default App;
