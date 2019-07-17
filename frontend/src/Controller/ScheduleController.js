import { BaseController } from "./BaseController";
import { IsUsingMockData } from "../config";
import UsercontrollerObj from "./UserController";

class ScheduleController extends BaseController {
	Schedules = [];

	constructor() {
		super();

		this.UpdateSchedule = this.UpdateSchedule.bind(this)
		this.DeleteSchedule = this.DeleteSchedule.bind(this)
	}

	async GetUserSchedule() {
		return await this.GetUserScheduleByID(UsercontrollerObj._UserId);
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

	async DeleteSchedule(event) {
		var restApi = "/api/schedule/" + event.id;

		await this.Delete(restApi)
	}

	async GetUserScheduleByID(id) {
		var restApi = "/api/schedule/schedulefor/" + id;

		var rawSchedules = await this.Get(restApi);

		if(rawSchedules === null) return [];

		rawSchedules.forEach(element => {
			element.title = element.scheduleType
			element.start = new Date(element.startTime)
			element.end = new Date(element.endTime)
		});

		return rawSchedules;
	}
}

var ScheduleControllerObj = new ScheduleController();
export default ScheduleControllerObj;