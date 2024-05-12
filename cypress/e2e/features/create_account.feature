Feature: Create Account on Myer Website
  As a user
  I want to be able to create a new account on the Myer website
  So that I can access the full range of features available to registered users

  Rule: Happy paths for creating a new account on the Myer website
    Background:
      Given I am on the Myer Home page

    Scenario: User successfully creates a new account
      When I navigate to the Myer Create Account page by clicking on the Join button
      When I fill out the registration form with valid details
      And I submit the registration form
      Then I should see a success message confirming my account creation