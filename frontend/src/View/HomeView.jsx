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
    AcceptRejectFunc = null;
    AcceptRejectParam = null;
    yes = "yes";
    no = "no";
    constructor(props) {
        super();
        this.state = {
            Schedules: [],
            AcceptRejectStatus: false,
            AcceptRejectTitle: "",
            IsShowingAcceptReject: false
        }
        this.CurrentDisplayCalendarUserID = UsercontrollerObj.GetUser().id;
        this.moveEvent = this.moveEvent.bind(this)
        this.onYes = this.onYes.bind(this)
        this.onNo = this.onNo.bind(this)
        HomeView.refreshScheduleStatic = HomeView.refreshScheduleStatic.bind(this)
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
        if (event.scheduleBy != UsercontrollerObj._User.id) return;
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
    static async refreshScheduleStatic() {
        var scheudules = await ScheduleControllerObj.GetUserScheduleByID(this.CurrentDisplayCalendarUserID);
        this.setState({ Schedules: scheudules });
    }
    async OnScheduleClick(event) {
        console.log(event)
        console.log(UsercontrollerObj._User.id)
        this.setState({ IsShowingAcceptReject: true })
        if (event.scheduleBy == UsercontrollerObj._User.id) {
            this.yes = "Yes"
            this.no = "No"
            this.setState({ AcceptRejectTitle: "Do you want to delete this scheudule" });
            this.AcceptRejectFunc = ScheduleControllerObj.DeleteSchedule
            this.AcceptRejectParam = event
        } else {
            this.yes = "Accept"
            this.no = "Reject"
            this.setState({ AcceptRejectTitle: "Accept or Reject this schedule request" });
            this.AcceptRejectFunc = ScheduleControllerObj.UpdateSchedule
            this.AcceptRejectParam = this.convertSchedule(event)
        }
        // if (event.scheduleBy == UsercontrollerObj._User.id) {
        //  if (window.confirm("Do you want to delete this scheudule")) {
        //      await ScheduleControllerObj.DeleteSchedule(event.id);
        //  }
        // } else {
        //  if (event.scheduleType == "Request" || event.scheduleType == "Reject") {
        //      if (window.confirm("Do you want to accept this schedule request")) {
        //          event.scheduleType = "Request Accepted"
        //      }
        //  } else {
        //      if (window.confirm("Do you want to reject this schedule request")) {
        //          event.scheduleType = "Reject"
        //      }
        //  }
        //  await ScheduleControllerObj.UpdateSchedule(this.convertSchedule(event));
        // }
        this.refreshSchedule();
    }
    async OnScheduleDoubleClick(event) {
        // if(event.scheduleBy != UsercontrollerObj._User.id){
        //  if (window.confirm("Do you want to reject this schedule request")) {
        //      event.scheduleType = "Request"
        //  }
        // }
        // await ScheduleControllerObj.UpdateSchedule(this.convertSchedule(event));
    }
    static SetUserToDisplayCalendar(userID) {
        this.CurrentDisplayCalendarUserID = userID;
        this.refreshSchedule();
    }
    async onYes() {
        this.AcceptRejectParam.scheduleType = "Request Accepted"
        await this.AcceptRejectFunc(this.AcceptRejectParam)
        this.setState({ IsShowingAcceptReject: false })
        this.refreshSchedule();
    }
    async onNo() {
        this.AcceptRejectParam.scheduleType = "Reject"
        if(this.no != "No") {
            await this.AcceptRejectFunc(this.AcceptRejectParam)
        }
        this.setState({ IsShowingAcceptReject: false })
        this.refreshSchedule();
    }
    render() {
        var acceptRejectContainer = null;
        if (this.state.IsShowingAcceptReject) {
            acceptRejectContainer = (
                <div style={AcceptRejectContainer}>
                    <div>
                        <h3>{this.state.AcceptRejectTitle}</h3>
                        <button className="btn-lg btn-dark btn-block" onClick={this.onYes}>{this.yes}</button>
                        <button className="btn-lg btn-dark btn-block" onClick={this.onNo}>{this.no}</button>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {acceptRejectContainer}
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
                        if (!("scheduleType" in e)) return { color: "black" }
                        var style = null;
                        if (e.scheduleType == "Request Accepted" || e.scheduleType == "Vacation") {
                            style = {
                                backgroundColor: 'green',
                            }
                        } else if (e.scheduleType.includes("Request")) {
                            style = {
                                backgroundColor: 'yellow',
                            }
                        } else if (e.scheduleType == "Reject") {
                            style = {
                                backgroundColor: 'red',
                            }
                        }
                        return {
                            style: { ...style, ...{ color: "black" } }
                        }
                    }}
                />
            </div>
        );
    }
}
var AcceptRejectContainer = {
    position: "fixed",
    left: "0px",
    top: "0px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgb(255, 255, 255, 0.8)",
}
