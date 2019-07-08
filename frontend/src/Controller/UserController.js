import { BaseController } from "./BaseController";

class UserController extends BaseController {
	_UserId = "";
	_User = null;

	async GetUserByID(id) {
		var restApi = "/api/user/" + id.toString();

		this._User = await this.Get(restApi);
		console.log(this._User);
		return this._User;
	}

	GetUser() {
		console.log(this._User);
		return this._User;
	}

	async GetAllUsers() {

	}

	async UserLogin(username, password) {
		var restApi = "/api/user/login";

		var payload = {
			username: username,
			password: password
		};

		this._User = await this.Post(restApi, payload);
		console.log(this._User);
		if (this._User != null) {
			this._UserId = this._User.id;
		}

		return this._User;
	}
}

var UsercontrollerObj = new UserController();
export default UsercontrollerObj;