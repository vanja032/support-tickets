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
  signup: (
    f_name: string,
    l_name: string,
    email: string,
    username: string,
    passowrd: string
  ) => Promise<boolean>;
}

// APIs urls
const defaultApiUrl =
  "https://2qjkwakdbj.execute-api.us-east-1.amazonaws.com/dev";

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
        username: username.trim(),
        password_hash: Hash.sha256(passowrd.trim()),
      });
      setUser({ email: result.data.email });
      return true;
    } catch (error) {
      setUser({} as User);
      return false;
    }
  };

  const Signup = async (
    f_name: string,
    l_name: string,
    email: string,
    username: string,
    passowrd: string
  ) => {
    try {
      const data = {
        f_name: f_name.trim(),
        l_name: l_name.trim(),
        email: email.trim(),
        username: username.trim(),
        password_hash: await Hash.algoHash(passowrd.trim()),
      };

      const result = await axios.post(signupApi, data);
      console.log(result);
      if (result.data.body.status) {
        return true;
      } else {
        return false;
      }
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
