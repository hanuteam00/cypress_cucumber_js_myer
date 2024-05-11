/// <reference types="cypress" />
const { defineConfig } = require("cypress");
const cypressOnFix = require("cypress-on-fix");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

// Function to set up node events
async function setupNodeEvents(on, config) {
  // Fixing issue with hook conflicts
  on = cypressOnFix(on);

  // Use the mochawesome reporter plugin
  require("cypress-mochawesome-reporter/plugin")(on);

  // Add cucumber preprocessor plugin
  await addCucumberPreprocessorPlugin(on, config);

  // Preprocess files using esbuild
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Return the modified config object
  return config;
}

// Export Cypress configuration
module.exports = defineConfig({
  // Cypress configuration options
  e2e: {
    // Environment variables
    env: {
      commandDelay: 500, // Delay between commands
    },
    // Base URL for tests
    baseUrl: "https://www.myer.com.au/",
    // Pattern to search for spec files
    specPattern: "**/*.feature",
    // Event setup function
    setupNodeEvents,
    // Experimental Studio
    experimentalStudio: true,
    // Disable Chrome Web Security
    chromeWebSecurity: false,
    // Enable video recording
    video: true,
    // Enable screenshots on test failures
    screenshotOnRunFailure: true,
    // Trash assets before runs
    trashAssetsBeforeRuns: false,
    // Set viewport dimensions
    viewportWidth: 1920,
    viewportHeight: 1080,
    // Default command timeout
    defaultCommandTimeout: 30000, // 30 seconds
    // Page load timeout
    pageLoadTimeout: 60000, // 1 minute
  },
  // Configuration for Cypress mochawesome reporter
  reporter: "cypress-mochawesome-reporter",
  // Reporter options
  reporterOptions: {
    charts: true, // Generate charts in HTML report
    reportPageTitle: "Cypress Inline Mochawesome Reporter",
    embeddedScreenshots: true, // Embed screenshots within the report
    inlineAssets: true, // No separate assets folder will be created
    saveAllAttempts: false, // Save all attempts
  },
  // Project ID
  projectId: "42jpi6",
});