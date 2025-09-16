import { PropertiesBuilder } from '@amonlibanio/n8n-openapi-node';
import type { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import type { OpenAPIV3 } from 'openapi-types';
import * as doc from './openapi.json';

const parser = new PropertiesBuilder(doc as unknown as OpenAPIV3.Document);
const properties = parser.Build();

export class CogfyMessenger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cogfy Messenger',
    name: 'cogfyMessenger',
    icon: 'file:public/cogfy.png',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Cogfy Messenger API',
    defaults: {
      name: 'Cogfy Messenger',
    },
    inputs: ['main'] as NodeConnectionType[],
    outputs: ['main'] as NodeConnectionType[],
    credentials: [
      {
        name: 'cogfyMessengerApi',
        required: true,
      },
    ],
    requestDefaults: {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': '={{$credentials.apiKey}}',
      },
      baseURL: '={{$credentials.baseUrl}}',
    },
    properties: properties,
  };
}
