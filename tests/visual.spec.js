const { test, expect } = require('@playwright/test');

test.describe('Arimac Home Page Visual Testing', () => {
test("Visual Test - Accept Cookies First", async ({ page }) => {
  await page.goto("https://arimac-web-2026.arimac.tech/");
  await page.waitForLoadState("networkidle");

  // 1. Cookie Banner Accept කිරීම
  const acceptCookieBtn = page.getByRole("button", { name: /accept|allow/i });
  if (await acceptCookieBtn.isVisible()) {
    await acceptCookieBtn.click();
    await page.waitForTimeout(1000);
  }

  // 2. 💡 Lazy loaded images ඔක්කොම load වෙන්න page එක යටටම scroll කරවනවා
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0); // ආයේ උඩට එනවා
          resolve();
        }
      }, 100);
    });
  });

  // Images ලෝඩ් වෙනකම් තව තත්පරයක් ඉන්නවා
  await page.waitForTimeout(1000);

  // 3. Dynamic Blog Section එකත් Mask කරනවා (Dynamic posts එන නිසා)
  await expect(page).toHaveScreenshot("arimac-homepage.png", {
    fullPage: true,
    animations: "disabled",
    mask: [
      page.locator(".typing-text"),
      page.locator(".blog-grid"), // 👈 Blog section එකේ class    එක (අවශ්‍ය නම්)
    ],
  });
});

});
