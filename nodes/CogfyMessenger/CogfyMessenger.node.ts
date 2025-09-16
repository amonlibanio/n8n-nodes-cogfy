import { N8NPropertiesBuilder, type N8NPropertiesBuilderConfig } from '@devlikeapro/n8n-openapi-node';
import type { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import * as doc from './openapi.json';

const config: N8NPropertiesBuilderConfig = {}
const parser = new N8NPropertiesBuilder(doc, config);
const properties = parser.build()

export class CogfyMessenger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cogfy Messenger',
    name: 'cogfyMessenger',
    icon: 'file:cogfy.svg',
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
      },
      baseURL: '={{$credentials.baseUrl}}',
    },
    properties: properties,
  };
}
