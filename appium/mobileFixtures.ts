import { test as base } from '@playwright/test';
import { createDriver, closeDriver } from './appiumConnect';

type MobileFixtures = {
  driver: WebdriverIO.Browser;
};

export const test = base.extend<MobileFixtures>({
  driver: async ({}, use) => {
    const driver = await createDriver();
    await use(driver);
    await closeDriver(driver);
  },
});

export { expect } from '@playwright/test';
