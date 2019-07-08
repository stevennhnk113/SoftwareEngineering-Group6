export var IsLocalServer = true;
export var IsUsingMockData = false;

function configServerUrl()
{
	return (IsLocalServer) ? "http://localhost:8000" : "";
}

export var ServerString = configServerUrl();