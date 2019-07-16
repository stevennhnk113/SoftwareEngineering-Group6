import React from "react";
import UsercontrollerObj from "../Controller/UserController";
import { MainNavbar } from "./Component/MainNavbar";

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Calendar, momentLocalizer, Navigate, Views } from 'react-big-calendar';

import moment from 'moment'

import './Style/HomeView.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import VacationControllerObj from "../Controller/VacationController";

const localizer = momentLocalizer(moment)
const DragAndDropCalendar = withDragAndDrop(Calendar)

export class VacationRequest extends React.Component {
	CurrentDisplayCalendarUserID = null;
	

	constructor(props) {
		super();

		this.state = {
			Vacations: []
		}

		this.CurrentDisplayCalendarUserID = UsercontrollerObj.GetUser().id;

		this.moveEvent = this.moveEvent.bind(this)
		VacationRequest.SetUserToDisplayCalendar = VacationRequest.SetUserToDisplayCalendar.bind(this)
	}

	async componentDidMount() {
		await this.refreshSchedule()
	}

	async moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
		const { Vacations } = this.state

		const idx = Vacations.indexOf(event)
		let allDay = event.allDay

		if (!event.allDay && droppedOnAllDaySlot) {
			allDay = true
		} else if (event.allDay && !droppedOnAllDaySlot) {
			allDay = false
		}

		console.log(Vacations)

		const updatedEvent = { ...event, start, end, allDay }

		console.log(updatedEvent)

		const nextEvents = [...Vacations]
		nextEvents.splice(idx, 1, updatedEvent)

		this.setState({
			Vacations: nextEvents,
		})

		var toSaveSchedule = this.convertScheduleData(updatedEvent);
		await VacationControllerObj.UpdateSchedule(toSaveSchedule);

		this.refreshSchedule()
	}

	resizeEvent = ({ event, start, end }) => {
		if(event.scheduleBy != UsercontrollerObj._User.id) return;

		const { Vacations} = this.state

		const idx = Vacations.indexOf(event)

		Vacations[idx].start = start;
		Vacations[idx].end = end;

		this.setState({
			Vacations: Vacations,
		})
        VacationControllerObj.UpdateSchedule(Vacations[idx]);
	}

	handleSelect = async ({ start, end }) => {
		var title = "Time Off";

		var newSchedule = {
			start,
			end,
			title,
		};

		this.setState({
			Vacations: [
				...this.state.Vacations,
				newSchedule,
			],
		})

		var toSaveSchedule = this.convertScheduleData(newSchedule);

		await VacationControllerObj.CreateSchedule(toSaveSchedule);
		await this.refreshSchedule()
	}

	convertScheduleData(calendarSchedule) {
		var scheduleType = "Vacation"
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
		var vacations = await VacationControllerObj.GetUserScheduleByID(this.CurrentDisplayCalendarUserID);
		this.setState({ Vacations: vacations });
	}

	async OnScheduleClick(event) {
		console.log(event)
		console.log(UsercontrollerObj._User.id)
		if(event.scheduleBy == UsercontrollerObj._User.id){
			if (window.confirm("Do you want to delete this scheudule")) {
				await VacationControllerObj.DeleteSchedule(event.id);
			}

		} else {
			if(event.scheduleType == "Request" || event.scheduleType == "Reject") {
				if (window.confirm("Do you want to accept this schedule request")) {
					event.scheduleType = "Request Accepted"
				}

			} else {
				if (window.confirm("Do you want to reject this schedule request")) {
					event.scheduleType = "Reject"
				}
			}

			await VacationControllerObj.UpdateSchedule(this.convertSchedule(event));
		}

		this.refreshSchedule();
	}

	async OnScheduleDoubleClick(event) {
		// if(event.scheduleBy != UsercontrollerObj._User.id){
		// 	if (window.confirm("Do you want to reject this schedule request")) {
		// 		event.scheduleType = "Request"
		// 	}
		// }

		// await ScheduleControllerObj.UpdateSchedule(this.convertSchedule(event));
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

					onDoubleClickEvent={schedule => this.OnScheduleDoubleClick(schedule)}

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
						} else if (e.scheduleType == "Reject") {
							style = {
								backgroundColor: 'red',
							}
							
						}else if (e.scheduleType == "Vacation") {
							style = {
								backgroundColor: 'blue',
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