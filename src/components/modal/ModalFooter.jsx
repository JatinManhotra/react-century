import React from "react";

const ModalFooter = ({ signUpForm, setSignUpForm }) => {
  return (
    <>
      {signUpForm ? (
        // login msg in signup page
        <div className="mt-4 px-8 pb-8 text-center text-sm text-white">
          Already have an account?
          <a
            onClick={() => setSignUpForm(false)}
            className="ml-2 cursor-pointer font-medium text-indigo-400 hover:text-indigo-300"
          >
            Log in
          </a>
        </div>
      ) : (
        // signup msg in login page
        <div className="mt-6 px-8 pb-8 text-center text-sm text-white">
          Don't have an account?
          <a
            onClick={() => setSignUpForm(true)}
            className="ml-2 cursor-pointer font-medium text-indigo-400 hover:text-indigo-300"
          >
            Sign up
          </a>
        </div>
      )}
    </>
  );
};

export default ModalFooter;
