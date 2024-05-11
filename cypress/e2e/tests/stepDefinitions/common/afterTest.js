/// <reference types="Cypress" />
import { AfterAll, After } from "@badeball/cypress-cucumber-preprocessor";

After(() => {
  // runs after each test block
});

AfterAll(() => {
  // runs once all tests are done
});
