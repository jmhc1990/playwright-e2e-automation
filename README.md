# 🚀 Playwright E2E Automation Framework

[![Playwright Tests](https://github.com/jmhc1990/playwright-e2e-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/jmhc1990/playwright-e2e-automation/actions)

Automated E2E testing framework built with **Playwright** and **TypeScript** targeting [SauceDemo](https://www.saucedemo.com/). Designed with clean architecture principles, Page Object Model (POM), custom fixtures, global authentication state, and CI/CD integration.

---

## 🛠️ Architecture & Key Features

* **Page Object Model (POM):** Strict separation between page selectors/actions and test assertions for high maintainability.
* **Custom Playwright Fixtures:** Native dependency injection (`tests/fixtures.ts`) to manage Page Objects cleanly without instantiating them manually inside tests.
* **Global Authentication (`storageState`):** Performs login once via `tests/auth.setup.ts`, saving browser context (`.auth/user.json`) to skip UI login steps on protected routes, drastically reducing test execution time.
* **Continuous Integration (CI/CD):** Integrated with **GitHub Actions** (`.github/workflows/playwright.yml`) executing tests in headless mode on every `push` and `pull_request` to `main`.
* **Artifacts & Diagnostics:** Configured automatic trace viewer, screenshots on failure, and HTML test report publishing.

---

## 📁 Project Structure

```text
├── .github/workflows/    # GitHub Actions CI/CD pipeline
├── pages/                # Page Object Model classes (LoginPage, InventoryPage)
├── tests/
│   ├── auth.setup.ts     # Global session state setup
│   ├── fixtures.ts       # Custom Playwright fixtures extension
│   ├── inventory.spec.ts # E2E tests for inventory/cart flows
│   └── login.spec.ts     # E2E tests for authentication
├── playwright.config.ts  # Global Playwright configuration & project setup
└── package.json
