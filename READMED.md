# Playwright E2E Automation Framework

Automated End-to-End (E2E) testing framework built with **TypeScript** and **Playwright**, following the **Page Object Model (POM)** design pattern for optimal maintainability and scalability.

## 🚀 Tech Stack
* **Language:** TypeScript
* **Testing Framework:** Playwright Test
* **Architecture:** Page Object Model (POM)
* **Target Application:** SauceDemo (Demo E-commerce)

## 📁 Project Structure
```text
playwright-e2e-automation/
├── .github/workflows/    # CI/CD pipelines (optional/future)
├── pages/                # Page Object classes (UI locators & actions)
│   └── LoginPage.ts
├── tests/                # Test specifications suites
│   └── login.spec.ts
├── playwright.config.ts  # Playwright configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration