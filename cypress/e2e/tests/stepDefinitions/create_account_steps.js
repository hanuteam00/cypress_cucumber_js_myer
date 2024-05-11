/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { data } from './beforeTest'; // Import data from beforeTest.js

Given("I am on the Myer Home page", () => {
  //Visit Home page
  cy.visit("/");
  //Verify user is on the Home page
  cy.title().should(
    "contain",
    "MYER | Shop Fashion, Homewares, Beauty, Toys & More"
  );
  // cy.log("data.randTime: ", data.randTime);
  cy.wait(2000);
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
  cy.title().should("contain", "Join | MYER");
});

When("I fill out the registration form with valid details", () => {
  //input email
  cy.get("#email").should("be.enabled");

  cy.get("#email").type(`${data.randEmail}`, {
    force: true,
    delay: 50,
  });

  //click on Join button
  cy.get("button[class^='MuiButtonBase-root']:first-child").click();

  //input password
  cy.get("#password").type(`${data.randPassword}`);

  //input first name
  cy.get("#first-name").type(`${data.randFirstName}`);
  //input last name
  cy.get("#last-name").type(`${data.randLastName}`);

  //input email
  cy.get("#mobile-phone").type(`${data.randPhone}`);

  //input DOB
  cy.get("#date-of-birth").type(`${data.randDOB}`);

  //input Address
  cy.get("#address").type("1 Hanoi");

  // cy.wait(1000);

  //select first recommendation address
  cy.get("div[role='button']:first-child").click({ force: true });
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
  
  cy.contains(`Hello ${data.randFirstName}`);

  //write information of successful account creation to a json file
  cy.writeToJson(
    "./cypress/fixtures/myerAccount.json",
    `${data.randEmail}`,
    `${data.randPassword}`,
    `${data.randFirstName}`,
    `${data.randLastName}`,
    `${data.randPhone}`,
    `${data.randDOB}`
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
