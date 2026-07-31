import { spawn, ChildProcess } from 'child_process';
import path from 'path';

const APPIUM_HOST = '127.0.0.1';
const APPIUM_PORT = 4723;
const STATUS_URL = `http://${APPIUM_HOST}:${APPIUM_PORT}/status`;
const READY_TIMEOUT_MS = 30_000;
const POLL_INTERVAL_MS = 500;

async function isServerReady(): Promise<boolean> {
  try {
    const res = await fetch(STATUS_URL);
    if (!res.ok) return false;
    const body = await res.json();
    return Boolean(body?.value?.ready ?? true);
  } catch {
    return false;
  }
}

async function waitForServer(timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await isServerReady()) return true;
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
  return false;
}

/**
 * Reuses an already-running Appium server if one is reachable; otherwise starts the
 * project-local one and stops it on teardown. Never kills a server it didn't start.
 */
export default async function globalSetup(): Promise<() => Promise<void>> {
  if (await isServerReady()) {
    console.log(`[mobile] Reusing already-running Appium server at ${STATUS_URL}.`);
    return async () => {};
  }

  console.log('[mobile] Starting Appium server...');
  const appiumBin = require.resolve('appium');
  const child: ChildProcess = spawn(
    process.execPath,
    [appiumBin, '--port', String(APPIUM_PORT), '--base-path', '/'],
    { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' }
  );

  const ready = await waitForServer(READY_TIMEOUT_MS);
  if (!ready) {
    child.kill();
    throw new Error(`[mobile] Appium server did not become ready within ${READY_TIMEOUT_MS}ms.`);
  }
  console.log('[mobile] Appium server ready.');

  return async () => {
    console.log('[mobile] Stopping Appium server...');
    child.kill();
  };
}
