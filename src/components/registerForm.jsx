import React from "react";
import Form from "./common/form";
import Joi, { errors } from "joi-browser";
import * as userService from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "", confirmPassword: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } }),
  };

  doSubmit = async () => {
    try {
      const { data: accessToken } = await userService.register(this.state.data);
      // console.log(accessToken);
      localStorage.setItem("token", accessToken.token);
      localStorage.setItem("userId", accessToken.id);
      window.location = "/";
      // this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1 className="col-sm-6 offset-sm-3">Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("confirmPassword", "Confirm Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
