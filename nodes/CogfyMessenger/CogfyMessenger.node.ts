import { PropertiesBuilder } from '@amonlibanio/n8n-openapi-node';
import type { 
  IExecuteFunctions, 
  INodeExecutionData, 
  INodeType, 
  INodeTypeDescription, 
  NodeConnectionType 
} from 'n8n-workflow';
import type { OpenAPIV3 } from 'openapi-types';
import * as doc from './openapi.json';

const parser = new PropertiesBuilder(doc as unknown as OpenAPIV3.Document);
const properties = parser.Build();

export class CogfyMessenger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Cogfy Messenger',
    name: 'cogfyMessenger',
    icon: 'file:cogfy.png',
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

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        // Get credentials asynchronously (best practice from n8n docs)
        await this.getCredentials('cogfyMessengerApi');
        
        const responseData = await this.helpers.requestWithAuthentication.call(
          this,
          'cogfyMessengerApi',
          {
            method: 'GET',
            url: '/api/v1/health',
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
          throw new Error(`Cogfy Messenger API error: ${error.message}`);
        }
      }
    }

    return [returnData];
  }
}
