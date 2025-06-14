const ChatFeedback = ({ activeFeedbackIndex, feedbacks, hideSidebar }) => {
  return (
    <>
    {activeFeedbackIndex !== null && (
        <div
          className={`${(feedbacks[activeFeedbackIndex]?.feedbackVisible) ? "opacity-100" : "opacity-0"} ${
            !hideSidebar ? "xl:-left-65" : "xl:-left-10"
          } absolute bottom-7 z-[101] rounded-lg  bg-black px-4 py-2 text-white  transition-opacity text-sm xl:text-base duration-700 ease-in`}
        >
          {feedbacks[activeFeedbackIndex]?.msg}
        </div>
      )}
    </>
  )
}

export default ChatFeedback