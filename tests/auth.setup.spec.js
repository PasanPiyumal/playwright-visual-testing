const { test: setup, expect } = require('@playwright/test');

const authFile = 'playwright/.auth/user.json';

setup('Authenticate User and Save State', async ({ page }) => {
  // Real working site එකට යනවා
  await page.goto('https://www.saucedemo.com/');

  // Credentials ටික පුරවනවා
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Dashboard / Inventory page එකට ගියාද බලනවා
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Session storage & cookies ටික save කරගන්නවා
  await page.context().storageState({ path: authFile });
});