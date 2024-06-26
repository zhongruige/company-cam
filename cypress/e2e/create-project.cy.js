/// <reference types="cypress" />

// Create a project and upload photos test
// These tests verify that we can create a prokect as a user and upload photos.
// If these fail, then we know two critical paths are broken that need to be addressed.
describe('Create a project and upload photos', () => {
    beforeEach(() => {
        // Set viewport to avoid the mobile menu.
        cy.viewport(1280, 720)

        // Use our login helper command. See support/commands.js
        cy.login()
     })

    it('can create a project', () => {

      // Pull our project details from the environment.
      const address = Cypress.env('address')
      const locationName = Cypress.env('locationName')
      // Match the formatting we do for the UI.
      // This could be abstracted into a helper function that formats the address so it isn't hard-coded.
      const formattedAddress = Cypress.env('formattedAddress')

      // Click to create a project
      cy.get('button[data-testid=project-feed__create-project]').click()
      cy.get('h3.modal-title').should('contain', 'Create Project')

      // Add in the address to find in Google
      cy.get('input[name=project_address]').type(address)

      // Click on the first result (it's the one we want) to select it
      cy.get('.pac-item').first().click()

      // Ideally, we'll have data attributes to better target this button, as we do in othe rplaces.
      cy.get('div.btn-container > button[type=submit]').click()

      // Verify the project was created with the correct name and address.
      // This also verifies we correctly found the right address from Google.
      cy.get('h1[data-testid=projects__title-heading').should('contain', locationName)
      cy.get('span[data-testid=project__address').should('contain', formattedAddress)
    })

    // This test is a great example of where using the session to retain a login session would save execution time.
    // See note in support/commands.js
    it('can upload files to the new project', () => {

      // This will get the latest project we created, but we should capture this by title when we have more.
      cy.get('.projects-list__project__title-container').first().click()

      // Spot check to make sure we did open the project we previously created.
      const locationName = Cypress.env('locationName')
      const formattedAddress = Cypress.env('formattedAddress')
      cy.get('h1[data-testid=projects__title-heading').should('contain', locationName)
      cy.get('span[data-testid=project__address').should('contain', formattedAddress)

      // Find the button to upload photod.
      cy.get('button[data-testid=photos__add-new-photo]').click()

      // Upload our two project photos using Cypress's drag and drop.
      cy.get('div[name=photo-drop-zone]').selectFile('cypress/data/p1.jpeg', {
        action: 'drag-drop'
      })
      cy.get('div[name=photo-drop-zone]').selectFile('cypress/data/p2.jpeg', {
        action: 'drag-drop'
      })

      // Close the upload modal once the photos are added.
      cy.get('a[data-testid=photos__upload-modal-close-button').click()

      // Verify the photos were uploaded, the count should be 2 as we uploaded 2 pictures
      cy.get('div[data-testid=assetfeed__asset-thumbnail]').should("have.length", 2)
    })
  })
  