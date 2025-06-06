import React from 'react'

const ChatTermsAndPolicy = ({isSignedIn}) => {
  return (
    <>
     {!isSignedIn && (
        // only shown in not logged in page
        <h3 className="m-auto mt-4 w-fit text-sm text-[#9a9fa5]">
          Century can make mistakes, so double-check it
        </h3>
      )}
    </>
  )
}

export default ChatTermsAndPolicy