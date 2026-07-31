import { test, expect } from '../appium/mobileFixtures';
import ProductsPage from '../appium/pages/products-page';

test.describe('General Store app - Appium smoke test', () => {
    test.describe.configure({ mode: 'serial' });
    

    test('Username missing displays error message', async ({ driver }) => {
        const productsPage = new ProductsPage(driver);
        await productsPage.userLoginWithoutUsername();
        await productsPage.assertErrorMessageIsDisplayed();
    });

    test('User is logeed in', async ({ driver }) => {
        const productsPage = new ProductsPage(driver);
        await productsPage.userLoginWithUsername('Berenice');
        await productsPage.clickButtonLogIn();
        await productsPage.assertUserIsLoggedIn();
    });

    test('User selects female gender before log in', async ({ driver }) => {
        const productsPage = new ProductsPage(driver);
        await productsPage.userLoginWithUsername('Berenice');
        await productsPage.selectFemaleGender();
        await productsPage.clickButtonLogIn();
        await productsPage.assertUserIsLoggedIn();
    });

    test('User adds an article to the cart', async ({ driver }) => {
        const productsPage = new ProductsPage(driver);
        await productsPage.userLoginWithUsername('Berenice');
        await productsPage.clickButtonLogIn();
        await productsPage.userAddArticleToTheCart();
        await productsPage.assertArticleWasAdded();
    });

    test('User returns to the products list', async ({ driver }) => {
        const productsPage = new ProductsPage(driver);
        await productsPage.userLoginWithUsername('Berenice');
        await productsPage.clickButtonLogIn()
        await productsPage.userAddArticleToTheCart();
        await productsPage.selectReturnArrow();
        await productsPage.assertProductsAreDisplayed();
    });
});