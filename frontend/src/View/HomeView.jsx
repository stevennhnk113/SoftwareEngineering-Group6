import React from "react";
import UsercontrollerObj from "../Controller/UserController";
import { MainNavbar } from "./Component/MainNavbar";

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Calendar, momentLocalizer, Navigate, Views } from 'react-big-calendar';

import moment from 'moment'

import './Style/HomeView.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import ScheduleControllerObj from "../Controller/ScheduleController";

const localizer = momentLocalizer(moment)
const DragAndDropCalendar = withDragAndDrop(Calendar)

export class HomeView extends React.Component {
	_registerButtonPress;

	_loginButtonPress() {
		console.log("hello");

		if (this.state.Username === "" || this.state.Password === "") return false;

		UsercontrollerObj.UserLogin(this.state.Username, this.state.Password);
	}

	constructor(props) {
		super();

		this.state = {
			Schedules: []
		}

		this.moveEvent = this.moveEvent.bind(this)
	}

	async componentWillMount() {
		var scheudules = await ScheduleControllerObj.GetUserSchedule();

		this.setState({ Scheudules: scheudules });
	}

	moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
		const { Schedules } = this.state

		const idx = Schedules.indexOf(event)
		let allDay = event.allDay

		if (!event.allDay && droppedOnAllDaySlot) {
			allDay = true
		} else if (event.allDay && !droppedOnAllDaySlot) {
			allDay = false
		}

		const updatedEvent = { ...event, start, end, allDay }

		const nextEvents = [...Schedules]
		nextEvents.splice(idx, 1, updatedEvent)

		this.setState({
			Schedules: nextEvents,
		})

		//alert(`${event.title} was dropped onto ${updatedEvent.start}`)
	}

	resizeEvent = ({ event, start, end }) => {
		const { Schedules } = this.state

		const idx = Schedules.indexOf(event)
		
		Schedules[idx].start = start;
		Schedules[idx].end = end;

		this.setState({
			Schedules: Schedules,
		})

		ScheduleControllerObj.UpdateSchedule(Schedules[idx]);
	}

	handleSelect = ({ start, end }) => {
		var title = "Available Time";

		var newSchedule = {
			start,
			end,
			title,
		};

		this.setState({
			Schedules: [
				...this.state.Schedules,
				newSchedule,
			],
		})

		ScheduleControllerObj.CreateSchedule(newSchedule);
	}

	render() {
		return (
			<div>
				<MainNavbar></MainNavbar>
				<DragAndDropCalendar
					localizer={localizer}
					events={this.state.Schedules}

					defaultView={Views.WEEK}
					views={{ month: true, week: true }}

					selectable
					onSelectEvent={event => alert(event.title)}
					onSelectSlot={this.handleSelect}

					resizable
					onEventResize={this.resizeEvent}

					onDragStart={console.log}
					onEventDrop={this.moveEvent}
				/>
			</div>
		);
	}
}