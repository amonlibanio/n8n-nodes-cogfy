import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from "n8n-workflow";

export class CogfyTablesApi implements ICredentialType {
	name = "cogfyTablesApi";
	displayName = "Cogfy Tables API";
	documentationUrl = "https://docs.cogfy.com/api-reference/authentication";
	properties: INodeProperties[] = [
		{
			displayName: "API Base URL",
			name: "baseUrl",
			type: "string",
			default: "https://api.cogfy.com",
			placeholder: "https://api.cogfy.com",
			required: true,
			description: "Base URL of the Cogfy API",
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
			description: "Your Cogfy API key",
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: "generic",
		properties: {
			headers: {
				"api-key": "={{$credentials.apiKey}}",
				"Content-Type": "application/json",
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: "={{$credentials.baseUrl}}",
			url: "/collections",
			method: "GET",
			headers: {
				"api-key": "={{$credentials.apiKey}}",
				"Content-Type": "application/json",
			},
		},
	};
}
