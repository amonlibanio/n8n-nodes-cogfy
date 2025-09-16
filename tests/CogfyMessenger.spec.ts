import { CogfyMessenger } from '../nodes/CogfyMessenger/CogfyMessenger.node';

test('smoke', () => {
  const node = new CogfyMessenger();
  expect(node.description.properties).toBeDefined();
});

test('node description properties', () => {
  const node = new CogfyMessenger();
  const description = node.description;

  expect(description.displayName).toBe('Cogfy Messenger');
  expect(description.name).toBe('cogfyMessenger');
  expect(description.group).toEqual(['transform']);
  expect(description.version).toBe(1);
  expect(description.description).toBe('Interact with Cogfy Messenger API');
});

test('node credentials', () => {
  const node = new CogfyMessenger();
  const credentials = node.description.credentials;

  expect(credentials).toBeDefined();
  expect(credentials).toHaveLength(1);
  if (credentials) {
    expect(credentials[0].name).toBe('cogfyMessengerApi');
    expect(credentials[0].required).toBe(true);
  }
});

test('node inputs and outputs', () => {
  const node = new CogfyMessenger();
  const description = node.description;

  expect(description.inputs).toContain('main');
  expect(description.outputs).toContain('main');
});

test('request defaults', () => {
  const node = new CogfyMessenger();
  const requestDefaults = node.description.requestDefaults;

  expect(requestDefaults).toBeDefined();
  if (requestDefaults) {
    expect(requestDefaults.headers).toEqual({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    expect(requestDefaults.baseURL).toBe('={{$credentials.baseUrl}}');
  }
});

test('properties are defined', () => {
  const node = new CogfyMessenger();
  expect(node.description.properties).toBeDefined();
  expect(Array.isArray(node.description.properties)).toBe(true);
  expect(node.description.properties.length).toBeGreaterThan(0);
});
