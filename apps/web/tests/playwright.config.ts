import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    timeout: 60000,

    expect: {
        timeout: 5000,
    },

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 2 : undefined,

    reporter: [
        ['html'],
        ['list'],
        ['json', { outputFile: 'playwright-report/results.json' }],
        ['junit', { outputFile: 'playwright-report/results.xml' }],
    ],

    use: {
        headless: true,

        viewport: {
            width: 1920,
            height: 1080,
        },

        ignoreHTTPSErrors: true,

        actionTimeout: 15_000,

        navigationTimeout: 30_000,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure',

        launchOptions: {
            slowMo: 0,
        },
    },

    outputDir: 'test-results',

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
            },
        },
    ],
});
