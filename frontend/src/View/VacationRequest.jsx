import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainNavbar } from "./Component/MainNavbar";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import App from '../App';
import VacationControllerObj from '../Controller/VacationController';
import ScheduleControllerObj from '../Controller/ScheduleController';
import UsercontrollerObj from '../Controller/UserController';
import { HomeView } from './HomeView';
export class VacationRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: null,
            end: null
        };
        this.handlestartChange = this.handlestartChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleendChange = this.handleendChange.bind(this);
        this.onCancel = this.onCancel.bind(this)
        this.onRequest = this.onRequest.bind(this)
        console.log("vacation is created");
    }
    handlestartChange(date) {
        this.setState({
            startDate: date
        })
    }
    handleendChange(date) {
        this.setState({
            endtDate: date
        })
    }
    handleSubmit(e) {
        App.goToVacationRequest();
    }
    onCancel(e) {
        App.turnOffVacationRequest()
    }
    async onRequest() {
        var vacation = {
            "startTime": (new Date(this.state.start)).getTime(),
            "endTime": (new Date(this.state.end)).getTime(),
            "scheduleType": "Vacation Request",
            "scheduleBy": UsercontrollerObj._User.id,
            "scheduleFor": UsercontrollerObj._User.id,
            "scheduleDetail": ""
        }
        await ScheduleControllerObj.CreateSchedule(vacation)
        App.turnOffVacationRequest();
        HomeView.refreshScheduleStatic();
    }
    render() {
        return (
            <div style={datePickContainer} className="datepick">
                <h3>Vacation Request</h3>
                <div style={inputForm}>
                    <div className="form-group">
                        <label>Select Start Date: </label>
                        <Input
                            type="date"
                            onChange={(e) => this.setState({ start: e.currentTarget.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Select End Date: </label>
                        <Input
                            type="date"
                            onChange={(e) => this.setState({ end: e.currentTarget.value })}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn-lg btn-dark btn-block" onClick={this.onRequest}>Request</button>
                        <button className="btn-lg btn-dark btn-block" onClick={this.onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}
var CancelButton = {
    position: "fixed",
    left: "0px",
    top: "0px"
}
var datePickContainer = {
    position: "fixed",
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(255, 255, 255, 0.8)",
    zIndex: 1,
    left: "0px",
    top: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
}
var inputForm = {
    display: "flex",
    flexDirection: "column"
}