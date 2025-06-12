import { useContext } from "react";
import { CenturyContext } from "../../context/CenturyContext";
import logo from "../../assets/logo.png";
import { BiSolidXCircle } from "react-icons/bi";

const ModalHeader = ({ signUpForm }) => {
  const { setShowModal } = useContext(CenturyContext);

  return (
    <div className="relative mb-6 flex items-center justify-start sm:justify-center gap-2 sm:gap-5 rounded-t-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 px-2 py-3 text-lg sm:text-xl xl:text-2xl font-bold text-white">
      <img src={logo} alt="Century logo" className="w-15 sm:w-20" />
      <h2>{signUpForm ? "Sign Up" : "Log In"} To Century</h2>
      <BiSolidXCircle
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-xl cursor-pointer"
      />
    </div>
  );
};

export default ModalHeader;
