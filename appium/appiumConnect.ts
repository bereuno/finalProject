import path from 'path';
import { remote } from 'webdriverio';

const APP_PATH = path.join(__dirname, 'resources', 'General-Store.apk');

/**
 * Opens a fresh Appium/UiAutomator2 session for the General Store app.
 * Assumes an Appium server is already reachable at localhost:4723 (see globalSetup.ts).
 */
export async function createDriver(): Promise<WebdriverIO.Browser> {
  return remote({
    protocol: 'http',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    logLevel: 'warn',
    connectionRetryTimeout: 90_000,
    connectionRetryCount: 3,
    capabilities: {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME ?? 'emulator-5554',
      'appium:app': APP_PATH,
      'appium:appPackage': 'com.androidsample.generalstore',
      'appium:appActivity': 'com.androidsample.generalstore.SplashActivity',
      'appium:noReset': false,
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 240,
    },
  });
}

export async function closeDriver(driver: WebdriverIO.Browser): Promise<void> {
  try {
    await driver.deleteSession();
  } catch (err) {
    console.warn('[mobile] deleteSession failed (session may already be gone):', err);
  }
}
