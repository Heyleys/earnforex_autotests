const { defineConfig } = require("cypress");
// require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",

    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: false,
    trashAssetsBeforeRuns: true,
  },
});
