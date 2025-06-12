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
    <form onSubmit={(event) => validateForm(event)} className="px-3 xl:px-8">
      {signUpForm && (
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-xs font-medium text-black xl:text-sm dark:text-white"
          >
            Name
          </label>

          <input
            autoComplete="on"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={validateName}
            className={`form-input ${
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
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
                : "opacity-0"
            }`}
          >
            {nameError.touched ? nameError.msg : "Error"}
          </span>
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-xs font-medium text-black xl:text-sm dark:text-white"
        >
          Email
        </label>

        <input
          autoComplete="on"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyUp={validateEmail}
          className={`form-input ${
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
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
              : "opacity-0"
          }`}
        >
          {emailError.touched ? emailError.msg : "Error"}
        </span>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-xs font-medium text-black xl:text-sm dark:text-white"
        >
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
            className={`form-input ${
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

          {/* eye icon to toggle show and hide password */}
          {showPassword ? (
            <FaRegEyeSlash
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-1 h-[90%] w-12 cursor-pointer rounded-r-sm p-2.5 text-lg dark:bg-[#282a2c]"
            />
          ) : (
            <FaRegEye
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-1 h-[90%] w-12 cursor-pointer rounded-r-sm p-2.5 text-lg dark:bg-[#282a2c]"
            />
          )}
        </div>

        {signUpForm ? (
          <span
            className={`text-xs ${passwordStrengthMsg.touched ? passwordStrengthMsg.color : "opacity-0"}`}
          >
            {passwordStrengthMsg.touched ? passwordStrengthMsg.msg : "Error"}
          </span>
        ) : (
          <span
            className={`text-xs ${
              passwordError.touched
                ? passwordError.error
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
                : "opacity-0"
            }`}
          >
            {passwordError.touched ? passwordError.msg : "Error"}
          </span>
        )}
      </div>

      {!signUpForm && (
        <div className="mt-2 flex items-center justify-between">
          <label
            htmlFor="checkbox"
            className="flex cursor-pointer items-center"
          >
            <input
              autoComplete="on"
              type="checkbox"
              id="checkbox"
              className="rounded border-gray-500 text-indigo-600 accent-indigo-600 focus:ring-indigo-500"
            />

            <span className="ml-2 text-xs xl:text-sm dark:text-white">Remember me</span>
          </label>

          <a className="cursor-pointer text-xs xl:text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
            Forgot password?
          </a>
        </div>
      )}

      <button
        aria-label="Submit form"
        type="submit"
        className="mt-4 w-full xl:text-base text-sm cursor-pointer rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700"
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
