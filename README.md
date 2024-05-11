# cypress_cucumber_js_myer

# I. Try it first
Record a run in your terminal.
npx cypress run --record --key 09ae033b-07ee-4572-892e-b75cf6fd732b

# II. GitHub Actions setup
Run Cypress tests every time you push.
### 1.Set CYPRESS_RECORD_KEY in your GitHub repo → Settings → Secrets → Actions:
CYPRESS_RECORD_KEY : 09ae033b-07ee-4572-892e-b75cf6fd732b

### 2.Then add this file to your repository: .github/workflows/cypress.yml
name: Cypress Tests
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    # Runs tests in parallel with matrix strategy https://docs.cypress.io/guides/guides/parallelization
    # https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs
    # Also see warning here https://github.com/cypress-io/github-action#parallel
    strategy:
      fail-fast: false # https://github.com/cypress-io/github-action/issues/48
      matrix:
        containers: [1, 2] # Uses 2 parallel instances
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Cypress run
        # Uses the official Cypress GitHub action https://github.com/cypress-io/github-action
        uses: cypress-io/github-action@v6
        with:
          # Starts web server for E2E tests - replace with your own server invocation
          # https://docs.cypress.io/guides/continuous-integration/introduction#Boot-your-server
          start: npm start
          wait-on: 'http://localhost:3000' # Waits for above
          # Records to Cypress Cloud 
          # https://docs.cypress.io/guides/cloud/projects#Set-up-a-project-to-record
          record: true
          parallel: true # Runs test in parallel using settings above
        env:
          # For recording and parallelization to work you must set your CYPRESS_RECORD_KEY
          # in GitHub repo → Settings → Secrets → Actions
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          # Creating a token https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
