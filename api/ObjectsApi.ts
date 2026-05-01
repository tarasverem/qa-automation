import { APIRequestContext, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';

export class ObjectsApi {
  constructor(private request: APIRequestContext) {}

  async getAll() {
    const response = await this.request.get(`${BASE_URL}/objects`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    console.log(`Total objects returned: ${body.length}`);
  }

  async createAndVerify(payload: object) {
    const response = await this.request.post(`${BASE_URL}/objects`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
    console.log(`Created object with ID: ${body.id}`);
    return body;
  }

  async getByIdAndVerify(id: string, expectedName: string) {
    const response = await this.request.get(`${BASE_URL}/objects/${id}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(id);
    expect(body.name).toBe(expectedName);
    console.log(`Fetched object: ${JSON.stringify(body)}`);
  }

  async deleteAndVerify(id: string) {
    const deleteResponse = await this.request.delete(`${BASE_URL}/objects/${id}`);
    expect(deleteResponse.status()).toBe(200);
    const body = await deleteResponse.json();
    expect(body.message).toContain(id);
    console.log(`Deleted: ${body.message}`);

    const getResponse = await this.request.get(`${BASE_URL}/objects/${id}`);
    expect(getResponse.status()).toBe(404);
  }
}