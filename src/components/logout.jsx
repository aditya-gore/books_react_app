import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
