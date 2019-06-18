import { BaseController } from "./BaseController";
import { IsUsingMockData } from "../config";

export class UserController extends BaseController {
	async GetUserByID(id) {
		if (IsUsingMockData) {
			switch (id) {
				case 1:
					return
					{
						position: "Employee";
						userName: "komalkomal";
						firstName: "komal";
						lastName: "komal";
						id: 1;
					}
					break;
				case 2:
					return
					{
						position: "Employee";
						userName: "StevenNguyen";
						firstName: "Steven";
						lastName: "Nguyen";
						id: 2;
					}
					break;
				case 3:
					return
					{
						position: "Employee";
						userName: "Harpreet";
						firstName: "Harpreet";
						lastName: "Kaur";
						id: 3;
					}
					break;
			}
			var restApi = "/api/user/" + id.toString();

			return this.Get(restApi);
		}
	}