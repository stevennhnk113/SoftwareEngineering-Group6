import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainNavbar } from "./Component/MainNavbar";
import App from '../App';
export class VacationRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment()
        };
        this.state = {
            endDate: moment()
        };
        this.handlestartChange = this.handlestartChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleendChange = this.handleendChange.bind(this);
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
       console.log("HandleSubmit");
        App.goToVacationRequest();
  }
    render() {
        return (
            <div className="datepick">
                <h3>Vacation Request</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Select Start Date: </label>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handlestartChange}
                            name="startDate"
                            dateFormat="MM/DD/YYYY"
                        />
                    </div>
                    <div className="form-group">
                        <label>Select End Date: </label>
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleendChange}
                            name="endDate"
                            dateFormat="MM/DD/YYYY"
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn-lg btn-dark btn-block">Request</button>
                    </div>
                </form>
            </div>
        );
    }
}

