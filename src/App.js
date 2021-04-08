import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUserById } from "./services/userService";
import Books from "./components/books";
import Readers from "./components/readers";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import BookForm from "./components/bookForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    data: "",
  };

  async componentDidMount() {
    // const token = localStorage.getItem("token");
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await getUserById(userId);
      this.setState({ data });
      console.log(this.state.data);
    } catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.data} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/books/:id" component={BookForm}></Route>
            <Route
              path="/books"
              render={(props) => <Books {...props} user={this.state.data} />}
            ></Route>
            <Route path="/readers" component={Readers}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/books" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
