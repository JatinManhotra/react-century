import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase"; // your firebase setup
import { CenturyContext } from "./CenturyContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [userData, setUserData] = useState(null); // Firestore name/email
  const [loading, setLoading] = useState(true);
  
   

   const { setIsSignedIn, setUsername, recentChat, setRecentChat } = useContext(CenturyContext);

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
          setUsername(data.name);
          setRecentChat(data.conversations || []); // ✅ fetch recent chats on login/reload
        } else {
          setUserData(null);
          setRecentChat([]); // no conversations
        }
      } else {
          setIsSignedIn(false);
        setUsername("");
        setUserData(null);
        setRecentChat([]);
      }

      setLoading(false); // done with auth and Firestore
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, setUserData, loading,recentChat, setRecentChat }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
