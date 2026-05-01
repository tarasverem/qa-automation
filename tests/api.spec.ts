import { test } from '@playwright/test';
import { ObjectsApi } from '../api/ObjectsApi';
import { generateApiObject } from '../helpers/dataGenerator';

test.describe('API Tests - restful-api.dev', () => {

  test('GET - Retrieve all objects', async ({ request }) => {
    const api = new ObjectsApi(request);
    await api.getAll();
  });

  test('POST - Create a new object', async ({ request }) => {
    const api = new ObjectsApi(request);
    await api.createAndVerify(generateApiObject());
  });

  test('GET - Retrieve object by ID', async ({ request }) => {
    const api = new ObjectsApi(request);
    const payload = generateApiObject();
    const created = await api.createAndVerify(payload);
    await api.getByIdAndVerify(created.id, payload.name);
  });

  test('DELETE - Delete object and verify it is gone', async ({ request }) => {
    const api = new ObjectsApi(request);
    const created = await api.createAndVerify(generateApiObject());
    await api.deleteAndVerify(created.id);
  });

});