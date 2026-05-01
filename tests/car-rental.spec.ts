import { test } from '@playwright/test';
import { CarRentalPage } from '../pages/CarRentalPage';
import { generateCarRentalSearch, generateDriverAge } from '../helpers/dataGenerator';

test.describe('Booking.com - Car Rental Search', () => {

  let carRentalPage: CarRentalPage;

  test.beforeEach(async ({ page }) => {
    carRentalPage = new CarRentalPage(page);
    await carRentalPage.open();
    await carRentalPage.acceptCookies();
  });

  test('TC-001 - Successful search with valid data', async () => {
    const { location } = generateCarRentalSearch();
    await carRentalPage.enterLocation(location);
    await carRentalPage.clickSearch();
    await carRentalPage.expectSearchTriggered();
  });

  test('TC-007 - Search without entering driver age', async () => {
    await carRentalPage.uncheckDriverAge();
    await carRentalPage.clickSearch();
    await carRentalPage.expectValidationMessage(/please provide.*age|enter.*age/i);
  });

test('TC-009 - Driver age boundary value — 18', async () => {
    const { location } = generateCarRentalSearch();
    const { boundary } = generateDriverAge();
    await carRentalPage.enterLocation(location);
    await carRentalPage.uncheckDriverAge();
    await carRentalPage.enterDriverAge(boundary);
    await carRentalPage.clickSearch();
    await carRentalPage.expectSearchTriggered();
  });

  test('TC-010 - Driver age below minimum', async () => {
    const { underage } = generateDriverAge();
    await carRentalPage.uncheckDriverAge();
    await carRentalPage.enterDriverAge(underage);
    await carRentalPage.clickSearch();
    await carRentalPage.expectValidationMessage(/at least 18|minimum.*18/i);
  });

  test('N-001 - Search with empty pick-up location', async () => {
    await carRentalPage.clickSearch();
    await carRentalPage.expectStaysOnSearchPage();
  });

});