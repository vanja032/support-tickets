import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  createContext,
  //   useState,
} from "react";
import "../../structures/User/User";
// import axios from "axios";

export const UserContext = createContext({} as User);
// const defaultApiUrl = "";

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
  //   const loginApi = `${defaultApiUrl}/login`;
  //   const signupApi = `${defaultApiUrl}/signup`;

  //   const [user, setUser] = useState({} as User);

  //   const Login = async () => {
  //     try {
  //       const result = await axios.post(loginApi, {});
  //       setUser({ email: result.data.email });
  //     } catch (error) {
  //       setUser({} as User);
  //     }
  //   };

  return (
    <UserContext.Provider value={{} as User}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
