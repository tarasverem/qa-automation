# QA Automation — Booking.com + REST API

Playwright + TypeScript test suite covering UI and API automation.

## What's inside

- **UI tests** — car rental search flow on Booking.com
- **API tests** — GET, POST, DELETE endpoints on restful-api.dev

## Tech stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js

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

Run in a specific browser:
```bash
npx playwright test --project=chromium
```

View HTML report after run:
```bash
npx playwright show-report
```

## Test coverage

### UI — Booking.com Car Rental

| Test | Description |
|------|-------------|
| TC-001 | Successful search with valid data |
| TC-007 | Search without entering driver age |
| TC-010 | Driver age below minimum (under 18) |
| N-001 | Search with empty pick-up location |

> Note: Booking.com may trigger a CAPTCHA for automated browsers.
> TC-001 handles this gracefully — if CAPTCHA is detected the test
> logs a warning and passes, since the search was triggered successfully.

### API — restful-api.dev

| Test | Description |
|------|-------------|
| GET | Retrieve all objects |
| POST | Create a new object |
| GET by ID | Retrieve a specific object by ID |
| DELETE | Delete an object and verify it returns 404 |
