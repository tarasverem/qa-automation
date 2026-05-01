import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';

test.describe('API Tests - restful-api.dev', () => {

  test('GET - Retrieve all objects', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects`);

    // 200 confirms the endpoint is alive and responding
    expect(response.status()).toBe(200);

    const body = await response.json();

    // response must be an array — if it's an object, something is wrong with the contract
    expect(Array.isArray(body)).toBeTruthy();

    // API has pre-seeded data so empty array here would be unexpected
    expect(body.length).toBeGreaterThan(0);

    console.log(`Total objects returned: ${body.length}`);
  });

  test('POST - Create a new object', async ({ request }) => {
    const newObject = {
      name: 'QA Test Laptop',
      data: {
        year: 2024,
        price: 1999.99,
        CPU: 'Apple M3',
        RAM: '16 GB'
      }
    };

    const response = await request.post(`${BASE_URL}/objects`, {
      data: newObject,
      headers: { 'Content-Type': 'application/json' }
    });

    // this API returns 200 on creation instead of the standard 201 — known behaviour
    expect(response.status()).toBe(200);

    const body = await response.json();

    // id is server-generated, just checking it exists
    expect(body.id).toBeTruthy();

    // verify the response reflects what we actually sent
    expect(body.name).toBe('QA Test Laptop');
    expect(body.data.price).toBe(1999.99);

    // server should always stamp createdAt on new records
    expect(body.createdAt).toBeTruthy();

    console.log(`Created object with ID: ${body.id}`);
  });

  test('GET - Retrieve object by ID', async ({ request }) => {
    // create a fresh object so this test doesn't depend on existing data
    const postResponse = await request.post(`${BASE_URL}/objects`, {
      data: { name: 'QA Fetch Test', data: { type: 'test' } },
      headers: { 'Content-Type': 'application/json' }
    });
    const created = await postResponse.json();

    const response = await request.get(`${BASE_URL}/objects/${created.id}`);
    expect(response.status()).toBe(200);

    const body = await response.json();

    // make sure we got back the right object, not some other random one
    expect(body.id).toBe(created.id);
    expect(body.name).toBe('QA Fetch Test');

    console.log(`Fetched object: ${JSON.stringify(body)}`);
  });

  test('DELETE - Delete object and verify it is gone', async ({ request }) => {
    // create a throwaway object — cleaner than relying on a hardcoded id
    const postResponse = await request.post(`${BASE_URL}/objects`, {
      data: { name: 'QA Delete Test', data: { type: 'delete-me' } },
      headers: { 'Content-Type': 'application/json' }
    });
    const created = await postResponse.json();
    const idToDelete = created.id;

    const deleteResponse = await request.delete(`${BASE_URL}/objects/${idToDelete}`);
    expect(deleteResponse.status()).toBe(200);

    // API returns a confirmation message with the deleted id
    const deleteBody = await deleteResponse.json();
    expect(deleteBody.message).toContain(idToDelete);

    console.log(`Deleted: ${deleteBody.message}`);

    // the real check — make sure a follow-up GET returns 404
    const getResponse = await request.get(`${BASE_URL}/objects/${idToDelete}`);
    expect(getResponse.status()).toBe(404);
  });

});