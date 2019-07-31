import React, { CSSProperties } from "react";
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
			Username: "",
			Firstname: "",
			Lastname: "",
			Position: ""
		}

		this._loginButtonPress = props.loginButtonPress;
		this._registerButtonPress = props.registerButtonPress;

		this.getUser = this.getUser.bind(this);
		this.onSave = this.onSave.bind(this);

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

	onSave() {

	}

	render() {
		return (
			<div style={Styles.container}>
				<MainNavbar hasRequestTimeOff={false} hasGoBack={true} ></MainNavbar>
				<div style={Styles.wrapper}>
					<div style={{height: "100%"}} className="wrapper">
						<div className="form-wrapper">
							<Form noValidate>
								<h2 className="text-center">User Profile</h2>
								<div className="firstName">
									<label htmlFor="firstName">First Name</label>
									<input
										placeholder="First Name"
										type="text"
										name="firstName"
										value={this.state.Firstname}
										noValidate
										onChange={(e) => this.setState({ firstName: e.target.value })}
									/>
								</div>
								<div className="lastName">
									<label htmlFor="lastName">Last Name</label>
									<input
										//className={formErrors.lastName.length > 0 ? "error" : null}
										placeholder="Last Name"
										type="text"
										name="lastName"
										noValidate
										value={this.state.Lastname}
										onChange={(e) => this.setState({ lastName: e.target.value })}
									/>
								</div>

								<div className="email">
									<label htmlFor="email">Username</label>
									<input
										//className={formErrors.email.length > 0 ? "error" : null}
										placeholder="Username"
										type="text"
										name="userName"
										noValidate
										value={this.state.Username}
										onChange={(e) => this.setState({ userName: e.target.value })}
									/>
								</div>

								<div className="email">
									<label htmlFor="email">Position</label>
									<input
										//className={formErrors.email.length > 0 ? "error" : null}
										list="browsers"
										disabled
										value={this.state.Position}
									/>
									<datalist id="browsers">
										<option value="Manager" />
										<option value="Sale Associate" />
									</datalist>
								</div>
								<Button onClick={this.onSave} className="btn-lg btn-dark btn-block">Save</Button>
							</Form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const Styles = {
	wrapper: {
		flexGrow: 1
	},
	container: {
		display: "flex",
		height: "100%",
		width: "100%",
		flexDirection: "column"
	}
}