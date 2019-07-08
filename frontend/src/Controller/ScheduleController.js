import { BaseController } from "./BaseController";
import { IsUsingMockData } from "../config";
import UsercontrollerObj from "./UserController";

class ScheduleController extends BaseController {
	Schedules = [];

	async GetUserSchedule() {
		var restApi = "/api/schedule/schedulefor/" + UsercontrollerObj._UserId;

		var rawSchedules = await this.Get(restApi);

		console.log(rawSchedules);

		rawSchedules.forEach(element => {
			element.title = element.scheduleType
			element.start = new Date(element.startTime)
			element.end = new Date(element.endTime)
		});

		return rawSchedules;
	}

	async CreateSchedule(schedule) {
		var restApi = "/api/schedule";

		return await this.Post(restApi, schedule);
	}

	async UpdateSchedule(schedule) {
		var restApi = "/api/schedule";

		console.log("UpdateSchedule")
		console.log(schedule)
		return await this.Put(restApi, schedule);
	}

	async GetUserScheduleByID(id) {

	}
}

var ScheduleControllerObj = new ScheduleController();
export default ScheduleControllerObj;