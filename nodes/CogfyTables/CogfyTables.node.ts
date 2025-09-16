import { PropertiesBuilder } from '@amonlibanio/n8n-openapi-node';
import type { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import type { OpenAPIV3 } from 'openapi-types';
import * as doc from './openapi.json';

const parser = new PropertiesBuilder(doc as unknown as OpenAPIV3.Document);
const properties = parser.Build();

export class CogfyTables implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cogfy Tables',
    name: 'cogfyTables',
    icon: 'file:public/cogfy.png',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Cogfy Tables API for collections, records, and fields management',
    defaults: {
      name: 'Cogfy Tables',
    },
    inputs: ['main'] as NodeConnectionType[],
    outputs: ['main'] as NodeConnectionType[],
    credentials: [
      {
        name: 'cogfyTablesApi',
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
