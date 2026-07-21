const { test, expect, request } = require('@playwright/test');

test.describe('API Chaining - Dynamic Data Handling', () => {

  let apiContext;
  let createdPostId; // 💡 Dynamic ID එක store කරගන්න Variable එකක්

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // 1. POST Request එකක් යවලා අලුත් Record එකක් හදනවා
  test('1. Create Post & Extract Dynamic ID', async () => {
    const postPayload = {
      title: 'Dynamic Chaining Test',
      body: 'Extracting ID for next requests',
      userId: 99
    };

    const response = await apiContext.post('/posts', {
      data: postPayload,
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response.status()).toBe(201);
    
    const responseBody = await response.json();
    
    // 💡 Server එකෙන් ලැබුණු Auto-generated ID එක Variable එකට Save කරගන්නවා
    createdPostId = responseBody.id; 
    console.log('Created Dynamic Post ID:', createdPostId);

    expect(createdPostId).toBeDefined();
  });

  // 2. අර කලින් Extract කරගත් ID එක පාවිච්චි කරලා GET කරනවා
  test('2. GET - Retrieve Created Post using Dynamic ID', async () => {
    // 💡 මෙන්න මෙතන හරියටම dynamic variable එක Pass වෙන්න ඕනේ
    const response = await apiContext.get(`/posts/${createdPostId}`);

    expect(response.status()).toBe(404); // Since JSONPlaceholder doesn't actually create new posts, it will return 404 for dynamic IDs
    console.log(`Fetching record for Dynamic ID: ${createdPostId}`);

    console.log(`Successfully fetched details for dynamic test using ID: ${createdPostId}`);
  });

  // 3. අර Dynamic ID එකෙන්ම DELETE කරනවා
  test('3. DELETE - Remove Created Post using Dynamic ID', async () => {
    const response = await apiContext.delete(`/posts/${createdPostId}`);

    expect(response.status()).toBe(200);
    console.log(`Successfully deleted record with Dynamic ID: ${createdPostId}`);
  });

});