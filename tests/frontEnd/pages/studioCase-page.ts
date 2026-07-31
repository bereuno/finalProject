import { type Locator, type Page, expect } from "@playwright/test";

export class StudioCasePage{
    readonly page: Page;
    readonly appiumCaseStudy: Locator;
    readonly healthcareCaseStudy: Locator;
    readonly uiTestsCaseStudy: Locator;
    readonly insuranceCaseStudy: Locator;
    readonly hospitalityCaseStudy: Locator;

    constructor(page:Page){
        this.page = page;
        this.appiumCaseStudy = page.locator('h2').getByRole('link', { name: '25x Faster Mobile Testing Using Appium with Java', exact: true });
        this.healthcareCaseStudy = page.locator('h2').getByRole('link', { name: 'Case Study: Automation Program Development for a Large Healthcare   Organization by UltimateQA', exact: true });
        this.uiTestsCaseStudy = page.locator('h2').getByRole('link', { name: '560% Faster UI Tests: A Case Study', exact: true });
        this.insuranceCaseStudy = page.locator('h2').getByRole('link', { name: 'Insurance company reduces feedback cycle by 82% using automation', exact: true });
        this.hospitalityCaseStudy = page.locator('h2').getByRole('link', { name: 'Automation Elevated a Hospitality Business by Cutting Test Execution Time by 66% and Boosting ROI', exact: true });
    }

    async assertCaseStudiesAreVisible(){
        await expect(this.appiumCaseStudy).toBeVisible()
        await expect(this.healthcareCaseStudy).toBeVisible()
        await expect(this.uiTestsCaseStudy).toBeVisible()
        await expect(this.insuranceCaseStudy).toBeVisible()
        await expect(this.hospitalityCaseStudy).toBeVisible()
    }
}

export default StudioCasePage;