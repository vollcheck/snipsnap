import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar is-white"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          {/* <img src="snap.png" width="128" height="128" /> */}
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
          <a className="navbar-item" href="/">
            Snaps
          </a>

          <a className="navbar-item" href="/">
            Users
          </a>

          <a className="navbar-item" href="/">
            Your profile
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-success is-light" href="/">
                <strong>New snap</strong>
              </a>
              <a className="button is-primary is-light" href="/">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light" href="/">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;