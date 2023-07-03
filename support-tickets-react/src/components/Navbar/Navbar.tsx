import { NavLink } from "react-router-dom";
import logo_yellow from "../../assets/media/logo-yellow.png";
import "../../assets/style/Navbar/Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../context/UserContext/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const user = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom2 py-3 px-5">
      <NavLink className="navbar-brand" to="/">
        <img
          className="page-logo pr-4"
          src={logo_yellow}
          style={{ height: "50px" }}
        />
        Support Tickets Platform
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#topMenu"
        aria-controls="topMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse my-4 my-lg-1" id="topMenu">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item px-2">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item px-2">
            <NavLink className="nav-link" to="submit">
              Submit a ticket
            </NavLink>
          </li>
          <li className="nav-item px-2">
            <NavLink className="nav-link" to="about">
              About
            </NavLink>
          </li>
          {user.token ? (
            <li className="nav-item dropdown">
              <div
                className="nav-link px-2 dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle />
              </div>
              <div className="dropdown-menu dropdown-menu-profile">
                <NavLink className="dropdown-item" to="profile">
                  Profile
                </NavLink>
                <NavLink className="dropdown-item" to="user_tickets">
                  My tickets
                </NavLink>
                <NavLink className="dropdown-item" to="dashboard">
                  Dashboard
                </NavLink>
                <span className="dropdown-item">Logout</span>
              </div>
            </li>
          ) : (
            <li className="nav-item px-2">
              <NavLink className="nav-link" to="login">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
