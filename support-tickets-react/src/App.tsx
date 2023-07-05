// Imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Style
import "./assets/style/App.css";

// Pages
import Home from "./pages/Home/Home";
import SubmitTicket from "./pages/SubmitTicket/SubmitTicket";
import About from "./pages/About/About";
import RootLayout from "./layouts/RootLayout/RootLayout";
import Tickets from "./pages/Tickets/Tickets";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { UserContext } from "./context/UserContext/UserContext";

// Colors overwrite
import "./assets/style/colors.css";
import { useContext, useEffect } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="submit" element={<SubmitTicket />} />
      <Route path="about" element={<About />} />
      <Route path="tickets" element={<Tickets />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

function App() {
  const { user, get_user } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        await get_user();
      } catch (error) {}
    };

    if (localStorage.getItem("token") && !user.username) {
      getUser();
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
