import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as authService from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //call the server...
    try {
      const { data } = this.state;
      const { data: accessToken } = await authService.login(
        data.email,
        data.password
      );
      // console.log(accessToken);
      localStorage.setItem("token", accessToken.token);
      localStorage.setItem("userId", accessToken.id);
      // this.props.history.push("/");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        {
          const errors = { ...this.state.errors };
          errors.email = ex.response.data.message;
          this.setState({ errors });
        }
      }
    }
  };

  render() {
    return (
      <div>
        <h1 className="col-sm-6 offset-sm-3">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
