/// <reference types="Cypress" />
// const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import {
  BeforeAll,
  Before,
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

// In your test file
// BeforeAll(function () {
//   // This hook will be executed once at the beginnig of a feature.
//   cy.log("Before all");
//   cy.generateFakeData();
// });
// beforeEach(function () {
// Before( function() {

//   //way 1: data Global - define in before hook and use in all TCs by using this.data
//   cy.fixture("data").then(function (data) {
//     this.data = data;
//   });
//   cy.fixture("invalidLogin").then((invalidLogin) => {
//     this.invalidLogin = invalidLogin;
//   });
//   cy.visi;
// });

Given("I am on the Myer Home page", () => {
  cy.visit("/");
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
  //input email
  cy.get("#email").type("testmyer1@mailnesia.com");

  //click on Join button
  cy.get("button[class^='MuiButtonBase-root']:first-child").click();

  //input password
  cy.get("#password").type("Aa123456@");

  //input first name
  cy.get("#first-name").type("test");
  //input last name
  cy.get("#last-name").type("myer1");

  //input email
  cy.get("#mobile-phone").type("0412345678");

  //input DOB
  cy.get("#date-of-birth").type("25/12/1990");

  //input Address
  cy.get("#address").type("1 Hanoi Way, HOCKING  WA 6065");
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
