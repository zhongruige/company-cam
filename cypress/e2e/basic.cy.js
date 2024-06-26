/// <reference types="cypress" />

// Basic tests
// These tests verify that we can load the home page and login as a user.
// If these fail, then we know there's a critical issue with the site.
describe('Basic flows', () => {
    beforeEach(() => {
        // Run the tests with a larger viewpoint as the mobile version kicks in at the default resolution.
        // A more robust solution would be to check for the mobile menu and verify the links still show and work.
        // We'd also expand this out to support common resolutions we know our users use, such as an iPhone 12 or Pixel 8, to make sure the menu shows.
        cy.viewport(1280, 720)
     })

    it('loads the home page', () => {
      cy.visit('/')

      // Make sure the page we're on has the correct title and expected content to verify it loaded correctly.
      cy.title().should('eq', 'CompanyCam - The only app every contractor needs')
      cy.get('p.tagline').first().should('have.text', 'Every photo, video, chat, and project in one app.')

      // Make sure our sign up and login buttons are visible.
      cy.get('.global-login-button').should('be.visible')
      cy.get('.global-signup-button').should('be.visible')
    })

    it('can login', () => {
      // Get our username and password from the environment.
      const username = Cypress.env('username')
      const password = Cypress.env('password')
      const companyName = Cypress.env('companyName')
      
      // Navigate to the sign in page and login.
      cy.visit('/signin')

      cy.get('input#user_email_address').type(username)
      cy.get('input#user_password').type(`${password}{enter}`)

      // Verify we're on the projects page, where we land after logging in.
      cy.url().should('include', '/projects')

      // Make sure the company name shows, verifying we logged in as the correct user.
      cy.get('h6[data-testid=navigation__index__company-name').should('contain', companyName)
    })

  })
  