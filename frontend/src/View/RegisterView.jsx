import React from "react";
// eslint-disable-next-line
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// eslint-disable-next-line
import { FacebookLoginButton } from "react-social-login-buttons";

export class RegisterView extends React.Component {
    _loginButtonPress;
    _registerButtonPress;

    constructor(props) {
        super();

        this._loginButtonPress = props.loginButtonPress;
        this._registerButtonPress = props._registerButtonPress;
    }

    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper">

                    <h1>
                        <span clasName="font-weight-bold">HR Scheduling System </span>
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
                                onChange={this.handleChange}
                            />
                            {/* {formErrors.firstName.length > 0 && (
                                <span className="errorMessage">{formErrors.firstName}</span>
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
                                onChange={this.handleChange}
                            />
                            {/* {formErrors.lastName.length > 0 && (
                                <span className="errorMessage">{formErrors.lastName}</span>
                            )} */}
                        </div>

                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                //className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
                            />
                            {/* {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )} */}
                        </div>

                        <Button onClick={() => this._loginButtonPress()} className="btn-lg btn-dark btn-block">Login</Button>
                        <Button onClick={() => this._registerButtonPress()} className="btn-lg btn-dark btn-block">Register</Button>

                        <div className="social">
                            Or continue with your social account
                        </div>

                        <div className="faceLogo">
                            <FacebookLoginButton className="mt-3 mb-3" />
                        </div>
                        <div className="social">
                            <a href="/sign-up">Sign up</a>
                            <span className="p-2">|</span>
                            <a href="/forgot-password">Forgot Password</a>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}