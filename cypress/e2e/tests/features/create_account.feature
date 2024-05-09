Feature: Create Account on Myer Website

  Scenario: User successfully creates a new account
    Given I am on the Myer Home page
    When I clicks on Join button to go to the Myer Create Account page
    When I fill out the registration form with valid details
    And I submit the registration form
    Then I should see a success message confirming my account creation

  # Scenario: User fails to create a new account due to invalid email
  #   Given I am on the Myer Create Account page
  #   When I fill out the registration form with an invalid email
  #   And I submit the registration form
  #   Then I should see an error message indicating invalid email

  # Scenario: User fails to create a new account due to password mismatch
  #   Given I am on the Myer Create Account page
  #   When I fill out the registration form with mismatched passwords
  #   And I submit the registration form
  #   Then I should see an error message indicating password mismatch
