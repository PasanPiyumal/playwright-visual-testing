class ContactUsPage {
    constructor(page) {
        this.page = page;
        this.cookieAcceptButton = page.getByRole('button', { name: 'Accept All' });
        this.nameInput = page.getByPlaceholder('Your Name *');
        this.emailInput = page.getByPlaceholder('Business Email *');
        this.countryDropdown = page.getByRole('combobox', { name: 'Selected country' });    
        this.countrySearch = page.getByRole('combobox', { name: 'Search' });
        this.sriLankaOption = page.getByLabel('Contact form').getByText('Sri Lanka');
        this.phoneInput = page.getByPlaceholder('Phone Number *');
        this.serviceSelect = page.locator('select');
        this.messageInput = page.getByPlaceholder('Your Message *');
        this.termsCheckbox = page.locator('input[type="checkbox"]');
        this.submitButton = page.getByRole('button', { name: 'Submit form' });

    }

        async navigate() {
            // 💡 Config එකෙන් එන global baseURL එකට කෙළින්ම යන්න කියනවා
            await this.page.goto('/contact-us/');
        }

        async acceptCookies() {
            await this.cookieAcceptButton.click();
            await this.cookieAcceptButton.waitFor({ state: 'detached' }); // Wait for the popup to disappear
        }

        async submitForm(name, email, phone, service, message) {
            await this.nameInput.fill(name);
            await this.emailInput.fill(email);
            await this.countryDropdown.waitFor({ state: 'visible' });
            await this.countryDropdown.click();
            await this.countrySearch.fill('Sri');
            await this.sriLankaOption.waitFor({ state: 'visible' });
            await this.sriLankaOption.click();
            await this.phoneInput.fill(phone);
            await this.serviceSelect.selectOption(service);
            await this.messageInput.fill(message);
            await this.termsCheckbox.check();
            await this.submitButton.click();

        }
}
module.exports = { ContactUsPage };


