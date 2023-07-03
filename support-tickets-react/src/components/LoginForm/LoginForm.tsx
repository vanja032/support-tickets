import { NavLink } from "react-router-dom";
import logo from "../../assets/media/logo-white.png";
import LoginValidation from "../../functions/login";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext/UserContext";

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const [loginAction, setLoginAction] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [passowrd, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

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
                />
              </div>
              <p id="message" className="color-custom3"></p>
              <br />
              <button
                className="btn btn-primary btn-block login mt-2"
                onClick={async () => {
                  const result = await LoginValidation(
                    username,
                    passowrd,
                    setValidUsername,
                    setValidPassword
                  );
                  if (result) {
                    await login(username, passowrd);
                  }
                  setLoginAction(true);
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
