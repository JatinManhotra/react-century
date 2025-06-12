import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getAuth } from "firebase/auth";
import useFeedbackMsg from "../../hooks/useFeedbackMsg";

const SidebarRenameModal = ({
  chatId,
  currentTitle,
  setShowRenameModal,
  showRenameModal,
  updateTitleInUI,
}) => {
  const [newTitle, setNewTitle] = useState(currentTitle);
  const { handleFeedback } = useFeedbackMsg();

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

        // sets the updated title and then sends to db
        const updatedConversations = conversations.map((chat) =>
          chat.id === chatId ? { ...chat, title: newTitle.trim() } : chat,
        );

        await updateDoc(userRef, { conversations: updatedConversations });

        // updates the UI with new title
        updateTitleInUI(chatId, newTitle.trim());
        setShowRenameModal(false);
        handleFeedback("Updated Successfully", false);
      } else {
        handleFeedback("User doc doesn't exist", true);
      }
    } catch (error) {
      handleFeedback("Failed to rename chat", true);
      console.log(error);
    }
  };

  useEffect(() => {
    setNewTitle(currentTitle);
  }, [currentTitle]);

  if (!chatId || !showRenameModal) return null;

  return (
    <div className="fixed top-0 left-0 z-[99] flex h-screen w-screen items-center justify-center">
      {/* black background */}
      <div
        onClick={() => setShowRenameModal(false)}
        className="animate-opacity fixed z-[98] h-screen w-screen bg-black/50"
      ></div>

      <div className="z-[100] flex h-[15rem] w-[90%] xl:w-[30rem] flex-col items-end gap-2 rounded-2xl bg-[#f0f4f9] px-6 py-6 dark:bg-[#1f1f1f]">
        <h1 className="mb-5 self-start text-lg xl:text-2xl text-black dark:text-white">
          Rename this chat
        </h1>

        <textarea
          rows={1}
          name="rename-field"
          id="rename-field"
          className="w-full resize-none overflow-hidden rounded-lg border-2 border-blue-600 p-4 xl:text-lg text-black outline-none dark:border-blue-300 dark:bg-[#1f1f1f] dark:text-white"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <div className="mt-2 flex flex-row-reverse gap-2">
          <button
            aria-label="Update title"
            disabled={newTitle.trim() === currentTitle.trim()}
            onClick={handleUpdate}
            className="cursor-pointer rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-500 disabled:cursor-default dark:bg-blue-300 dark:text-blue-800 dark:hover:bg-blue-400 dark:disabled:bg-[#27292b] text-sm xl:text-base dark:disabled:text-[#7e848b]"
          >
            Update
          </button>

          <button
            aria-label="Cancel editing"
            onClick={() => setShowRenameModal(false)}
            className="cursor-pointer rounded-full px-5 py-2 text-sm xl:text-base text-blue-600 hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarRenameModal;
