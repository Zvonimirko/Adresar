import React, { Component } from "react";
import Button from "../../components/button/Button";

import Input from "../../components/input/Input";

import "./login.scss";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  }

  validate = () => {
    const regexPassword = /(?=.*?[0-9])(?=.*?[#!$+-]).{6,}/g;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let emailError = "";
    let passwordError = "";

    if (!this.state.email.match(regexEmail)) {
      emailError = "Neispravan email!";
    }

    if (!this.state.password.match(regexPassword)) {
      passwordError =
        "Lozinka mora sadržavati barem 6 znakova od toga 1 broj i jedan od znakova (!,+,-,$,#)";
    }
    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const isValid = this.validate();
    const { history } = this.props;

    if (isValid) {
      history.push("/kontakt");
    }
    this.setState({ email: "", password: "" });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-container">
        <div className="login">
          <h2>Login</h2>
          <form className="login__form" onSubmit={this.handleSubmit}>
            <Input
              name="email"
              value={email}
              onChange={this.handleChange}
              maxLength="100"
              label="email"
            />
            <Input
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
              maxLength="100"
              label="password"
            />
            <div className="login__error">
              <p>{this.state.emailError}</p>
              <p>{this.state.passwordError}</p>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
