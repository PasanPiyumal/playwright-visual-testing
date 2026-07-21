const { test, expect } = require('@playwright/test');

test('Verify Dashboard without logging in again', async ({ page }) => {
  // Direct inventory page එකට යනවා (ආයේ login වෙන්න ඕනේ නෑ)
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Page එකේ තියෙන Header text එක Check කරනවා
  await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
});