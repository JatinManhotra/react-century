import { useContext, useState } from "react";
import { CenturyContext } from "../context/CenturyContext";
import logo from "../assets/logo.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BiSolidXCircle } from "react-icons/bi";

const Modal = () => {
  const { setShowModal } = useContext(CenturyContext);

  // declaring states
  const [showPassword, setShowPassword] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);

  // input fields and their error msgs
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState({
    msg: "",
    error: false,
    touched: false, // this key & value helps to hide the error msg on component mount, the error then displays when input is entered in the field
  });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({
    msg: "",
    error: false,
    touched: false,
  });
  const [password, setPassword] = useState("");
  const [passwordStrengthMsg, setPasswordStrengthMsg] = useState({
    msg: "",
    border: "",
    color: "",
    touched: false,
  });
  const [passwordError, setPasswordError] = useState({
    msg: "",
    error: false,
    touched: false,
  });

  const [allErrorsMsg, setAllErrorsMsg] = useState({
    opacity: "",
    msg: "",
    error: false,
  });

  // validation using RegEx
  function validateName() {
    setNameError((prev) => ({ ...prev, touched: true }));

    if (name.trim().length === 0) {
      setNameError({ msg: "Name is required", error: true, touched: true });
      return false;
    }

    if (!name.match(/^[A-Za-z]{2,}(?:\s[A-Za-z]+)?$/)) {
      setNameError({ msg: "Write a valid name", error: true, touched: true });
      return false;
    }

    setNameError({ msg: "Name Looks Good", error: false, touched: true });
    return true;
  }

  function validateEmail() {
    setEmailError((prev) => ({ ...prev, touched: true }));

    if (email.trim().length === 0) {
      setEmailError({ msg: "Email is required", error: true, touched: true });
      return false;
    }
    if (
      !email.match(
        /^[A-Za-z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
      )
    ) {
      setEmailError({ msg: "Use a valid email", error: true, touched: true });
      return false;
    }
    setEmailError({ msg: "Email Looks Good", error: false, touched: true });
    return true;
  }

  function validatePassword() {
    setPasswordError((prev) => ({ ...prev, touched: true }));
    if (password.trim().length === 0) {
      setPasswordError({
        msg: "Password is required",
        error: true,
        touched: true,
      });
      return false;
    }
    if (password.length < 4) {
      setPasswordError({
        msg: "Password can only be 4 or more characters long",
        error: true,
        touched: true,
      });
      return false;
    }
    setPasswordError({
      msg: "Password Looks Good",
      error: false,
      touched: true,
    });
    return true;
  }

  // function to show password strength in sign up page
  function passwordStrength() {
    setPasswordStrengthMsg((prev) => ({ ...prev, touched: true }));
    if (password.trim().length === 0) {
      setPasswordStrengthMsg({
        msg: "Password cannot be empty",
        border: "border-red-500",
        color: "text-red-400",
        touched: true,
      });
      return false;
    } else if (password.trim().length < 4) {
      setPasswordStrengthMsg({
        msg: "Password strength is weak",
        border: "border-red-500",
        color: "text-red-400",
        touched: true,
      });
      return false; // weak password should not be acceptable
    } else if (password.trim().length >= 4 && password.trim().length < 8) {
      setPasswordStrengthMsg({
        msg: "Password strength is medium",
        border: "border-orange-500",
        color: "text-orange-400",
        touched: true,
      });
      return true;
    } else {
      setPasswordStrengthMsg({
        msg: "Password strength is strong",
        border: "border-green-500",
        color: "text-green-400",
        touched: true,
      });
      return true;
    }
  }

  function validateForm(event) {
    event.preventDefault();

    if (signUpForm) {
      // for signup page
      if (
        name.trim().length === 0 ||
        email.trim().length === 0 ||
        password.trim().length === 0
      ) {
        setAllErrorsMsg({
          opacity: "opacity-100",
          msg: "All input fields are empty",
          error: true,
        });
        setTimeout(() => {
          setAllErrorsMsg((prev) => ({
            ...prev,
            opacity: "opacity-0",
            error: false,
          }));
        }, 3000);
        return false;
      }

      if (
        !validateName() ||
        !validateEmail() ||
        !validatePassword() ||
        !passwordStrength()
      ) {
        setAllErrorsMsg({
          opacity: "opacity-100",
          msg: "Please fix all errors",
          error: true,
        });
        setTimeout(() => {
          setAllErrorsMsg((prev) => ({
            ...prev,
            opacity: "opacity-0",
            error: false,
          }));
        }, 3000);
        return false;
      }
    } else {
      // for login page
      if (email.trim().length === 0 || password.trim().length === 0) {
        setAllErrorsMsg({
          opacity: "opacity-100",
          msg: "Email and password are required",
          error: true,
        });
        setTimeout(() => {
          setAllErrorsMsg((prev) => ({
            ...prev,
            opacity: "opacity-0",
            error: false,
          }));
        }, 3000);
        return false;
      }

      if (!validateEmail() || !validatePassword()) {
        setAllErrorsMsg({
          opacity: "opacity-100",
          msg: "Please fix all errors",
          error: true,
        });
        setTimeout(() => {
          setAllErrorsMsg((prev) => ({
            ...prev,
            opacity: "opacity-0",
            error: false,
          }));
        }, 3000);
        return false;
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 z-[99] flex h-screen w-screen items-center justify-center">

      {/* faint black background for modal */}
      <div
        onClick={() => setShowModal(false)}
        className="animate-opacity fixed h-screen w-screen bg-black/50"
      ></div> 

      {/* modal component */}
      <div className="pop-down z-[100] w-full max-w-md rounded-xl bg-[#282a2c] text-white shadow-lg">
        
        {/* logo and text with close icon */}
        <div className="relative mb-6 flex items-center justify-center gap-5 rounded-t-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 px-2 py-3 text-2xl font-bold text-white">
          <img src={logo} alt="Century logo" className="w-25" />
          <h2>{signUpForm ? "Sign Up" : "Log In"} To Century</h2>
          <BiSolidXCircle
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3 cursor-pointer"
          />
        </div>

        <form onSubmit={(event) => validateForm(event)} className="px-8">
          {signUpForm && (
            // Name field
            // only show this field in sign up page
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="true"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyUp={validateName}
                className={`w-full rounded-lg border px-4 py-2 transition-all outline-none placeholder:text-sm placeholder:text-gray-400 ${
                  nameError.touched
                    ? nameError.error
                      ? "border-red-500"
                      : "border-green-500"
                    : "border-gray-500"
                }`}
                placeholder="Your name"
              />
              <span
                className={`text-xs ${
                  nameError.touched
                    ? nameError.error
                      ? "text-red-400"
                      : "text-green-400"
                    : "opacity-0"
                }`}
              >
                {nameError.touched ? nameError.msg : "Error"}
              </span>
            </div>
          )}

           {/* email field */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={validateEmail}
              className={`w-full rounded-lg border px-4 py-2 transition-all outline-none placeholder:text-sm placeholder:text-gray-400 ${
                emailError.touched
                  ? emailError.error
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-gray-500"
              }`}
              placeholder="your@email.com"
            />
            <span
              className={`text-xs ${
                emailError.touched
                  ? emailError.error
                    ? "text-red-400"
                    : "text-green-400"
                  : "opacity-0"
              }`}
            >
              {emailError.touched ? emailError.msg : "Error"}
            </span>
          </div>

                {/* password field */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"} // toggle show password
                name="password"
                id="password"
                autoComplete="true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={signUpForm ? passwordStrength : validatePassword} // check for password strength in signup page and validation in login page

                className={`w-full rounded-lg border px-4 py-2 transition-all outline-none placeholder:text-sm placeholder:text-gray-400 ${
                  signUpForm
                    ? passwordStrengthMsg.touched
                      ? passwordStrengthMsg.border
                      : "border-gray-500"
                    : passwordError.touched
                      ? passwordError.error
                        ? "border-red-500"
                        : "border-green-500"
                      : "border-gray-500"
                }`}
                placeholder="••••••••"
              />

              {showPassword ? ( 
                // show password eye btn
                <FaRegEyeSlash
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-1 h-[90%] w-12 cursor-pointer rounded-r-sm bg-[#282a2c] p-2.5 text-lg"
                />
              ) : (
                <FaRegEye
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-1 h-[90%] w-12 cursor-pointer rounded-r-sm bg-[#282a2c] p-2.5 text-lg"
                />
              )}
            </div>
            {signUpForm ? (
              // password strength error
              <span
                className={`text-xs ${passwordStrengthMsg.touched ? passwordStrengthMsg.color : "opacity-0"}`}
              >
                {passwordStrengthMsg.touched
                  ? passwordStrengthMsg.msg
                  : "Error"}
              </span>
            ) : (
              // password validation error
              <span
                className={`text-xs ${
                  passwordError.touched
                    ? passwordError.error
                      ? "text-red-400"
                      : "text-green-400"
                    : "opacity-0"
                }`}
              >
                {passwordError.touched ? passwordError.msg : "Error"}
              </span>
            )}
          </div>

          {!signUpForm && (
            // hide these in signup page
            <div className="mt-2 flex items-center justify-between">
              <label
                htmlFor="checkbox"
                className="flex cursor-pointer items-center"
              >
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  className="cursor-pointer rounded border-gray-500 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-white">Remember me</span>
              </label>
              <a className="cursor-pointer text-sm text-indigo-400 hover:text-indigo-300">
                Forgot password?
              </a>
            </div>
          )}

          <button
            aria-label="Sign Up / Log In"
            className="mt-4 w-full cursor-pointer rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            {signUpForm ? "Sign Up" : "Log In"}
          </button>

          {/* all error msg */}
          <span
            className={`text-sm text-red-400 ${allErrorsMsg.error ? allErrorsMsg.opacity : "opacity-0"}`}
          >
            {allErrorsMsg.error ? allErrorsMsg.msg : "Error"}
          </span>
        </form>

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
      </div>
    </div>
  );
};

export default Modal;
