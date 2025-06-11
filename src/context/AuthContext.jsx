import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { CenturyContext } from "./CenturyContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [userData, setUserData] = useState(null); // Firestore name/email
  const [loading, setLoading] = useState(true); // Is Firestore data loading?

  const { setIsSignedIn, setUsername, recentChat, setRecentChat, setDark } =
    useContext(CenturyContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setIsSignedIn(true);
        const userRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();
          setUserData(data);
          const firstName = data.name.split(" ");
          setUsername(firstName[0]);
          setRecentChat(data.conversations || []);
          setDark(data.dark ?? true);
          localStorage.setItem("darkMode", String(data.dark ?? true)); // sets theme mode in localstorage and keeps it after user logs out

          if (data.dark) {
            // sets the theme
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        } else {
          setUserData(null);
          setRecentChat([]);
          setDark(true);
          document.documentElement.classList.add("dark");
        }
      } else {
        setIsSignedIn(false);
        setUsername("");
        setUserData(null);
        setRecentChat([]);

        const storedTheme = localStorage.getItem("darkMode");
        const prefersDark =
          storedTheme === null ? true : storedTheme === "true";
        setDark(prefersDark);

        if (prefersDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }

      setLoading(false); // done with auth and Firestore
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        setUserData,
        loading,
        recentChat,
        setRecentChat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
