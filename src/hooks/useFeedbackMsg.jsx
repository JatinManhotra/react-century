import React, { useContext } from 'react';
import { CenturyContext } from '../context/CenturyContext';

const useFeedbackMsg = () => {
  const { setGlobalFeedback } = useContext(CenturyContext);

  const handleFeedback = (msg, error) => {
    setGlobalFeedback({ msg: msg, error: error });

    setTimeout(() => {
      setGlobalFeedback((prev) => ({ ...prev, msg:"", error: false })); // Clear message as well
    }, 3000);
  };

  return { handleFeedback }; // Return the function to be used
};

export default useFeedbackMsg;