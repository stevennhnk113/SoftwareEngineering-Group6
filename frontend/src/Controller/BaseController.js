import { ServerString } from "../config";
var request = require("request");


export class BaseController {
	async Get(restApi) {
		var response = await fetch(ServerString + restApi);

		if (!this.IsSuccessful(response)) return null;

		var data = await response.json();
		return data;
	}

	async Post(restApi, payload) {
		console.log(ServerString + restApi);

		var options = {
			method: 'POST',
			url: ServerString + restApi,
			headers:
			{
				'cache-control': 'no-cache',
				'Content-Type': 'application/json',
			},
			body: payload,
			json: true,
			//mode: 'Access-Control-Allow-Origin'
		};

		return new Promise((resolve, reject) => {
			request(options, function (error, response, body) {
				if (error) resolve(null);

				if(body.status !== 200) resolve(null);

				return body;
			});
		});
	}

	IsSuccessful(response) {
		return (response.status === 200) ? true : false;
	}
}