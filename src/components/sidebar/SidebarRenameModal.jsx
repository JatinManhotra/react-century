import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase"; // adjust your path
import { getAuth } from "firebase/auth";

const SidebarRenameModal = ({
  chatId,
  currentTitle,
  setShowRenameModal,
  showRenameModal,
  updateTitleInUI,
}) => {
  const [newTitle, setNewTitle] = useState(currentTitle);

 const handleUpdate = async () => {
  if (!chatId || newTitle.trim() === "") return;

  try {
    const user = getAuth().currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const conversations = data.conversations || [];

      const updatedConversations = conversations.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle.trim() } : chat
      );

      await updateDoc(userRef, { conversations: updatedConversations });

      updateTitleInUI(chatId, newTitle.trim());
      setShowRenameModal(false);
    } else {
      console.log("User doc doesn't exist ❌");
    }
  } catch (error) {
    console.error("Failed to rename chat:", error);
  }
};

  useEffect(() => {
    setNewTitle(currentTitle);
  }, [currentTitle]);

  if (!chatId || !showRenameModal) return null;

  return (
    <div className="fixed top-0 left-0 z-[99] flex h-screen w-screen items-center justify-center">
      <div
        onClick={() => setShowRenameModal(false)}
        className="animate-opacity fixed z-[98] h-screen w-screen bg-black/50"
      ></div>

      <div className="z-[100] flex h-[15rem] w-[30rem] flex-col items-end gap-2 rounded-2xl dark:bg-[#1f1f1f] bg-[#f0f4f9] px-6 py-6">
        <h1 className="mb-5 self-start text-2xl text-black dark:text-white">
          Rename this chat
        </h1>

        <textarea
          rows={1}
          name="rename-field"
          id="rename-field"
          className="w-full resize-none overflow-hidden rounded-lg border-2 border-blue-600 dark:border-blue-300 text-black dark:bg-[#1f1f1f] p-4 text-lg dark:text-white outline-none"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <div className="mt-2 flex flex-row-reverse gap-2">
          <button
            disabled={newTitle.trim() === currentTitle.trim()}
            onClick={handleUpdate}
            className="cursor-pointer rounded-full text-white bg-blue-600 hover:bg-blue-500 dark:bg-blue-300 px-5 py-2 dark:text-blue-800 dark:hover:bg-blue-400 disabled:cursor-default dark:disabled:bg-[#27292b] dark:disabled:text-[#7e848b]"
          >
            Update
          </button>
          <button
            onClick={() => setShowRenameModal(false)}
             className="cursor-pointer rounded-full px-5 py-2 text-blue-600 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarRenameModal;
