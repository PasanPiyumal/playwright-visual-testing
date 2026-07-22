const { test, expect, request } = require('@playwright/test');

test.describe('API Testing with JSONPlaceholder (CRUD Operations)', () => {

  let apiContext;

  // 1. හැම ටෙස්ට් එකකටම කලින් Clean API Context එකක් හදාගන්නවා
  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  });

  // 2. ටෙස්ට් ඔක්කොම ඉවර වුණාම Context එක Close කරනවා
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // -------------------------------------------------------------
  // Test 1: GET Request (Fetching Data)
  // -------------------------------------------------------------
  test('1. GET - Retrieve Post Details', async () => {
    const response = await apiContext.get('/posts/1');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('GET Response:', responseBody);

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

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log('POST Response:', responseBody);

    expect(responseBody.title).toBe(postPayload.title);
    expect(responseBody.body).toBe(postPayload.body);
    expect(responseBody.userId).toBe(postPayload.userId);
    expect(responseBody).toHaveProperty('id');
  });

  // -------------------------------------------------------------
  // Test 3: PUT Request (Updating Data)
  // -------------------------------------------------------------
  test('3. PUT - Update Existing Post', async () => {
    const updatePayload = {
      id: 1,
      title: 'Piyumal Updated Automation Title',
      body: 'Updated the post body using Playwright PUT request',
      userId: 1
    };

    // ID 1 වෙන Post එක සම්පූර්ණයෙන්ම Update කරනවා
    const response = await apiContext.put('/posts/1', {
      data: updatePayload,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(200); // Successfully updated

    const responseBody = await response.json();
    console.log('PUT Response:', responseBody);

    // Assertions
    expect(responseBody.title).toBe(updatePayload.title);
    expect(responseBody.body).toBe(updatePayload.body);
  });

  // -------------------------------------------------------------
  // Test 4: DELETE Request (Deleting Data)
  // -------------------------------------------------------------
  test('4. DELETE - Remove Post', async () => {
    // ID 1 වෙන Post එක Delete කරනවා
    const response = await apiContext.delete('/posts/1');

    // JSONPlaceholder සර්වර් එකෙන් DELETE සාර්ථක වුණාම 200 OK එකක් දෙනවා
    expect(response.status()).toBe(200);
    console.log('DELETE Status:', response.status());
  });

  // -------------------------------------------------------------
  // Test: PATCH Request (Partial Update)
  // -------------------------------------------------------------
  test('5. PATCH - Update Only Post Title', async () => {
    const patchPayload = {
      title: 'Only Title Changed with PATCH'
    };

    // ID 1 වෙන Post එකේ Title එක විතරක් update කරනවා
    const response = await apiContext.patch('/posts/1', {
      data: patchPayload,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('PATCH Response:', responseBody);

    // Title එක විතරක් අලුත් එකට වෙනස් වෙලාද බලනවා
    expect(responseBody.title).toBe(patchPayload.title);
  });

  // HEAD Request example
  test('6. HEAD - Check Post Headers', async () => {
    const headResponse = await apiContext.head('/posts/1');
    console.log('Content Type:', headResponse.headers()['content-type']);
    expect(headResponse.status()).toBe(200);
  });

  // fetch method via Playwright for custom methods like OPTIONS
  test('7. OPTIONS - Check Allowed Methods', async () => {
    const optionsResponse = await apiContext.fetch('/posts/1', {
      method: 'OPTIONS'
    });
    console.log('Allowed Methods:', optionsResponse.headers()['allow']);
    expect(optionsResponse.status()).toBe(204);
  });
});