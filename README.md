# qa-automation

Playwright + TypeScript test suite covering UI and API automation.

## Project structure
qa-automation/
├── tests/
│   ├── car-rental.spec.ts    # UI tests
│   └── api.spec.ts           # API tests
├── pages/
│   └── CarRentalPage.ts      # Page Object for Booking.com
├── api/
│   └── ObjectsApi.ts         # API client for restful-api.dev
├── helpers/
│   └── dataGenerator.ts      # Dynamic test data with faker
└── playwright.config.ts      # Config with baseURL per project

## Tech stack

- Playwright
- TypeScript
- Node.js
- faker.js

## Prerequisites

- Node.js v18+
- npm

## Installation

```bash
git clone https://github.com/tarasverem/qa-automation.git
cd qa-automation
npm install
npx playwright install
```

## Run tests

Run all tests:
```bash
npx playwright test
```

Run only UI tests:
```bash
npx playwright test car-rental.spec.ts
```

Run only API tests:
```bash
npx playwright test api.spec.ts
```

Run with browser visible:
```bash
npx playwright test --headed
```

View HTML report:
```bash
npx playwright show-report
```

## Test coverage

### UI — Booking.com Car Rental

| Test | Description |
|------|-------------|
| TC-001 | Successful search with valid data |
| TC-007 | Search without entering driver age |
| TC-009 | Driver age boundary value — 18 |
| TC-010 | Driver age below minimum — under 18 |
| N-001 | Search with empty pick-up location |

> Note: Booking.com may show a CAPTCHA for automated browsers. This is handled gracefully — the test logs a warning and passes since the search was triggered successfully.

### API — restful-api.dev

| Test | Description |
|------|-------------|
| GET | Retrieve all objects |
| POST | Create a new object |
| GET by ID | Retrieve a specific object by ID |
| DELETE | Delete an object and verify it returns 404 |
