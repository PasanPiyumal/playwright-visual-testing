const { test, expect, request } = require('@playwright/test');
const { z } = require('zod'); // 💡 Zod library එක import කරගන්නවා

// 💡 1. API එකෙන් එන්න ඕනේ JSON Structure එක (Schema එක) Define කරනවා
const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
});

test.describe('API Schema Validation with Zod', () => {

  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Validate GET Response Schema', async () => {
    const response = await apiContext.get('/posts/1');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // 💡 2. ලැබුණු Data ටික අපේ Schema එකට ගැලපෙනවද බලනවා
    const parseResult = postSchema.safeParse(responseBody);

    // Schema එක match වුණා නම් success කියන එක true වෙනවා
    expect(parseResult.success).toBe(true);

    if (parseResult.success) {
      console.log('✅ Schema Validation Passed Successfully!');
    } else {
      console.log('❌ Schema Validation Failed:', parseResult.error);
    }
  });

}); 