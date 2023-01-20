import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils";

const Navbar = () => {
  const isA = isAuthenticated();
  console.log(isA);

  return (
    <nav
      className="navbar is-white"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Snipsnap
        </Link>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Snaps
          </Link>

          <Link className="navbar-item" to="/users">
            Users
          </Link>

          {isA ? (
            <Link className="navbar-item" to="/me">
              Your profile
            </Link>
          ) : (
            <></>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {isA ? (
                <>
                  <Link className="button is-success is-light" to="/sign-up">
                    <strong>New snap</strong>
                  </Link>
                  <Link className="button is-light" to="/logout">
                    Log out
                  </Link>
                </>
              ) : (
                <>
                  <Link className="button is-primary is-light" to="/sign-up">
                    <strong>Sign up</strong>
                  </Link>
                  <Link className="button is-light" to="/login">
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
