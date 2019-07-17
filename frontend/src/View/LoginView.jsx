import React from "react";
// eslint-disable-next-line
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// eslint-disable-next-line
import { FacebookLoginButton } from "react-social-login-buttons";
import UsercontrollerObj from "../Controller/UserController";
import App from "../App";
export class LoginView extends React.Component {
    _registerButtonPress;
    
    async _loginButtonPress() {
        console.log("_loginButtonPress");
        if(this.state.Username === "" || this.state.Password === "") return false;
        var user = await UsercontrollerObj.UserLogin(this.state.Username, this.state.Password);
        console.log(user)
        if(user != null) {
            console.log("user not null")
            // localStorage.setItem("userName", this.state.Username)
            // localStorage.setItem("password", this.state.Password)
            App.changeToHomeView();
        }
    }
    constructor(props) {
        super();
        this.state = {
            Username: "",
            Password: ""
        }
        // Uncomment to show to professor
        this.state = {
            Username: "ZackStichall",
            Password: "ZackStichall123"
        }
        this.state = {
            Username: "ThorsteinWolvey",
            Password: "ThorsteinWolvey123"
        }
        // this.state = {
        //  Username: "CodiDe Mattia",
        //  Password: "CodiDe Mattia123"
        // }
        this._loginButtonPress = this._loginButtonPress.bind(this);
        this._registerButtonPress = props.registerButtonPress;
        this._loginButtonPress();
        
        // if(localStorage.getItem("userName") != "") {
        //  this.state = {
        //      // Username: localStorage.getItem("userName"),
        //      // Password: localStorage.getItem("password")
        //  }
        //  this._loginButtonPress();
        // }
    }
    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <Form noValidate>
                        <h1>
                            <span className="font-weight-bold">HR Scheduling System </span>
                        </h1>
                        <h2 className="text-center">Welcome</h2>
                        <div className="email">
                            <label htmlFor="email">Username</label>
                            <input
                                //className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Username"
                                type="email"
                                name="Username"
                                noValidate
                                onChange={(e) => this.setState({Username: e.currentTarget.value})}
                            />
                            {/* {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
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
                                onChange={(e) => this.setState({Password: e.currentTarget.value})}
                            />
                            {/* {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )} */}
                        </div>
                        <Button onClick={() => this._loginButtonPress()} className="btn-lg btn-dark btn-block">Login</Button>
                        <Button onClick={() => this._registerButtonPress()} className="btn-lg btn-dark btn-block">Register</Button>
                        {/* <div className="social text-center">
                            Or continue with your social account
                        </div>
                        <div className="faceLogo">
                            <FacebookLoginButton className="mt-3 mb-3" />
                        </div> */}
                        {/* <div className="social text-center">
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