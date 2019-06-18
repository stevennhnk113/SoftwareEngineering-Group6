import { ServerString } from "../config";

export class BaseController
{
	async Get(restApi)
	{
		var response = await fetch(ServerString + restApi);

		if(!IsSuccessful(response)) return null;
		
		var data  = await response.json();
		return data;
	}

	IsSuccessful(response)
	{
		return (response.status == 200) ? true : false;
	}
}