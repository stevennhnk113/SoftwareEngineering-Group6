import React from "react";
import "./App.css";

import { LoginView } from "./View/LoginView";
import { RegisterView } from "./View/RegisterView";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: "Login"
    }

    this.changeToRegisterView = this.changeToRegisterView.bind(this);
    this.changeToLoginView = this.changeToLoginView.bind(this);
  }

  changeToRegisterView() {
    this.setState({ currentView: "Register" });
  }

  changeToLoginView() {
    this.setState({ currentView: "Login" });
  }

  render() {
    var renderComponent = null;
    switch (this.state.currentView) {
      case "Login":
        renderComponent = (
          <LoginView
            loginButtonPress={this.changeToLoginView}
            registerButtonPress={this.changeToRegisterView}>
          </LoginView>);

        break;
      case "Register":
        renderComponent = (
          <RegisterView
            loginButtonPress={this.changeToLoginView}
            registerButtonPress={this.changeToRegisterView}>
          </RegisterView>);
        break;
      default:
        renderComponent = (<LoginView></LoginView>);
        break;
    }

    return renderComponent;
  }
}

export default App;
