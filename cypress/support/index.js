import { urlExists } from "./helpers"
import '@testing-library/cypress/add-commands';

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

Cypress.Commands.add("hasValidHref", { prevSubject: true }, anchor => {
  return urlExists(anchor.attr("href"))
})

Cypress.Commands.add("dataUrl", { prevSubject: true }, target => {
  return urlExists(target.attr('data-url'))
})
