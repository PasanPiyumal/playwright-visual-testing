import { test, expect } from '@playwright/test';

test('My First Test', async ({ page }) => {

    await page.goto('https://google.com/ncr');

    // Handle popup (like Accept cookies)
    const acceptButton = page.locator('button:has-text("Accept all")');
    if (await acceptButton.isVisible()) {
        await acceptButton.click();
        console.log('Popup accepted');
    }

    await page.locator('input[textarea="q"]').fill('Playwright');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000); // Wait for results to load
    const results = await page.locator('h3').allTextContents();
    expect(results.length).toBeGreaterThan(0);

});