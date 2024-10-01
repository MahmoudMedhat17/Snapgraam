import { IcontextType } from "@/types";
import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react";
import { getCurrentUser } from "@/lib/appwrite/api";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  userName: "",
  name: "",
  email: "",
  imageUrl: "",
  bio: "",
};

export const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkUserAuth: async () => false as boolean,
};

const AuthContext = createContext<IcontextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkUserAuth = async () => {
    setIsLoading(true);

    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          userName: currentAccount.userName,
          name: currentAccount.name,
          email: currentAccount.email,
          bio: currentAccount.bio,
          imageUrl: currentAccount.imageUrl,
        });
        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  //With every page refresh and no data stored in localstorage, this useEffect calls the checkUserAuth function and navigate to Sigin page
  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallBack");

    if (
      cookieFallback === null ||
      cookieFallback === "[]" ||
      cookieFallback === undefined
    ) {
      navigate("/signin");
    }

    checkUserAuth();
  }, []);

  const values = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkUserAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUserContext = () => useContext(AuthContext);

export default AuthProvider;
