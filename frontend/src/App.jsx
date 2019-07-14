import React from "react";
import "./App.css";

import { LoginView } from "./View/LoginView";
import { RegisterView } from "./View/RegisterView";
import { HomeView } from "./View/HomeView";
import { UserProfileView } from "./View/UserProfileView";
import { VacationRequest} from "./View/VacationRequest";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentView: "Login"
		}

		this.changeToRegisterView = this.changeToRegisterView.bind(this);
		this.changeToLoginView = this.changeToLoginView.bind(this);

		App.changeToHomeView = App.changeToHomeView.bind(this);
		App.changeToProfileView = App.changeToProfileView.bind(this);
		App.changeToLoginView = App.changeToLoginView.bind(this);

	}

	changeToRegisterView() {
		this.setState({ currentView: "Register" });
	}

	static changeToHomeView() {
		this.setState({ currentView: "Home" });
	}

	static changeToProfileView() {
		this.setState({ currentView: "UserProfile" });
	}

	static changeToLoginView() {
		this.setState({ currentView: "Login" });
	}

	changeToLoginView() {
		this.setState({ currentView: "Login" });
	}
	goToVacationRequest() {
		this.setState({ currentView: "VacationRequest" });
	}

	render() {
		var renderComponent = null;
		switch (this.state.currentView) {
			case "UserProfile":
				renderComponent = (<UserProfileView></UserProfileView>)
				break;
			case "Home":
				renderComponent = (<HomeView></HomeView>)
				break;
			case "Login":
				renderComponent = (
					<LoginView
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
			case "VacationRequest":
			    renderComponent = (
				<VacationRequest
					handleChange={this.goToVacationRequest}>
				</VacationRequest>);
			break;
			default:
				renderComponent = (<LoginView></LoginView>);
				break;
		}

		return renderComponent;
	}
}

export default App;
