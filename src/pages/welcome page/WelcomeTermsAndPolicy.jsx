const WelcomeTermsAndPolicy = ({isSignedIn}) => {
  return (
   <>
   {!isSignedIn && (

        // only shown in not logged in page
        <h3 className="m-auto mt-4 w-fit text-sm text-[#595c5f] dark:text-[#9a9fa5]">
          <span className="underline">Terms</span> and the{" "}
          <span className="underline">Privacy Policy</span> apply, Century can
          make mistakes, so double-check it
        </h3>
      )}
   </>
  )
}

export default WelcomeTermsAndPolicy