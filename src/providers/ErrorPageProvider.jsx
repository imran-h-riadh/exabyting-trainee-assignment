/* eslint-disable no-unused-vars */
import { useState } from "react";

import { ErrorPageContext } from "../context";

// eslint-disable-next-line react/prop-types
const ErrorPageProvider = ({ children }) => {
  const [isError, setIsError] = useState(false);
  return (
    // eslint-disable-next-line no-undef
    <ErrorPageContext.Provider value={{ isError, setIsError }}>
      {children}
    </ErrorPageContext.Provider>
  );
};

export default ErrorPageProvider;
