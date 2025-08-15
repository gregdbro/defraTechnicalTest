# DEFRA Technical Test
The purpose of this automation framework is to automate parts of the Sauce Labs Swag Labs website

## Project structure
```
| - data //stores basic information
    | - checkoutOverview.json
    | - pages.json
    | - products.json
    | - userDetails.json
| - env
    | - .env.example
    | - .env.prod (.gitIgnore)
    | - env.ts //sets the environment variable ENV to user choice, set from command line
| - pages //stores the page objects. trying to name them in the most sensible way will make it easier for developers to collaborate
    | - cartPage.ts
    | - checkoutCompletePage.ts
    | - checkoutStepOnePage.ts
    | - checkoutStepTwoPage.ts
    | - commonPage.ts //perhaps this should be moved to the support folder as it
    | - inventoryPage.ts
    | - loginPage.ts
| - src
    | - test
        | - features
            | - checkout.feature
            | - login.feature //in the future the framework could use authenticated cookies in the beforeAll hook, to minimise the amount of time testing the login feature the login.feature would then use unauthenticated cookies
            | - logout.feature
        | - steps
            | - checkoutCompleteSteps.ts
            | - checkoutStepOneSteps.ts
            | - commonSteps.ts
            | - inventorySteps.ts
            | - loginSteps.ts
| - support //support files which are reused in other pages
    | globals.ts //using a global variable means user only has to set it once during run time, and then access via the global variable
    | helper.ts //functions to help throughout the project in a reusable way. this may be very similar to commonPage.ts
    | hooks.ts //defines the setup and tear down of the framework. sets global variable url, launches chromium in headed mode for windows, and headless for other OS's (due to the CI/CD pipeline running on ubuntu), creates the new browser and page, upon failure; takes a screenshot and prints out the problematic scenario and the error message, closes the page and the browser context, finally closes the browser
    | pageFactory.ts //method of mapping the pages to prevent importing multiple pages
    | pageFixture.ts //declares the page
| - .gitignore //files / directories mentioned here are not pushed to git handy as node_modules is huge, and .env.* files contain sensitive data
| - cucumber.json //provides the cucumber setup, tells cucumber where to find files and some other basic settings
| - package-lock.json
| - package.json //describes the suite, provides the scripts and dependencies to execute
| - readMe.md
| - tsconfig.json //describes the Typescript config
```

## Pre requisites
- Node
    - node --version
        - PS ~\defratechnicaltest> node --version
        - v20.9.0
- npm
    - npm --version
        - PS ~\defratechnicaltest> npm --version 
        - 10.1.0

## How to clone the project
Access terminal, and navigate to where the project should be installed
```
    git clone https://github.com/gregdbro/defratechnicaltest.git
    cd defratechnicaltest
    npm install
```

## Executing a test case
Create the .env.{ENV} file
```
Navigate to env/
- Copy the .env.example file
- Paste it to the same directory and change the suffix to .prod
- Complete the file with the credentials found on https://www.saucedemo.com/
- I have not included the credentials as as a team, passwords should never be stored within repositories
```

Set the environment variable ENV to prod with the terminal command:
```
$env:ENV = "prod"
```
Setting to Production, as I do not have access to other environments such as; Dev, QA, Staging.

Run a test with terminal command npm run <tag>, where the tag is found in each of the feature files, and maps to the scripts section of package.json
```
npm run checkout
```

## Execution time:
| npm run <tag>   | checkout              | logout                | login                 |
| --------------- | --------------------- | --------------------- | --------------------- |
| Total Time      | 0m02.214s             | 0m02.546s             | 0m01.433s             |
| Executing Steps | 0m01.839s             | 0m02.116s             | 0m01.088s             |
| Scenario        | 1 scenario (1 passed) | 1 scenario (1 passed) | 1 scenario (1 passed) |
| Steps           | 10 steps (10 passed)  | 6 steps (6 passed)    | 3 steps (3 passed)    |

## Issues
When executing, I persistently ran into the net::ERR_CONNECTION_RESET error when performing the goto navigation.
In the past, I have had my own execution machine, as well as CI/CD pipelines added to the "whitelist", which permits testing to occur multiple times without facing these errors designed to stop DDOS attacks
There will be another way to circumnavigate this issue, but unfortunately I have not found the time to do so

## Future improvements
- Parallesation of the executions
- Whitelist to prevent ERR_CONNECTION_RESET
- Lower level testing in the test pyramid, such as unit and integration testing
- CI/CD pipeline integration
- Better tagging depending on the tests
- DB Connection, if there are many products, maintaining a JSON file could become a pain
- Better error handling; perhaps try/catches, including fail assertions, 
- Logging to be included throughout
- Reporting is about as basic as it can be. More refined reporting in the future
- Use of authenticated cookies when not testing the login functionality specifically
- Cross browser testing / cross platform
- Different viewport testing; mobile, tablet etc
- Password management
- Headless mode (quicker especially on CI/CD pipeline, however headed mode is better for debugging)
- Remove any flakiness in test
- Make use of fixtures for login tests
- Improve the quality of the feature files; features can be really robust and reuseable. Especially using scenarios and scenario outlines with great descriptions

## Bug spotted
Whilst executing the tests, I found that if the user does not add a product to the cart, they can still perform a checkout. Therefore, a negative test case could be created to verify that the user cannot progress to the cart page when there is no items in their cart

## Bug Report
```
    Title: User is able to proceed with a transaction when there are no items within their cart
    Description: The user is able to complete a transaction, receiving a successful checkout message, when there are no items   in their cart
    How to replicate:
        Navigate to https://www.saucedemo.com/
        Login with valid credentials
        Click the shopping cart link when no items are added to the cart
        Click checkout
        Input user information
        Click continue
        Click finish
        Click back home
    Expected outcome: (different based upon the individual business need. However, as a checkout is fairly common in the    e-Commerce world, I think the standard should be as follows)
        The user should not be able to access the Cart page if they have no items within their cart
    Actual outcome:
        The user is able to access the Cart page with no items in their cart
    Severity: (different based upon the individual business need)
        Critical
    Environment:
        Production
    Attachments:
        Here I would usually include; logs, images of the issue, videos of how to replicate, error messages .etc
```

## Further Testing (Amongst more)
```
Additional user tests
Adding multiple products to the cart from various pages
Removing products from the cart from various pages
Sort by functionality
Burger icon
    Navigation
    Resetting the app state
    Closing the Burger menu
Social media links
Product description page
Navigation buttons
Negative testing on the Your Information Page
Tax calculation
```

## Notes:
The difference between commonPage.expectElementToHaveValue and commonPage.expectElementToHaveText is that toHaveValue interacts with INPUT values, for example text input fields

## CI/CD:
- The CI/CD pipeline will run at 05:30 on Fridays.
- The environment variable is currently static. This variable could be dynamic depending on the user's choice, however, we only have one environment.
- I would replace the checkout tag with defraTestSuite when the net::ERR_CONNECTION_RESET issue is resolved
- In GHA please remember to input secrets and variables (found in the .env.example file) with the corresponding data into https://github.com/gregdbro/defratechnicaltest/settings/secrets/actions and https://github.com/gregdbro/defratechnicaltest/settings/variables/actions with their environment variable. In this case "prod"

## Branching Structure
I have been pushing code directly to the main branch which should never happen. It would be better to have a structure like main > development > feature branch, in which main is always production ready, development is safe but can be tested almost like staging environment, and the feature branches should be where the most frequent commits happen.
Of course, the branching structure could be improved in the workplace to be seamless. 
