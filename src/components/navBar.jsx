import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = (props) => {
  // console.log(user);
  const { user } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          E-Library
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" aria-current="page" to="/books">
              Books
            </NavLink>
            {user.isAdmin === 1 && (
              <NavLink className="nav-link" to="/readers">
                Readers
              </NavLink>
            )}
            {/* <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink> */}
            {user.isAdmin === 1 && (
              <NavLink className="nav-link" to="/books/new">
                Add Book
              </NavLink>
            )}
            {user === "" && (
              <React.Fragment>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user.name && (
              <React.Fragment>
                <NavLink className="nav-link" to="/profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
