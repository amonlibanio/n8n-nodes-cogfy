import { N8NPropertiesBuilder, type N8NPropertiesBuilderConfig } from '@devlikeapro/n8n-openapi-node';
import type { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import * as doc from './openapi.json';

const config: N8NPropertiesBuilderConfig = {}
const parser = new N8NPropertiesBuilder(doc, config);
const properties = parser.build()

export class CogfyTables implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cogfy Tables',
    name: 'cogfyTables',
    icon: 'file:cogfy.svg',
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
      },
      baseURL: '={{$credentials.baseUrl}}',
    },
    properties: properties,
  };
}
