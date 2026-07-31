import { expect } from 'expect-webdriverio';

const PKG = 'com.androidsample.generalstore';

export default class ProductsPage {
  constructor(private driver: WebdriverIO.Browser) {}

  private get nameField() {
    return this.driver.$(`android=new UiSelector().resourceId("${PKG}:id/nameField")`);
  }

  private get letsShopButton() {
    return this.driver.$(`android=new UiSelector().resourceId("${PKG}:id/btnLetsShop")`);
  }

  private get toolbarTitle() {
    return this.driver.$(`android=new UiSelector().resourceId("${PKG}:id/toolbar_title")`);
  }

  private get firstAddToCartButton() {
    return this.driver.$(`android=new UiSelector().resourceId("${PKG}:id/productAddCart").instance(0)`);
  }

  private get cartCounter() {
    return this.driver.$(`android=new UiSelector().resourceId("${PKG}:id/counterText")`);
  }

  private get radioFemaleButton() {
    return this.driver.$(`android=new UiSelector().resourceId("${PKG}:id/radioFemale")`);
  }

  private get cartIconButton() {
    return this.driver.$(`android=new UiSelector().resourceId("${PKG}:id/appbar_btn_cart")`);
  }

  private get backArrowButton() {
    return this.driver.$(`android=new UiSelector().resourceId("${PKG}:id/appbar_btn_back")`);
  }

  async userLoginWithoutUsername() {
    await this.letsShopButton.click();
  }

  async assertErrorMessageIsDisplayed() {
    // The missing-name error is a real Android Toast (confirmed via `adb shell dumpsys window`,
    // ty=TOAST). UiAutomator2's element-finding (UiSelector queries) never sees Toast windows,
    // but `getPageSource()` special-cases currently-visible toasts into the XML dump, so we poll
    // that instead of trying to locate the toast as a findable element.
    await this.driver.waitUntil(
      async () => (await this.driver.getPageSource()).includes('Please enter your name'),
      { timeout: 6000, interval: 250, timeoutMsg: 'expected missing-username error was never shown' }
    );
  }

  async userLoginWithUsername(name: string) {
    await this.nameField.setValue(name);
  }

  async clickButtonLogIn() {
    await this.letsShopButton.click();
  }

  async selectFemaleGender() {
    await this.radioFemaleButton.click();
  }

  async assertUserIsLoggedIn() {
    await expect(this.toolbarTitle).toHaveText('Products');
  }

  async userAddArticleToTheCart() {
    await this.firstAddToCartButton.click();
  }

  async assertArticleWasAdded() {
    await expect(this.cartCounter).toHaveText('1');
  }

  async selectReturnArrow() {
    await this.cartIconButton.click();
    await this.backArrowButton.click();
  }

  async assertProductsAreDisplayed() {
    await expect(this.toolbarTitle).toHaveText('Products');
  }
}
