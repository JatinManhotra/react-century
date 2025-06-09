import { useContext, useState } from "react";
import { CenturyContext } from "../../context/CenturyContext";
import ModalBodyForm from "./ModalBodyForm";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Modal = () => {
  const { setShowModal,username, setUsername } = useContext(CenturyContext);

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
    if (password.length < 6) {
      setPasswordError({
        msg: "Password can only be 6 or more characters long",
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
    } else if (password.trim().length < 6) {
      setPasswordStrengthMsg({
        msg: "Password strength is weak",
        border: "border-red-500",
        color: "text-red-400",
        touched: true,
      });
      return false; // weak password should not be acceptable
    } else if (password.trim().length >= 6 && password.trim().length < 8) {
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

  async function validateForm(event) {
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
        return;
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
        return;
      }
      try {
      await handleSignUp(name, email, password);
      setIsSignedIn(true);
      
       // if you use this
    } catch (error) {
      setAllErrorsMsg({
        opacity: "opacity-100",
        msg: "Signup failed. Try again.",
        error: true,
      });
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
        return;
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
        return;
      }

       try {
      await handleLogIn(email, password);
      setIsSignedIn(true); 
      
      // if you use this
    } catch (error) {
      setAllErrorsMsg({
        opacity: "opacity-100",
        msg: "Login failed. Try again.",
        error: true,
      });
    }

   


    }
  }

  // New user signup logic
  const handleSignUp =  async (name, email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email
      })

      const firstName = name.split(" ")
        setUsername(firstName[0])
      setShowModal(false);
      console.log("Signup successful")
    } catch (error) {
      console.log("Signup failed",error)
    }
  }

  // Existing user login logic
  const handleLogIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      const docRef = doc(db,"users",user.uid);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        const userData = docSnap.data();
        const firstName = userData.name.split(" ")
        setUsername(firstName[0])
        setShowModal(false)
      }else{
        console.log("No such user exists")
      }
    } catch (error) {
      console.log("Login failed",error)
    }
  }

  return (
    <div className="fixed top-0 left-0 z-[99] flex h-screen w-screen items-center justify-center">
      {/* faint black background for modal */}
      <div
        onClick={() => setShowModal(false)}
        className="animate-opacity z-[98] fixed h-screen w-screen bg-black/50"
      ></div>

      {/* modal component */}
      <div className="pop-down z-[100] w-full max-w-md rounded-xl bg-[#282a2c] text-white shadow-lg">
        {/* logo and text with close icon */}
        <ModalHeader signUpForm={signUpForm} />
        {/* ModalBody form */}
        <ModalBodyForm
          signUpForm={signUpForm}
          name={name}
          setName={setName}
          nameError={nameError}
          validateName={validateName}
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          validateEmail={validateEmail}
          password={password}
          setPassword={setPassword}
          passwordError={passwordError}
          validatePassword={validatePassword}
          passwordStrengthMsg={passwordStrengthMsg}
          passwordStrength={passwordStrength}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          allErrorsMsg={allErrorsMsg}
          validateForm={validateForm}
        />
        
        <ModalFooter signUpForm={signUpForm} setSignUpForm={setSignUpForm} />
      </div>
    </div>
  );
};

export default Modal;
