import React from "react";
// eslint-disable-next-line
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// eslint-disable-next-line
import { FacebookLoginButton } from "react-social-login-buttons";
import UsercontrollerObj from "../Controller/UserController";
import { MainNavbar } from "./Component/MainNavbar";

export class HomeView extends React.Component {
	_registerButtonPress;
	
	_loginButtonPress() {
		console.log("hello");

		if(this.state.Username === "" || this.state.Password === "") return false;

		UsercontrollerObj.UserLogin(this.state.Username, this.state.Password);
	}

    constructor(props) {
        super();

		this.state = {
			Username: "",
			Password: ""
		}

        this._loginButtonPress = this._loginButtonPress.bind(this);
        this._registerButtonPress = props.registerButtonPress;
    }

    render() {
        return (
			<div>
				<MainNavbar></MainNavbar>
			</div>
        );
    }
}