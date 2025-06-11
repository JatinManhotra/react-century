import { useContext } from "react";
import { CenturyContext } from "../context/CenturyContext";

const useFeedbackMsg = () => {
  const { setGlobalFeedback } = useContext(CenturyContext);

  const handleFeedback = (msg, errorIcon) => {
    setGlobalFeedback({ msg: msg, visible: true, errorIcon: errorIcon });

    setTimeout(() => {
      setGlobalFeedback((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return { handleFeedback };
};

export default useFeedbackMsg;
