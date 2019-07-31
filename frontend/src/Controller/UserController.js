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
		// console.log(this._User);
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
		// console.log("blad")
		// console.log(this._User);
		if (this._User != null) {
			this._UserId = this._User.id;
		}

		return this._User;
	}

	async GetNonManagerUsers() {
		var restApi = "/api/user/not/manager"

		var users = await this.Get(restApi);
		console.log(users);
		return users;
	}

	async CreateUser(user) {
		var restApi = "/api/user"

		var users = await this.Post(restApi, user);
		console.log(users);
		return users;
	}

	async UpdateUser(user) {
		var restApi = "/api/user/" + user.id.toString();

		var users = await this.Put(restApi, user);
		console.log(users);
		return users;
	}
}

var UsercontrollerObj = new UserController();
export default UsercontrollerObj;