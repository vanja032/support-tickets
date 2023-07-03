import { NavLink } from "react-router-dom";

const SignupForm = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-md-12 col-sm-12">
        <div className="card mt-5 border-custom1 rounded-lg">
          <div className="card-header bg-custom2" style={{ borderRadius: 0 }}>
            <h3 className="text-center color-custom1">Signup</h3>
          </div>
          <div className="card-body bg-custom5">
            <form id="signup">
              <div className="row">
                <div className="col-sm-12 col-md-6 form-group">
                  <label htmlFor="f_name" className="color-custom2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="f_name"
                    className="form-control input color-custom1"
                    placeholder="Enter your first name"
                    required
                    name="f_name"
                    autoComplete="off"
                  />
                </div>
                <div className="col-sm-12 col-md-6 form-group">
                  <label htmlFor="l_name" className="color-custom2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="l_name"
                    className="form-control input color-custom1"
                    placeholder="Enter your last name"
                    required
                    name="l_name"
                    autoComplete="off"
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
                  className="form-control input"
                  placeholder="Enter your email"
                  required
                  name="email"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username" className="color-custom2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control input color-custom1"
                  placeholder="Enter your username"
                  required
                  name="username"
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
              <div className="form-group">
                <label htmlFor="r_password" className="color-custom2">
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="r_password"
                  className="form-control input"
                  placeholder="Repeat your password"
                  required
                  name="r_password"
                  autoComplete="off"
                />
              </div>
              <p className="color-custom3" id="message"></p>
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-block login mt-2"
              >
                Signup
              </button>
            </form>
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
