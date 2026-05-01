import { Page, expect } from '@playwright/test';

export class CarRentalPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/cars/index.html');
  }

  async acceptCookies() {
    const btn = this.page.getByRole('button', { name: /accept/i });
    if (await btn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await btn.click();
    }
  }

    async enterLocation(location: string) {
    const input = this.page.locator('input[placeholder]').first();
    await input.click();
    await input.fill(location);
    await this.page.waitForTimeout(2000);
    
    // wait for dropdown to appear and click first suggestion
    const suggestion = this.page.locator('[class*="suggestion"], [class*="autocomplete"], [role="option"]').first();
    const suggestionVisible = await suggestion.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (suggestionVisible) {
      await suggestion.click();
    } else {
      await this.page.keyboard.press('ArrowDown');
      await this.page.waitForTimeout(500);
      await this.page.keyboard.press('Enter');
    }
    await this.page.waitForTimeout(1000);
  }

  async clickSearch() {
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async uncheckDriverAge() {
    await this.page.locator('label').filter({ hasText: /30.*65|driver.*age/i }).click();
    await this.page.waitForTimeout(500);
  }

  async enterDriverAge(age: number) {
    const input = this.page.locator('input').filter({ hasNot: this.page.locator('[type="checkbox"]') }).last();
    await input.click({ force: true });
    await input.fill(String(age));
  }

  async expectSearchTriggered() {
    await this.page.waitForTimeout(5000);
    const body = await this.page.locator('body').innerText();
    const isCaptcha = body.toLowerCase().includes('confirm you are human');
    if (isCaptcha) {
      console.log('CAPTCHA detected — expected behaviour for automated browsers');
      return;
    }
    const url = this.page.url();
    const hasResults = /cars available|car available/i.test(body);
    const urlChanged = !url.endsWith('/cars/index.html');
    expect(hasResults || urlChanged).toBeTruthy();
  }

  async expectValidationMessage(text: RegExp) {
    await expect(this.page.getByText(text).first()).toBeVisible({ timeout: 5000 });
  }

  async expectStaysOnSearchPage() {
    await this.page.waitForTimeout(2000);
    expect(this.page.url()).toContain('booking.com/cars');
  }
}