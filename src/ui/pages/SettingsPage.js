import { expect, test } from '@playwright/test';

export class SettingsPage {
  constructor(page) {
    this.page = page;
    this.editProfileButton = page.getByRole('link', {
      name: 'Edit Profile Settings',
    });
    this.settingsTitle = page.getByRole('heading', { name: 'Your Settings' });
    this.newPasswordField = page.locator('input[placeholder="New Password"]');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
  }

  async open(username) {
    await test.step(`Open 'Profile' page`, async () => {
      const usernameStr = username.toLowerCase();
      await this.page.goto(`/profile/${usernameStr}`);
    });
  }

  async clickEditProfileButton() {
    await test.step(`Click the 'Edit Profile' button`, async () => {
      await this.editProfileButton.click();
    });
  }

  async clickUpdateSettingsButton() {
    await test.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async fillNewPasswordField(password) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.newPasswordField.fill(password);
    });
  }

  async assertProfileNameTitle(username) {
    await test.step(`
      Profile ${username} corresponds to the requested user`, async () => {
      const usernameText = await this.page.getByRole('heading').textContent();

      expect(usernameText?.trim()).toBe(username.toLowerCase());
    });
  }

  async assertProfileTitleIsVisible() {
    await test.step(`
      Assert the title 'Your Settings' is visible`, async () => {
      await expect(this.settingsTitle).toBeVisible();
    });
  }
}
