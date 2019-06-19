import React from "react";
// eslint-disable-next-line
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
// eslint-disable-next-line
import { FacebookLoginButton } from "react-social-login-buttons";

export class LoginView extends React.Component {
    _registerButtonPress;
    _loginButtonPress;

    constructor(props) {
        super();

        this._loginButtonPress = props.loginButtonPress;
        this._registerButtonPress = props.registerButtonPress;
    }

    render() {
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <Form noValidate>
                        <h1>
                            <span clasName="font-weight-bold">HR Scheduling System </span>
                        </h1>

                        <h2 className="text-center">User Profile</h2>


                    </Form>
                </div>
            </div>
        );
    }
}