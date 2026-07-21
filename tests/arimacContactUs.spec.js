import {test, expect} from '@playwright/test';

test('Arimac Contact Us Form Submission', async ({ page }) => {
    await page.goto('https://arimac-web-2026.arimac.tech/contact-us/');
    await page.getByPlaceholder('Your Name *').fill('Pasan Piyumal');
    await page.getByPlaceholder('Business Email *').fill('pasanpiyumal@example.com');
    await page.getByPlaceholder('Phone Number *').fill('81234567');
    await page.locator('select').selectOption('Telcom');
    await page.getByPlaceholder('Your Message *').fill('This is a test message for the contact form.');
    await page.locator('input[type="checkbox"]').check();
    await page.getByRole('button', { name: 'Submit form' }).click();
    // 'Thank you' කියලා පටන් ගන්න මැසේජ් එක පේජ් එකේ පේන්න තියෙනවද බලනවා
    // (exact: false දැම්මම අකුරු කැපිටල්/සිම්පල් වුණත්, ලාවට වචන ගැලපුණත් ලස්සනට අල්ලගන්නවා)
}); 