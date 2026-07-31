import { type Locator, type Page, expect } from "@playwright/test";

export class SchedulePage{
    readonly page: Page;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly roleField: Locator;
    readonly companyNameField: Locator;
    readonly messageField: Locator;
    readonly submitButton: Locator;
    readonly confirmationMessage: Locator;

    constructor(page:Page){
        this.page = page;
        this.nameField = page.getByLabel('Name*', { exact: true });
        this.emailField = page.getByRole('textbox', { name: 'Email*', exact: true });
        this.roleField = page.getByRole('textbox', { name: 'Role*', exact: true });
        this.companyNameField = page.getByRole('textbox', { name: 'Company name*', exact: true });
        this.messageField = page.getByLabel('Message*', { exact: true });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.confirmationMessage = page.getByText('Thank you!', { exact: true });
    }

    async fillOutTheScheduleForm(){
        await this.nameField.fill('Luis Andrade')
        await this.emailField.fill('luis@gmail.com')
        await this.roleField.fill('Manager')
        await this.companyNameField.fill('Unosquare')
        await this.messageField.fill('I would like to receive more details about your services')
        await this.submitButton.click()
    }

    // Note: this form is protected by a reCAPTCHA challenge, so submission
    // may be blocked and this assertion may never resolve in an automated run.
    async assertMessageIsDisplayed(){
        await expect (this.confirmationMessage).toBeVisible()
    }
}

export default SchedulePage;