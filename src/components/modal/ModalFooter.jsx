const ModalFooter = ({ signUpForm, setSignUpForm }) => {
  return (
    <>
      {signUpForm ? (
        // login msg in signup page
        <div className="mt-4 px-8 pb-8 text-center text-xs sm:text-sm dark:text-white">
          Already have an account?
          <a
            onClick={() => setSignUpForm(false)}
            className="ml-2 cursor-pointer font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Log in
          </a>
        </div>
      ) : (
        // signup msg in login page
        <div className="mt-6 px-8 pb-8 text-center text-xs sm:text-sm dark:text-white">
          Don't have an account?
          <a
            onClick={() => setSignUpForm(true)}
            className="ml-2 cursor-pointer font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign up
          </a>
        </div>
      )}
    </>
  );
};

export default ModalFooter;
