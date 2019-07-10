import React from "react";
// eslint-disable-next-line
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// eslint-disable-next-line
import { FacebookLoginButton } from "react-social-login-buttons";
import UsercontrollerObj from "../Controller/UserController";
import App from "../App";

export class RegisterView extends React.Component {
	_loginButtonPress;
	_registerButtonPress;

	constructor(props) {
		super();

		this.state = {
			firstName: null,
			lastName: null,
			userName: null,
			position: null,
			password: null
		}

		this._loginButtonPress = props.loginButtonPress;
		this._registerButtonPress = props._registerButtonPress;
	}

	async onRegisterPress() {
		var user = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			userName: this.state.userName,
			position: this.state.position,
			password: this.state.password,
			error: false
		}

		var result = await UsercontrollerObj.CreateUser(user);

		if (result != null) {
			App.changeToLoginView();
		} else {
			this.setState({ error: true })
		}
	}

	render() {
		return (
			<div className="wrapper">
				<div className="form-wrapper">

					<h1>
						<span className="font-weight-bold">HR Scheduling System </span>
					</h1>
					<Form noValidate>
						<h2 className="text-center">Register</h2>
						<div className="firstName">
							<label htmlFor="firstName">First Name</label>
							<input
								//className={formErrors.firstName.length > 0 ? "error" : null}
								placeholder="First Name"
								type="text"
								name="firstName"
								noValidate
								onChange={(e) => this.setState({ firstName: e.target.value })}
							/>
							{/* {this.state.firstName != null && this.state.firstName.length > 0 && (
                                <span className="errorMessage">Field cannot be empty</span>
                            )} */}
						</div>
						<div className="lastName">
							<label htmlFor="lastName">Last Name</label>
							<input
								//className={formErrors.lastName.length > 0 ? "error" : null}
								placeholder="Last Name"
								type="text"
								name="lastName"
								noValidate
								onChange={(e) => this.setState({ lastName: e.target.value })}
							/>
							{/* {this.state.lastName != null && this.state.lastName.length > 0 && (
                                <span className="errorMessage">Field cannot be empty</span>
                            )} */}
						</div>

						<div className="email">
							<label htmlFor="email">Username</label>
							<input
								//className={formErrors.email.length > 0 ? "error" : null}
								placeholder="Username"
								type="text"
								name="userName"
								noValidate
								onChange={(e) => this.setState({ userName: e.target.value })}
							/>
							{/* {this.state.userName != null && this.state.userName.length > 0 && (
                                <span className="errorMessage">Field cannot be empty</span>
                            )} */}
						</div>

						<div className="email">
							<label htmlFor="email">Position</label>
							<input
								//className={formErrors.email.length > 0 ? "error" : null}
								list="browsers"
								onChange={(e) => this.setState({ position: e.target.value })}
							/>
							<datalist id="browsers">
								<option value="Manager" />
								<option value="Sale Associate" />
							</datalist>
							{/* {this.state.position != null && this.state.position.length > 0 && (
                                <span className="errorMessage">Field cannot be empty</span>
                            )} */}
						</div>

						<div className="password">
							<label htmlFor="password">Password</label>
							<input
								//className={formErrors.password.length > 0 ? "error" : null}
								placeholder="Password"
								type="password"
								name="password"
								noValidate
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
							{/* {this.state.password != null && this.state.password.length > 0 && (
                                <span className="errorMessage">Field cannot be empty</span>
                            )} */}
						</div>

						{this.state.error && (
							<span className="errorMessage">There is an error</span>
						)}

						<Button onClick={() => this._loginButtonPress()} className="btn-lg btn-dark btn-block">Login</Button>
						<Button onClick={() => this.onRegisterPress()} className="btn-lg btn-dark btn-block">Register</Button>

						{/* <div className="social text-center">
                            Or continue with your social account
                        </div>

                        <div className="faceLogo">
                            <FacebookLoginButton className="mt-3 mb-3" />
                        </div>
                        <div className="social text-center">
                            <a href="/sign-up">Sign up</a>
                            <span className="p-2">|</span>
                            <a href="/forgot-password">Forgot Password</a>
                        </div> */}
					</Form>
				</div>
			</div>
		);
	}
}