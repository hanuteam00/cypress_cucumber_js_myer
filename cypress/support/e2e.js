/// <reference types="cypress" />
//register the Cypress Mochawesome Reporter plugin to generate Mochawesome HTML
//without this registration, loss of detailed and visually appealing test reports\
//Mochawesome reports provide detailed information about test runs, including summaries, test statuses, error messages, screenshots, and more
// import 'cypress-mochawesome-reporter/register';
// Import commands.js using ES2015 syntax:
// import "./commands";
import "./commands";

// Hide fetch/XHR requests from command log
const app = window.top;
if (
  app &&
  !app.document.head.querySelector("[data-hide-command-log-request]")
) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none }";
  style.setAttribute("data-hide-command-log-request", "");

  app.document.head.appendChild(style);
}

// Listening for the 'uncaught:exception' event in Cypress.
Cypress.on("uncaught:exception", (err, runnable) => {
  // Prevent Cypress from automatically failing the test when an uncaught error occurs.
  // Handle the error here if necessary.
  // If you want Cypress to continue running the test despite the uncaught error, return false.
  return false;
});
