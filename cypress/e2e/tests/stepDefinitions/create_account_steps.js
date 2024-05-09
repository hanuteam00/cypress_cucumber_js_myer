/// <reference types="Cypress" />
// const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import {
  BeforeAll,
  Before,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

BeforeAll(function () {
  // This hook will be executed once at the beginnig of a feature.
  cy.generateFakeData();
});

// In your test file
Before(() => {
  cy.fixture("dataFake").then((dataFake) => {
    this.dataFake = dataFake[dataFake.length - 1];
  });
});

// beforeEach(function () {
// Before( function() {

//   //way 1: data Global - define in before hook and use in all TCs by using this.data

//   cy.fixture("invalidLogin").then((invalidLogin) => {
//     this.invalidLogin = invalidLogin;
//   });
//   cy.visi;
// });

Given("I am on the Myer Home page", () => {
  cy.visit("/");
  cy.log("this.dataFake.randTime: ", this.dataFake.randTime);
});

When("I clicks on Join button to go to the Myer Create Account page", () => {
  //verify Sign in/Join button is visible
  cy.get("button[data-automation='header-account']").should("be.visible");
  //click on Sign in/Join button
  cy.get("button[data-automation='header-account']").click();
  //click on Join link
  cy.get("#dropdownJoinLink").click();
  //verify user is navigated to Join page
  cy.url().should("include", "/join");
});

When("I fill out the registration form with valid details", () => {
  // Generate the current time in milliseconds
  // const currentTime = Date.now();
  //input email
  cy.get("#email").should("be.enabled");
  
  cy.get("#email").type(`${this.dataFake.randEmail}`, {
    force: true,
  });

  //click on Join button
  cy.get("button[class^='MuiButtonBase-root']:first-child").click();

  //input password
  cy.get("#password").type(`${this.dataFake.randPassword}`);

  //input first name
  cy.get("#first-name").type(`${this.dataFake.randFirstName}`);
  //input last name
  cy.get("#last-name").type(`${this.dataFake.randLastName}`);

  //input email
  cy.get("#mobile-phone").type(`${this.dataFake.randPhone}`);

  //input DOB
  cy.get("#date-of-birth").type(`${this.dataFake.randDOB}`);

  //input Address
  cy.get("#address").type("1 Hanoi");

  // cy.wait(1000);

  //select first recommendation address
  cy.get("div[role='button']:first-child").click({force: true});
});

When("I submit the registration form", () => {
  //click on Create account
  cy.get("#create-account").click();
});

Then("I should see a success message confirming my account creation", () => {
  //verify text contains
  cy.contains(
    "Your account is active. There was a temporary issue registering your MYER one. Please try again"
  );
  cy.writeToJson(
    "./cypress/fixtures/myerAccount.json",
    `${this.dataFake.randEmail}`,
    `${this.dataFake.randPassword}`,
    `${this.dataFake.randFirstName}`,
    `${this.dataFake.randLastName}`,
    `${this.dataFake.randPhone}`,
    `${this.dataFake.randDOB}`
  );
});

When("I fill out the registration form with an invalid email", () => {
  cy.get("#firstName").type("John");
  cy.get("#lastName").type("Doe");
  cy.get("#email").type("invalid-email");
  cy.get("#password").type("password123");
  cy.get("#confirmPassword").type("password123");
});

When("I fill out the registration form with mismatched passwords", () => {
  cy.get("#firstName").type("John");
  cy.get("#lastName").type("Doe");
  cy.get("#email").type("example@example.com");
  cy.get("#password").type("password123");
  cy.get("#confirmPassword").type("password456");
});

Then("I should see an error message indicating invalid email", () => {
  cy.get('[data-testid="error-message"]').contains("Invalid email");
});

Then("I should see an error message indicating password mismatch", () => {
  cy.get('[data-testid="error-message"]').contains("Passwords do not match");
});
