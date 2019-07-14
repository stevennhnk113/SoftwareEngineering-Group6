import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainNavbar } from "./Component/MainNavbar";


class VacationRequest extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }
  handleChange(date) {
    this.setState({
      endtDate: date
    })
  }
  handleSubmit(endDate) {
    e.preventDefault();
    let main = this.state.startDate
    console.log(main.format('L'));
  }

  render() {
    return (
      <div className = "container">
        <h3>Vacation Request</h3>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <label>Select Start Date: </label>
            <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              name="startDate"
              dateFormat="MM/DD/YYYY"
            />
          </div>
          <div className="form-group">
            <label>Select End Date: </label>
            <DatePicker
              selected={ this.state.endDate }
              onChange={ this.handleChange }
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