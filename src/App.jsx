import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import WelcomePage from "./pages/welcome page/WelcomePage";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/chat page/ChatPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CenturyContext } from "./context/CenturyContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

const App = () => {
  

  return (
    <AuthProvider>
      <>
        <header>
          <h1 className="hidden">This is a header</h1>
        </header>

        <main className="flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/chat/:id" element={<ChatPage />} />
          </Routes>
        </main>

        <footer></footer>
      </>
    </AuthProvider>
  );
};

export default App;
