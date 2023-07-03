import { NavLink } from "react-router-dom";
import logo from "../../assets/media/logo-white.png";

const LoginForm = () => {
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
            <form id="login">
              <div className="form-group">
                <label htmlFor="username" className="color-custom2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control input"
                  placeholder="Enter your username or email"
                  required
                  name="username_email"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="color-custom2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control input"
                  placeholder="Enter your password"
                  required
                  name="password"
                  autoComplete="off"
                />
              </div>
              <p id="message" className="color-custom3"></p>
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-block login mt-2"
              >
                Login
              </button>
            </form>
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
