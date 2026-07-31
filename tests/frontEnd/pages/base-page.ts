import { type Locator, type Page, expect } from "@playwright/test";

export class BasePage{
    readonly page: Page;
    readonly projects: Locator;
    readonly contact: Locator;
    readonly services: Locator;
    readonly scheduleButton: Locator;
    readonly blog: Locator;
    readonly temporalActivitiesArticle: Locator;
    readonly caseStudiesLink: Locator;

    constructor(page:Page){
        this.page = page;
        this.projects = page.getByRole('link', { name: 'Projects' });
        this.contact = page.getByRole('button', { name: 'Contact' });
        this.services = page.getByRole('link', { name: 'Services' });
        this.scheduleButton = page.locator('a.et_pb_button.et_pb_button_0.et_pb_bg_layout_light');
        this.blog = page.getByRole('link', { name: 'Blog' }).first();
        this.temporalActivitiesArticle = page.getByRole('link', { name: 'Why Temporal Activities Should Delegate and Not Do the Work' }).first();
        this.caseStudiesLink = page.getByRole('link', { name: 'Case Studies' }).first();
    }

    async goToContactSection(){
        await this.projects.click()
        await this.contact.click()
    }

    async openScheduleSession(): Promise<Page>{
        await this.services.click()
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.scheduleButton.click(),
        ])
        await popup.waitForLoadState()
        return popup
    }

    async openBlogSession(): Promise<void>{
        await this.blog.click()
        await this.temporalActivitiesArticle.click()
    }

    async openCaseStudiesSession(): Promise<void>{
        await this.caseStudiesLink.click()
    }

    async openProjectsSection(): Promise<void>{
        await this.projects.first().click()
    }
}

export default BasePage;