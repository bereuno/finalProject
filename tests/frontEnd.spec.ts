import test, {Locator, Page, expect} from "@playwright/test"
import { BasePage } from "./frontEnd/pages/base-page"
import { ContactPage} from "./frontEnd/pages/contact-page"
import { SchedulePage } from "./frontEnd/pages/schedule-page"
import { BlogPage } from "./frontEnd/pages/blog-page"
import { ProjectsPage } from "./frontEnd/pages/projects-page"
import { StudioCasePage } from "./frontEnd/pages/studioCase-page"

const url = 'https://ultimateqa.com/automation'
let basePage: BasePage;
let contactPage: ContactPage;
let blogPage: BlogPage;
let projectsPage: ProjectsPage;
let studioCasePage: StudioCasePage;

test.beforeEach(async ({page}) =>{
    basePage = new BasePage(page);
    contactPage = new ContactPage(page);
    blogPage = new BlogPage(page);
    projectsPage = new ProjectsPage(page);
    studioCasePage = new StudioCasePage(page);
    await page.goto(url);
})

test.describe('Validations within demo site', ()=>{
    
    test('Send a contact message', async ({page}) => {
    
        await basePage.goToContactSection();
        await contactPage.fillOutTheContactForm();
        
        await contactPage.assertMessageIsDisplayed();
    
    });

    test('Schedule a free discovery session', async ({page}) => {

        const schedulePopup = await basePage.openScheduleSession();
        const schedulePage = new SchedulePage(schedulePopup);

        await schedulePage.fillOutTheScheduleForm();

    });
 

    test('User opens a blog article and sends a comment', async ({page}) => {


        await basePage.openBlogSession();

        await blogPage.fillOutTheCommentForm();

        await blogPage.assertRedirectedToArticle();

    });

    test('The case studies are validated', async ({page}) => {

        await basePage.openCaseStudiesSession();

        await studioCasePage.assertCaseStudiesAreVisible();
    });

    test('Manifestation article is displayed', async ({page}) => {

        await basePage.openProjectsSection();

        await projectsPage.assertFreeStrategyCallIsVisible();
        await projectsPage.assertRedirectedToProjectsPage();

    });

})