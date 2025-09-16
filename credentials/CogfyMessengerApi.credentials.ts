import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from "n8n-workflow";

export class CogfyMessengerApi implements ICredentialType {
	name = "cogfyMessengerApi";
	displayName = "Cogfy Messenger API";
	documentationUrl = "https://messenger-public-api.cogfy.com/docs/";
	properties: INodeProperties[] = [
		{
			displayName: "API Base URL",
			name: "baseUrl",
			type: "string",
			default: "https://messenger-public-api.cogfy.com",
			placeholder: "https://messenger-public-api.cogfy.com",
			required: true,
			description: "Base URL of the Cogfy Messenger API",
		},
		{
			displayName: "API Key",
			name: "apiKey",
			type: "string",
			default: "",
			placeholder: "your-api-key-here",
			required: true,
			typeOptions: {
				password: true,
			},
			description: "Your Cogfy Messenger API key",
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: "generic",
		properties: {
			headers: {
				Authorization: "=Bearer {{$credentials.apiKey}}",
				"Content-Type": "application/json",
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: "={{$credentials.baseUrl}}",
			url: "/api/v1/health",
			method: "GET",
			headers: {
				"api-key": "={{$credentials.apiKey}}",
				"Content-Type": "application/json",
			},
		},
	};
}
