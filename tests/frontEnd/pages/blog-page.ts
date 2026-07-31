import { type Locator, type Page, expect } from "@playwright/test";

export class BlogPage{
    readonly page: Page;
    readonly commentField: Locator;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly websiteField: Locator;
    readonly submitButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.commentField = page.getByRole('textbox', { name: 'Comment *' });
        this.nameField = page.getByRole('textbox', { name: 'Name' });
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.websiteField = page.getByRole('textbox', { name: 'Website' });
        this.submitButton = page.locator('#submit');
    }

    async fillOutTheCommentForm(){
        // The article page lazy-loads a third-party CTA-popup script on the
        // first click anywhere on the page. That script re-runs the theme's
        // placeholder-label logic for every form field, which wipes out
        // anything already typed. Trigger it harmlessly first and let it
        // settle, so it doesn't clobber the values we fill afterward.
        await this.commentField.click()
        await this.page.waitForTimeout(2000)

        // WordPress rejects a second submission of identical content as a
        // duplicate comment, so the text has to be unique per test run.
        const uniqueSuffix = Date.now()
        await this.nameField.fill('John Mayer')
        await this.emailField.fill(`john+${uniqueSuffix}@gmail.com`)
        await this.websiteField.fill('johnmayer.com')
        await this.commentField.fill(`Why do you consider this true? (${uniqueSuffix})`)
        await this.submitButton.click()
    }

    async assertRedirectedToArticle(){
        await expect(this.page).toHaveURL(/https:\/\/ultimateqa\.com\/temporal-activities-should-delegate\//, { timeout: 20000 })
    }
}

export default BlogPage;
