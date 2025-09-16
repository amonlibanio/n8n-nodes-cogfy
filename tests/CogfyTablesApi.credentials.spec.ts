import { expect, test } from 'bun:test';
import { CogfyTablesApi } from '../credentials/CogfyTablesApi.credentials';

test('credentials properties', () => {
  const credentials = new CogfyTablesApi();

  expect(credentials.name).toBe('cogfyTablesApi');
  expect(credentials.displayName).toBe('Cogfy Tables API');
  expect(credentials.documentationUrl).toBe('https://docs.cogfy.com/api-reference/authentication');
});

test('credentials fields', () => {
  const credentials = new CogfyTablesApi();
  const properties = credentials.properties;

  expect(properties).toHaveLength(2);

  // Base URL field
  expect(properties[0].displayName).toBe('API Base URL');
  expect(properties[0].name).toBe('baseUrl');
  expect(properties[0].type).toBe('string');
  expect(properties[0].default).toBe('https://api.cogfy.com');
  expect(properties[0].required).toBe(true);

  // API Key field
  expect(properties[1].displayName).toBe('API Key');
  expect(properties[1].name).toBe('apiKey');
  expect(properties[1].type).toBe('string');
  expect(properties[1].required).toBe(true);
  expect(properties[1].typeOptions?.password).toBe(true);
});

test('authentication configuration', () => {
  const credentials = new CogfyTablesApi();
  const auth = credentials.authenticate;

  expect(auth.type).toBe('generic');
  expect(auth.properties.headers).toEqual({
    'api-key': '={{$credentials.apiKey}}',
    'Content-Type': 'application/json',
  });
});

test('test configuration', () => {
  const credentials = new CogfyTablesApi();
  const testConfig = credentials.test;

  expect(testConfig.request.baseURL).toBe('={{$credentials.baseUrl}}');
  expect(testConfig.request.url).toBe('/collections');
  expect(testConfig.request.method).toBe('GET');
});
