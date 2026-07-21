const { test, expect } = require('@playwright/test');

test.describe('Handling Frames & Alerts', () => {

  // 1. Alert Test
  test('Handle JS Confirm Dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // Dialog Event එක අල්ලගන්නවා
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS Confirm');
      await dialog.accept(); // OK ක්ලික් කරනවා
    });

    // Alert එක Open වෙන Button එක Click කරනවා
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    // Result Message එක Validate කරනවා
    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });

  // 2. iFrame Test
test('Handle iFrame Input via JS Evaluate', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');

  const editorFrame = page.frameLocator('#mce_0_ifr');
  const editorBody = editorFrame.locator('#tinymce');

  // 1. Editor එකේ innerText එක Direct JS මගින් Set කරනවා
  await editorBody.evaluate(el => el.innerText = 'Hello Playwright iFrame!');

  // 2. Assert කරනවා
  await expect(editorBody).toHaveText('Hello Playwright iFrame!');
});

});