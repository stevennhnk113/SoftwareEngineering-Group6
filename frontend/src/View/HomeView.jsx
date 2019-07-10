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
	CurrentDisplayCalendarUserID = null;

	constructor(props) {
		super();

		this.state = {
			Schedules: []
		}

		this.CurrentDisplayCalendarUserID = UsercontrollerObj.GetUser().id;

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
		if(event.scheduleBy != UsercontrollerObj._User.id) return;

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
		var scheduleFor = this.CurrentDisplayCalendarUserID
		var scheduleBy = UsercontrollerObj._User.id
		if (scheduleFor != scheduleBy) {
			scheduleType = "Request"
		} else {

		}

		var toSaveSchedule = {
			"id": calendarSchedule.id,
			"startTime": calendarSchedule.start.getTime(),
			"endTime": calendarSchedule.end.getTime(),
			"scheduleType": scheduleType,
			"scheduleBy": scheduleBy,
			"scheduleFor": scheduleFor,
			"scheduleDetail": ""
		}

		console.log("toSaveSchedule")
		console.log(toSaveSchedule)

		return toSaveSchedule;
	}

	convertSchedule(calendarSchedule) {
		var toSaveSchedule = {
			"id": calendarSchedule.id,
			"startTime": calendarSchedule.start.getTime(),
			"endTime": calendarSchedule.end.getTime(),
			"scheduleType": calendarSchedule.scheduleType,
			"scheduleBy": calendarSchedule.scheduleBy,
			"scheduleFor": calendarSchedule.scheduleFor,
			"scheduleDetail": calendarSchedule.scheduleDetail
		}

		return toSaveSchedule;
	}

	async refreshSchedule() {
		var scheudules = await ScheduleControllerObj.GetUserScheduleByID(this.CurrentDisplayCalendarUserID);
		this.setState({ Schedules: scheudules });
	}

	async OnScheduleClick(event) {
		console.log(event)
		console.log(UsercontrollerObj._User.id)
		if(event.scheduleBy == UsercontrollerObj._User.id){
			if (window.confirm("Do you want to delete this scheudule")) {
				await ScheduleControllerObj.DeleteSchedule(event.id);
			}

		} else {
			if(event.scheduleType == "Request") {
				if (window.confirm("Do you want to accept this schedule request")) {
					event.scheduleType = "Request Accepted"
				}

			} else {
				if (window.confirm("Do you want to reject this schedule request")) {
					event.scheduleType = "Request"
				}
			}

			await ScheduleControllerObj.UpdateSchedule(this.convertSchedule(event));
		}

		this.refreshSchedule();
	}

	static SetUserToDisplayCalendar(userID) {
		this.CurrentDisplayCalendarUserID = userID;
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
					views={{ week: true }}

					selectable
					onSelectEvent={schedule => this.OnScheduleClick(schedule)}
					onSelectSlot={this.handleSelect}

					resizable
					onEventResize={this.resizeEvent}

					onDragStart={console.log}
					onEventDrop={this.moveEvent}

					eventPropGetter={(e) => {
						var style = null;
						if(e.scheduleType == "Request") {
							style = {
								backgroundColor: 'yellow',
							}
						} else if (e.scheduleType == "Request Accepted") {
							style = {
								backgroundColor: 'green',
							}
						}

						return {
							style: {...style, ...{color: "black"}}
						}
					}}
				/>
			</div>
		);
	}
}