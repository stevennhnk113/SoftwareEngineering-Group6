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
            <Form className="register-form text-center">
                <h1>
                    <span clasName="font-weight-bold">HR Scheduling System </span>
                </h1>

                <h2 className="text-center">Register</h2>

                <FormGroup >
                    <Label> Full Name </Label>
                    <Input type="text" placeholder="Full name" />
                </FormGroup>

                <FormGroup>
                    <Label> Email </Label>
                    <Input type="email" placeholder="Email" />
                </FormGroup>

                <FormGroup>
                    <Label> Password </Label>
                    <Input type="password" placeholder="Password" />
                </FormGroup>

                <Button onClick={() => this._loginButtonPress()} className="btn-lg btn-dark btn-block">Login</Button>
                <Button onClick={() => this._registerButtonPress()} className="btn-lg btn-dark btn-block">Register</Button>

                <div className="text-center pt-3">
                    Or continue with your social account
            </div>

                <FacebookLoginButton className="mt-3 mb-3" />

                <div className="text-center">
                    <a href="/sign-up">Sign up</a>
                    <span className="p-2">|</span>
                    <a href="/forgot-password">Forgot Password</a>
                </div>
            </Form>
        );
    }
}