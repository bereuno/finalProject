import { type Locator, type Page, expect } from "@playwright/test";

export class ProjectsPage{
    readonly page: Page;
    readonly freeStrategyCallButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.freeStrategyCallButton = page.getByRole('button', { name: 'Free Strategy Call' }).first();
    }

    async assertFreeStrategyCallIsVisible(){
        await expect(this.freeStrategyCallButton).toBeVisible()
    }

    async assertRedirectedToProjectsPage(){
        await expect(this.page).toHaveURL('https://projects.ultimateqa.com/')
    }
}

export default ProjectsPage;