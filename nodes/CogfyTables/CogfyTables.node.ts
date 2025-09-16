import { N8NPropertiesBuilder } from '@devlikeapro/n8n-openapi-node';
import type { 
  IExecuteFunctions, 
  INodeExecutionData, 
  INodeType, 
  INodeTypeDescription, 
  NodeConnectionType 
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import type { OpenAPIV3 } from 'openapi-types';
import * as doc from './openapi.json';

const parser = new N8NPropertiesBuilder(doc as unknown as OpenAPIV3.Document);
const properties = parser.build();

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
        'api-key': '={{$credentials.apiKey}}',
      },
      baseURL: '={{$credentials.baseUrl}}',
    },
    properties: properties,
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        // Get credentials asynchronously (best practice from n8n docs)
        await this.getCredentials('cogfyTablesApi');
        
        const responseData = await this.helpers.requestWithAuthentication.call(
          this,
          'cogfyTablesApi',
          {
            method: 'GET',
            url: '/collections',
            json: true,
          }
        );

        returnData.push({
          json: responseData,
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { 
              error: error.message,
              success: false 
            },
          });
        } else {
          throw new NodeApiError(this.getNode(), error, { message: `Cogfy Tables API error: ${error.message}` });
        }
      }
    }

    return [returnData];
  }
}
