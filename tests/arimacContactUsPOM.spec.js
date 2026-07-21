const testData = require('./contactData.json');

const { test, expect } = require('@playwright/test');
const { ContactUsPage } = require('../pages/ContactUsPage');

testData.forEach((data) => {
    test(`Arimac Contact Us Form Submission for ${data.name}`, async ({ page }) => {
    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.navigate();
    await contactUsPage.acceptCookies();

    await contactUsPage.submitForm(
        data.name,
        data.email,
        data.phone,
        data.service,
        data.message
    );

  
    // 💡 getByLabel එකක් ඇතුළෙන් getByText එක හොයනවා:
    await expect(page.getByLabel('Contact form').getByText('Thank you for your message. It has been sent.').first()).toBeVisible();
    });
});
