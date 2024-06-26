const { defineConfig } = require("cypress");

module.exports = defineConfig({
  browser: {
    viewportHeight: 660,
    viewportWidth: 1280,
  },
  e2e: {
    // This normally would be an environment variable to allow testing on different sites.
    // Hard-coding to prod for convenience.
    baseUrl: 'https://companycam.com',
  },
  // This could either be an environment or a fixture.
  env: {
    address: 'W Terminal Dr, Salt Lake City, UT 84122',
    locationName: 'Salt Lake City International Airport',
    formattedAddress: 'W Terminal Dr • Salt Lake City, Utah 84122'
  },
});
