

import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Try standard dotenv load first
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

const result = dotenv.config({ path: envPath });

console.log('DOTENV RESULT:', result);
console.log('PATH:', envPath);
console.log('BROWSER:', process.env.BROWSER);



// 2. BULLETPROOF FALLBACK: If dotenvx stripped it, parse the file manually
if (!process.env.BROWSER && fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}



// Define all available browser configurations map
const allProjects = {
  chromium: {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  firefox: {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  webkit: {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
};



// Determine which projects to load based on the BROWSER environment variable
const getDynamicProjects = () => {
  const targetBrowser = process.env.BROWSER?.trim();

  console.log(`Playwright active BROWSER env variable: "${targetBrowser}"`);

  if (targetBrowser && allProjects[targetBrowser as keyof typeof allProjects]) {
    return [allProjects[targetBrowser as keyof typeof allProjects]];
  }

  console.log(`No specific browser matched. Running ALL major browsers.`);
  return Object.values(allProjects);
};




export default defineConfig({
  testDir: `./tests`,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: process.env.URL || 'https://opensource-demo.orangehrmlive.com/',
    headless: process.env.HEADLESS === 'true',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Dynamically sets projects based on .env */
  projects: getDynamicProjects(),
});


