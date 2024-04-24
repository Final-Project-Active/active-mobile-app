import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  isProgressForm: false,
  setIsProgressForm: () => { }
});

export default AuthContext