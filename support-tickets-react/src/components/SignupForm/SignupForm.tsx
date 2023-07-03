import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserContext";
import SignupValidation from "../../functions/signup";

const SignupForm = () => {
  const { signup } = useContext(UserContext);
  const [signupAction, setSignupAction] = useState(false);

  const [fName, setFName] = useState("");
  const [validFName, setValidFName] = useState(false);

  const [lName, setLName] = useState("");
  const [validLName, setValidLName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [rPassword, setRPassword] = useState("");
  const [validRPassword, setValidRPassword] = useState(false);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-md-12 col-sm-12">
        <div className="card mt-5 border-custom1 rounded-lg">
          <div className="card-header bg-custom2" style={{ borderRadius: 0 }}>
            <h3 className="text-center color-custom1">Signup</h3>
          </div>
          <div className="card-body bg-custom5">
            <div id="signup">
              <div className="row">
                <div className="col-sm-12 col-md-6 form-group">
                  <label htmlFor="f_name" className="color-custom2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="f_name"
                    className={
                      "form-control input color-custom1" +
                      (signupAction
                        ? validFName
                          ? " valid-color valid-border"
                          : " invalid-color invalid-border"
                        : "")
                    }
                    placeholder="Enter your first name"
                    required
                    name="f_name"
                    autoComplete="off"
                    onChange={(event) => {
                      setFName(event.currentTarget.value);
                    }}
                  />
                </div>
                <div className="col-sm-12 col-md-6 form-group">
                  <label htmlFor="l_name" className="color-custom2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="l_name"
                    className={
                      "form-control input color-custom1" +
                      (signupAction
                        ? validLName
                          ? " valid-color valid-border"
                          : " invalid-color invalid-border"
                        : "")
                    }
                    placeholder="Enter your last name"
                    required
                    name="l_name"
                    autoComplete="off"
                    onChange={(event) => {
                      setLName(event.currentTarget.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="color-custom2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={
                    "form-control input color-custom1" +
                    (signupAction
                      ? validEmail
                        ? " valid-color valid-border"
                        : " invalid-color invalid-border"
                      : "")
                  }
                  placeholder="Enter your email"
                  required
                  name="email"
                  autoComplete="off"
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username" className="color-custom2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className={
                    "form-control input color-custom1" +
                    (signupAction
                      ? validUsername
                        ? " valid-color valid-border"
                        : " invalid-color invalid-border"
                      : "")
                  }
                  placeholder="Enter your username"
                  required
                  name="username"
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
                    (signupAction
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
              <div className="form-group">
                <label htmlFor="r_password" className="color-custom2">
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="r_password"
                  className={
                    "form-control input color-custom1" +
                    (signupAction
                      ? validRPassword
                        ? " valid-color valid-border"
                        : " invalid-color invalid-border"
                      : "")
                  }
                  placeholder="Repeat your password"
                  required
                  name="r_password"
                  autoComplete="off"
                  onChange={(event) => {
                    setRPassword(event.currentTarget.value);
                  }}
                />
              </div>
              <p className="color-custom3" id="message"></p>
              <br />
              <button
                className="btn btn-primary btn-block login mt-2"
                onClick={async () => {
                  const result = await SignupValidation(
                    fName,
                    lName,
                    email,
                    username,
                    password,
                    rPassword,
                    setValidFName,
                    setValidLName,
                    setValidEmail,
                    setValidUsername,
                    setValidPassword,
                    setValidRPassword
                  );
                  if (result) {
                    await signup();
                  }
                  setSignupAction(true);
                }}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
        <p className="mt-3 color-custom1 px-4">
          You already have an account?{" "}
          <NavLink className="link-custom1" to="/login">
            <strong>Login</strong>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
