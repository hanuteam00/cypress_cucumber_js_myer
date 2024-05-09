const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");


async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );
  // Use the plugin for mochawesome reporter
  require("cypress-mochawesome-reporter/plugin")(on);

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://duckduckgo.com",
    specPattern: "**/*.feature",
    setupNodeEvents,
    // Enable "record and playback" feature
    experimentalStudio: true,
    // Whether to enable Chromium-based browser's Web Security for same-origin policy and insecure mixed content.
    chromeWebSecurity: false,

    // Enable video recording
    video: true,
    videosFolder: "cypress/reports/videos",

    // Whether Cypress will take a screenshot when a test fails during cypress run.
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false,
    screenshotsFolder: "cypress/reports/screenshots",
    
    // Set viewport
    viewportWidth: 1920,
    viewportHeight: 1080,
    // Time, in milliseconds, to wait until most DOM based commands are considered timed out.
    defaultCommandTimeout: 3000,
    // Time, in milliseconds, to wait for page transition events or cy.visit(), cy.go(), cy.reload() commands to fire their page load events.
    pageLoadTimeout: 10000,
  },
  //configure cypress mocha awesome reporter
  reporter: "cypress-mochawesome-reporter",
  //If you want to customize your HTML report with mochawesome-report-generator flags just add the flags you want to reporterOptions
  //https://www.npmjs.com/package/cypress-mochawesome-reporter#custom-options
  reporterOptions: {
    //Genarates Chart in HTML report
    charts: true,
    reportPageTitle: "Cypress Inline Mochawesome Reporter",
    //Screenshot will be embedded within the report
    embeddedScreenshots: true,
    //No separate assets folder will be created
    inlineAssets: true,
    saveAllAttempts: false,
    // reportDir: "cypress/results",
  },
});
