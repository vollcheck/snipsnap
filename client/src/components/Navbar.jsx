import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils";
import { useState } from "react";

const Navbar = () => {
  const isA = isAuthenticated();
  const [activeBurger, setActiveBurger] = useState(false);

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
          className={activeBurger ? "navbar-burger is-active" : "navbar-burger"}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setActiveBurger(!activeBurger)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={activeBurger ? "navbar-menu is-active" : "navbar-menu"}
      >
        <div className="navbar-start">
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
                  <Link
                    className="button is-success is-light"
                    to="/create-snap"
                  >
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
