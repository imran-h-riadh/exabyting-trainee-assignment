import { useState } from "react";

import { LoadingContext } from "../context";

// eslint-disable-next-line react/prop-types
const LoadingProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    return(
        <LoadingContext.Provider value={{isLoading, setIsLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingProvider;