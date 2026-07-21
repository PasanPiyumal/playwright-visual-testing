require('dotenv').config();

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // 1. ටෙස්ට් ෆයිල් තියෙන ෆෝල්ඩර් එක ප්ලේරයිට් එකට කියනවා
  testDir: './tests',

  // 2. ටෙස්ට් එකක් උපරිම රන් වෙන්න පුළුවන් වෙලාව (මිලිසෙකන්ඩ් 30000 = තත්පර 30)
  timeout: 30 * 1000,

  // 3. එක ටෙස්ට් එකක් ෆේල් වුණොත් ආයෙත් එක පාරක් auto-retry කරන්න කියනවා
  retries: 1,

  // 4. HTML Report එකක් හදන්න කියනවා
  reporter: 'html',

  // 5. හැම බ්‍රවුසර් එකකටම පොදුවේ බලපාන සෙටින්ග්ස්
  use: {
    // 💡 .env එකේ තියෙන BASE_URL එක ප්ලේරයිට් එකේ global baseURL එක විදිහට සෙට් කරනවා
    //baseURL: process.env.BASE_URL,
    // 💡 ටෙස්ට් එක ෆේල් වුණොත් විතරක් Screenshot එකක් සහ Video එකක් ඔටෝ ගන්නවා!
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Headless mode එක true ද false ද කියලා මෙතනින් පාලනය කරන්න පුළුවන්
    headless: false, 
  },

  // 6. 👑 මෙන්න Multi-Browser Testing සෙල්ලම!
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    }, 
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json'
       },
       dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit', // WebKit කියන්නේ Safari බ්‍රවුසර් එකේ engine එක
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
