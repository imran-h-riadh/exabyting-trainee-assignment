import { createContext } from "react";

const AuthContext = createContext();
const LoadingContext = createContext();
const ErrorPageContext = createContext();

export { AuthContext, LoadingContext, ErrorPageContext };
