import { CogfyMessengerApi } from '../credentials/CogfyMessengerApi.credentials';

test('credentials properties', () => {
  const credentials = new CogfyMessengerApi();

  expect(credentials.name).toBe('cogfyMessengerApi');
  expect(credentials.displayName).toBe('Cogfy Messenger API');
  expect(credentials.documentationUrl).toBe('https://messenger-public-api.cogfy.com/docs/');
});

test('credentials fields', () => {
  const credentials = new CogfyMessengerApi();
  const properties = credentials.properties;

  expect(properties).toHaveLength(2);

  // Base URL field
  expect(properties[0].displayName).toBe('API Base URL');
  expect(properties[0].name).toBe('baseUrl');
  expect(properties[0].type).toBe('string');
  expect(properties[0].default).toBe('https://messenger-public-api.cogfy.com');
  expect(properties[0].required).toBe(true);

  // API Key field
  expect(properties[1].displayName).toBe('API Key');
  expect(properties[1].name).toBe('apiKey');
  expect(properties[1].type).toBe('string');
  expect(properties[1].required).toBe(true);
  expect(properties[1].typeOptions?.password).toBe(true);
});

test('authentication configuration', () => {
  const credentials = new CogfyMessengerApi();
  const auth = credentials.authenticate;

  expect(auth.type).toBe('generic');
  expect(auth.properties.headers).toEqual({
    Authorization: '=Bearer {{$credentials.apiKey}}',
    'Content-Type': 'application/json',
  });
});

test('test configuration', () => {
  const credentials = new CogfyMessengerApi();
  const testConfig = credentials.test;

  expect(testConfig.request.baseURL).toBe('={{$credentials.baseUrl}}');
  expect(testConfig.request.url).toBe('/api/v1/health');
  expect(testConfig.request.method).toBe('GET');
});
