
import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const ModalBodyForm = ({
  signUpForm,
  name,
  setName,
  nameError,
  validateName,
  email,
  setEmail,
  emailError,
  validateEmail,
  password,
  setPassword,
  passwordError,
  validatePassword,
  passwordStrengthMsg,
  passwordStrength,
  showPassword,
  setShowPassword,
  allErrorsMsg,
  validateForm,
}) => {

  

  return (
    <form onSubmit={(event) => validateForm(event)} className="px-8">
      {signUpForm && (
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-white">
            Name
          </label>
          <input
          autoComplete="on"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={validateName}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition-all placeholder:text-sm placeholder:text-gray-400 ${
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

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-white">
          Email
        </label>
        <input
          autoComplete="on"

          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyUp={validateEmail}
          className={`w-full rounded-lg border px-4 py-2 outline-none transition-all placeholder:text-sm placeholder:text-gray-400 ${
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

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-white">
          Password
        </label>
        <div className="relative flex items-center">
          <input
          autoComplete="on"

            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={signUpForm ? passwordStrength : validatePassword}
            className={`w-full rounded-lg border px-4 py-2 outline-none transition-all placeholder:text-sm placeholder:text-gray-400 ${
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
          <span className={`text-xs ${passwordStrengthMsg.touched ? passwordStrengthMsg.color : "opacity-0"}`}>
            {passwordStrengthMsg.touched ? passwordStrengthMsg.msg : "Error"}
          </span>
        ) : (
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
        <div className="mt-2 flex items-center justify-between">
          <label htmlFor="checkbox" className="flex cursor-pointer items-center">
            <input
          autoComplete="on"

              type="checkbox"
              id="checkbox"
              className="rounded border-gray-500 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-white">Remember me</span>
          </label>
          <a className="cursor-pointer text-sm text-indigo-400 hover:text-indigo-300">
            Forgot password?
          </a>
        </div>
      )}

      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition-colors cursor-pointer hover:bg-indigo-700"
      >
        {signUpForm ? "Sign Up" : "Log In"}
      </button>

      <span
        className={`text-sm text-red-400 ${allErrorsMsg.error ? allErrorsMsg.opacity : "opacity-0"}`}
      >
        {allErrorsMsg.error ? allErrorsMsg.msg : "Error"}
      </span>
    </form>
  );
};

export default ModalBodyForm;
