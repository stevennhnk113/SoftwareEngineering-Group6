import React from "react";
// eslint-disable-next-line
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// eslint-disable-next-line
import { FacebookLoginButton } from "react-social-login-buttons";
import { MainNavbar } from "./Component/MainNavbar";
import UsercontrollerObj from "../Controller/UserController";

export class UserProfileView extends React.Component {
	_registerButtonPress;
	_loginButtonPress;

	constructor(props) {
		super();

		this.state = {
			Username : "",
			Firstname : "",
			Lastname : "",
			Position : ""
		}

		this._loginButtonPress = props.loginButtonPress;
		this._registerButtonPress = props.registerButtonPress;

		this.getUser = this.getUser.bind(this);

		this.getUser();
	}

	async getUser() {
		var user = await UsercontrollerObj.GetUser();

		this.setState({
			Username: user.userName,
			Firstname: user.firstName,
			Lastname: user.lastName,
			Position: user.position
		})

		console.log(this.state);
		console.log(user);
	}

	render() {
		return (
			<div>
				<MainNavbar></MainNavbar>
				<div className="wrapper">
					<div className="form-wrapper">
						<Form noValidate>
							<h2>User Profile</h2>

							<div className="card">

								<h1>{this.state.Firstname + " " + this.state.Lastname}</h1>
								<p className="title">{this.state.Position}</p>
								<p>@{this.state.Username}</p>

							</div>


						</Form>
					</div>
				</div>
			</div>
		);
	}
}