import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  createContext,
  useState,
} from "react";
import "../../structures/User/User";
import axios from "axios";
import { Hash } from "../../utils/hash";

interface UserContextReturn {
  user: User;
  login: (username: string, passowrd: string) => Promise<boolean>;
  signup: () => Promise<boolean>;
}

// APIs urls
const defaultApiUrl = "";

const loginApi = `${defaultApiUrl}/login`;
const signupApi = `${defaultApiUrl}/signup`;

export const UserContext = createContext({} as UserContextReturn);

const UserProvider = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) => {
  const [user, setUser] = useState({} as User);

  const Login = async (username: string, passowrd: string) => {
    try {
      const result = await axios.post(loginApi, {
        username: username,
        password_hash: Hash.sha256(passowrd),
      });
      setUser({ email: result.data.email });
      return true;
    } catch (error) {
      setUser({} as User);
      return false;
    }
  };

  const Signup = async () => {
    try {
      await axios.post(signupApi, {});
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ user: user, login: Login, signup: Signup }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
