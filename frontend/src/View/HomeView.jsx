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
	constructor(props) {
		super();

		this.state = {
			Schedules: [],
			userID: null
		}

		this.moveEvent = this.moveEvent.bind(this)
		HomeView.SetUserToDisplayCalendar = HomeView.SetUserToDisplayCalendar.bind(this)
	}

	async componentDidMount() {
		await this.refreshSchedule()
	}

	async moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
		const { Schedules } = this.state

		const idx = Schedules.indexOf(event)
		let allDay = event.allDay

		if (!event.allDay && droppedOnAllDaySlot) {
			allDay = true
		} else if (event.allDay && !droppedOnAllDaySlot) {
			allDay = false
		}

		console.log(Schedules)

		const updatedEvent = { ...event, start, end, allDay }

		console.log(updatedEvent)

		const nextEvents = [...Schedules]
		nextEvents.splice(idx, 1, updatedEvent)

		this.setState({
			Schedules: nextEvents,
		})

		var toSaveSchedule = this.convertScheduleData(updatedEvent);
		await ScheduleControllerObj.UpdateSchedule(toSaveSchedule);

		this.refreshSchedule()
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

	handleSelect = async ({ start, end }) => {
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

		var toSaveSchedule = this.convertScheduleData(newSchedule);

		await ScheduleControllerObj.CreateSchedule(toSaveSchedule);
		await this.refreshSchedule()
	}

	convertScheduleData(calendarSchedule) {
		var scheduleType = "Availability"
		var scheduleFor = UsercontrollerObj._User.id
		if (UsercontrollerObj._User.position == "Manager") {

		} else {

		}

		var toSaveSchedule = {
			"id": calendarSchedule.id,
			"startTime": calendarSchedule.start.getTime(),
			"endTime": calendarSchedule.end.getTime(),
			"scheduleType": scheduleType,
			"scheduleBy": UsercontrollerObj._User.id,
			"scheduleFor": scheduleFor,
			"scheduleDetail": ""
		}

		return toSaveSchedule;
	}

	async refreshSchedule() {
		if(this.state.userID == null) {
			console.log("noooo")
			var scheudules = await ScheduleControllerObj.GetUserSchedule();
		} else{
			console.log("yesss")
			var scheudules = await ScheduleControllerObj.GetUserScheduleByID(this.state.userID);
		}

		this.setState({ Schedules: scheudules });

		console.log(this.state);
	}

	async OnScheduleClick(event) {
		if (window.confirm("Do you want to delete this scheudule")) {
			await ScheduleControllerObj.DeleteSchedule(event.id);
			this.refreshSchedule();
		}
	}

	static SetUserToDisplayCalendar(userID) {
		this.setState({userID: userID});
		this.refreshSchedule();
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
					onSelectEvent={schedule => this.OnScheduleClick(schedule)}
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