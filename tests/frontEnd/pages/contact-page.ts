import { type Locator, type Page, expect } from "@playwright/test";

export class ContactPage{
    readonly page: Page;
    readonly contactName: Locator;
    readonly contactEmail: Locator;
    readonly contactMessage: Locator;
    readonly sendMessageButton: Locator;
    readonly messageDisplayed: Locator;

    constructor(page:Page){
        this.page = page;
        this.contactName = page.getByRole('textbox', { name: 'Name' });
        this.contactEmail = page.getByRole('textbox', { name: 'Email' });
        this.contactMessage = page.getByRole('textbox', { name: 'Message' });
        this.sendMessageButton = page.getByRole('button', { name: 'Send Message' });
        this.messageDisplayed = page.getByText('Message Sent!', { exact: true });
    }

    async fillOutTheContactForm(){
        await this.contactName.fill('Berenice')
        await this.contactEmail.fill('test@gmail.com')
        await this.contactMessage.fill('This is a test message')
        await this.sendMessageButton.click()
    }

    async assertMessageIsDisplayed(){
        await expect (this.messageDisplayed).toBeVisible()
    }
}

export default ContactPage;