import { CogfyTables } from '../nodes/CogfyTables/CogfyTables.node';

test('smoke', () => {
  const node = new CogfyTables();
  expect(node.description.properties).toBeDefined();
});

test('node description properties', () => {
  const node = new CogfyTables();
  const description = node.description;

  expect(description.displayName).toBe('Cogfy Tables');
  expect(description.name).toBe('cogfyTables');
  expect(description.group).toEqual(['transform']);
  expect(description.version).toBe(1);
  expect(description.description).toBe(
    'Interact with Cogfy Tables API for collections, records, and fields management'
  );
});

test('node credentials', () => {
  const node = new CogfyTables();
  const credentials = node.description.credentials;

  expect(credentials).toBeDefined();
  expect(credentials).toHaveLength(1);
  if (credentials) {
    expect(credentials[0].name).toBe('cogfyTablesApi');
    expect(credentials[0].required).toBe(true);
  }
});

test('node inputs and outputs', () => {
  const node = new CogfyTables();
  const description = node.description;

  expect(description.inputs).toContain('main');
  expect(description.outputs).toContain('main');
});

test('request defaults', () => {
  const node = new CogfyTables();
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
  const node = new CogfyTables();
  expect(node.description.properties).toBeDefined();
  expect(Array.isArray(node.description.properties)).toBe(true);
  expect(node.description.properties.length).toBeGreaterThan(0);
});
