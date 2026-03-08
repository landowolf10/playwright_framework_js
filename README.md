Playwright framework developed with JavaScript and Cucumber for BDD implementing the Page Object Model and Page Object Manager design Patterns.

Before executing run: npm install

To execute:
1. Execute only on chromium (headless): npm run test:chromium
2. Execute only on firefox (headless): npm run test:firefox
3. Execute only on webkit (headless): npm run test:webkit
4. Execute only on chromium (headed mode): npm run test:chromium:headed
5. Execute only on firefox (headed mode): npm run test:firefox:headed
6. Execute only on webkit (headed mode): npm run test:webkit:headed
7. Execute on chromium, firefox and webkit in parallel (headless): npm run testAll:parallel
8. Execute on chromium, firefox and webkit in parallel (headed mode): npm run testAll:parallel:headed

To generate Allure report:
1. Generate report: npm run allure:generate
2. To open report: npm run allure:open

This framework is also integrated with CI/CD pipeline (Github Actions) where all the scenarios are execute after each push to main branch and generates and uploads the Allure report to Github Pages.