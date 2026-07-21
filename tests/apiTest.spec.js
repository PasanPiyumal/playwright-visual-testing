const { test, expect, request } = require('@playwright/test');

test.describe('API Testing with JSONPlaceholder', () => {

  let apiContext;

  // 💡 1. හැම ටෙස්ට් එකකටම කලින් Clean API Context එකක් හදාගන්නවා
  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  });

  // 💡 2. ටෙස්ට් එක ඉවර වුණාම Context එක Close කරනවා
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // -------------------------------------------------------------
  // Test 1: GET Request (Fetching Data)
  // -------------------------------------------------------------
  test('1. GET - Retrieve Post Details', async () => {
    const response = await apiContext.get('/posts/1');

    // Status Code Verification (200 OK)
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('GET Response:', responseBody);

    // Property Assertions
    expect(responseBody.id).toBe(1);
    expect(responseBody).toHaveProperty('userId');
    expect(responseBody).toHaveProperty('title');
  });

  // -------------------------------------------------------------
  // Test 2: POST Request (Creating Data)
  // -------------------------------------------------------------
  test('2. POST - Create New Post', async () => {
    const postPayload = {
      title: 'Piyumal Automation',
      body: 'Testing API endpoints with Playwright framework',
      userId: 101
    };

    const response = await apiContext.post('/posts', {
      data: postPayload,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Status Code Verification (201 Created)
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log('POST Response:', responseBody);

    // Value Assertions
    expect(responseBody.title).toBe(postPayload.title);
    expect(responseBody.body).toBe(postPayload.body);
    expect(responseBody.userId).toBe(postPayload.userId);
    expect(responseBody).toHaveProperty('id'); // Auto-generated ID check
  });

});