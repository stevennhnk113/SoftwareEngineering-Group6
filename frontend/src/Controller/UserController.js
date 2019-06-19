import { BaseController } from "./BaseController";
import { IsUsingMockData } from "../config";

class UserController extends BaseController {
	async GetUserByID(id) {
		if (IsUsingMockData) {
			var item = null;
			switch (id) {
				case 1:
					item = {
						position: "Employee",
						userName: "komalkomal",
						firstName: "komal",
						lastName: "komal",
						id: 1
					}
					return item;
					break;
				case 2:
					item = {
						position: "Employee",
						userName: "StevenNguyen",
						firstName: "Steven",
						lastName: "Nguyen",
						id: 2
					}
					return item;
					break;
				case 3:
					item = {
						position: "Employee",
						userName: "Harpreet",
						firstName: "Harpreet",
						lastName: "Kaur",
						id: 3
					}
					return item;
					break;
			}
			var restApi = "/api/user/" + id.toString();

			return this.Get(restApi);
		}
	}

	async UserLogin(username, password)
	{
		var restApi = "/api/user/login";

		var payload = {
			username: username,
			password: password
		};

		return this.Post(restApi, payload);
	}
}

var UsercontrollerObj = new UserController();
export default UsercontrollerObj;