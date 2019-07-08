import { ServerString } from "../config";
var request = require("request");


export class BaseController {
	async Get(restApi) {
		console.log(ServerString + restApi);

		var options = {
			method: 'GET',
			url: ServerString + restApi,
			headers:
			{
				'cache-control': 'no-cache',
				'Content-Type': 'application/json',
			},
			json: true
		};

		return new Promise((resolve, reject) => {
			request(options, function (error, response, body) {
				if (error){
					console.log(error);
					resolve(null);
				}

				console.log(body.userName);
				console.log(body);

				resolve(body);
			});
		});
	}

	Post(restApi, payload) {
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
				if (error){
					console.log(error);
					resolve(null);
				}

				resolve(body);
			});
		});
	}

	IsSuccessful(response) {
		return (response.status === 200) ? true : false;
	}
}