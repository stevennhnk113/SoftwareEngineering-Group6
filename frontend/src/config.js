export var IsLocalServer = true;
export var IsUsingMockData = true;

function configServerUrl()
{
	return (IsLocalServer) ? "localhost:8000" : "";
}

export var ServerString = configServerUrl();