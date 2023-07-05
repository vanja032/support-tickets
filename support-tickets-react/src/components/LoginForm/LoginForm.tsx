import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/media/logo-white.png";
import LoginValidation from "../../functions/login";
import { useContext, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { UserContext } from "../../context/UserContext/UserContext";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useContext(UserContext);
  const [loginAction, setLoginAction] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [passowrd, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [validMessage, setValidMessage] = useState(false);

  const [loading, setLoading] = useState(false);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6 col-sm-8 py-4 my-4">
        <div className="col-10 mx-auto d-flex justify-content-center">
          <img
            className="card-img-top login-logo"
            src={logo}
            alt="Support Tickets Platform logo"
          />
        </div>
        <div className="card mt-5 border-custom1 login-card rounded-lg">
          <div className="card-header bg-custom2" style={{ borderRadius: 0 }}>
            <h3 className="text-center color-custom1">Login</h3>
          </div>
          <div className="card-body bg-custom5">
            <div id="login">
              <div className="form-group">
                <label htmlFor="username" className="color-custom2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className={
                    "form-control input color-custom1" +
                    (loginAction
                      ? validUsername
                        ? " valid-color valid-border"
                        : " invalid-color invalid-border"
                      : "")
                  }
                  placeholder="Enter your username or email"
                  required
                  name="username_email"
                  autoComplete="off"
                  onChange={(event) => {
                    setUsername(event.currentTarget.value);
                  }}
                  value={username}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="color-custom2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={
                    "form-control input color-custom1" +
                    (loginAction
                      ? validPassword
                        ? " valid-color valid-border"
                        : " invalid-color invalid-border"
                      : "")
                  }
                  placeholder="Enter your password"
                  required
                  name="password"
                  autoComplete="off"
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                  value={passowrd}
                />
              </div>
              {loading ? (
                <div className="col-12 color-custom2 d-flex justify-content-center my-2">
                  <BiLoaderAlt className="form-loader" />
                </div>
              ) : (
                <p
                  className={
                    "color-custom3" +
                    (loginAction
                      ? validMessage
                        ? " valid-color"
                        : " invalid-color"
                      : "")
                  }
                  id="message"
                >
                  {message}
                </p>
              )}
              <br />
              <button
                className="btn btn-primary btn-block login mt-2"
                onClick={async () => {
                  setLoading(true);
                  let result = await LoginValidation(
                    username,
                    passowrd,
                    setValidUsername,
                    setValidPassword
                  );
                  if (result) {
                    result = await login(username, passowrd);
                    if (result) {
                      setValidMessage(true);
                      setMessage("Successfully logged into user account");

                      // Resets form fields
                      setUsername("");
                      setPassword("");

                      setTimeout(() => {
                        navigate("/", { replace: true });
                      }, 1500);
                    } else {
                      setValidMessage(false);
                      setMessage("Error during user login");
                    }
                  } else {
                    setValidMessage(false);
                    setMessage("Some data fields are not valid");
                  }
                  setLoginAction(true);
                  setLoading(false);
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <p className="mt-3 color-custom1 px-4">
          You do not have an account?{" "}
          <NavLink className="link-custom1" to="/signup">
            <strong>Signup</strong>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
