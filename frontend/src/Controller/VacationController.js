import { BaseController } from "./BaseController";
import { IsUsingMockData } from "../config";
import UsercontrollerObj from "./UserController";

class VacationController extends BaseController {
	Vacations = [];

	async GetUserSchedule() {
		return await this.GetUserScheduleByID(UsercontrollerObj._UserId);
	}

	async CreateSchedule(vacation) {
		var restApi = "/api/vacation";

		return await this.Post(restApi, vacation);
	}

	async UpdateSchedule(vacation) {
		var restApi = "/api/vacation";

		console.log("UpdateSchedule")
		console.log(vacation)
		return await this.Put(restApi,vacation);
	}

	async DeleteSchedule(id) {
		var restApi = "/api/vacation/" + id;

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

var VacationControllerObj = new VacationController();
export default VacationControllerObj;