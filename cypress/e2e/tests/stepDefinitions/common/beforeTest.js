/// <reference types="Cypress" />
import { BeforeAll, Before } from "@badeball/cypress-cucumber-preprocessor";

let data; // Define data globally

BeforeAll(() => {
  // runs once before all tests
  cy.generateFakeData();
});

Before(() => {
  // runs before every test block
  cy.fixture("data").then((TestData) => {
    data = TestData[TestData.length - 1];
  });
});
