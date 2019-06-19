import { BaseController } from "./BaseController";
import { IsUsingMockData } from "../config";

class UserController extends BaseController {
	_UserId = "";

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

	async GetUser() {
		console.log("/api/user/" + this._UserId);
		var restApi = "/api/user/" + this._UserId;

		return this.Get(restApi);
	}

	async UserLogin(username, password)
	{
		var restApi = "/api/user/login";

		var payload = {
			username: username,
			password: password
		};

		var user = await this.Post(restApi, payload);
		console.log(user);
		if(user != null) {
			this._UserId = user.id;
		}

		return user;
	}
}

var UsercontrollerObj = new UserController();
export default UsercontrollerObj;