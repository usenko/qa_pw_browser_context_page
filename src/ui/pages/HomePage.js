import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed');
  }

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async gotoProfilePage(username) {
    await test.step(`Go to the profile page of ${username}`, async () => {
      await this.page.getByRole('link', { name: username }).click();
    });
  }

  getArticleInYourFeed(articleTitle) {
    return this.page.getByText(`Article title: ${articleTitle}`);
  }

  getUsernameButton(username) {
    return this.page.getByRole('link', { name: username });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickGlobalFeedLink() {
    await test.step(`Click the 'Global Feed' link`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickArticleInGlobalFeed(articleTitle) {
    await test.step(`
      Click the article ${articleTitle} in Global Feed`, async () => {
      await this.getArticleInYourFeed(articleTitle).click();
    });
  }

  async clickYourFeedLink() {
    await test.step(`Click the 'Your Feed' link`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertGlobalFeedTabIsVisible() {
    await test.step(`Assert the 'Global Feed' tab is visible`, async () => {
      await expect(this.globalFeedTab).toBeVisible();
    });
  }

  async assertArticleInYourFeedIsVisible(articleTitle) {
    await test.step(`
      Assert the article ${articleTitle} is visible in 'Your Feed'`, async () => {
      await expect(this.getArticleInYourFeed(articleTitle)).toBeVisible();
    });
  }

  async assertArticleInGlobalFeedIsVisible(articleTitle) {
    await test.step(`
      Assert the article ${articleTitle} is visible in 'Global Feed'`, async () => {
      await expect(this.getArticleInYourFeed(articleTitle)).toBeVisible({
        timeout: 10000,
      });
    });
  }

  async assertArticleInYourFeedIsNotVisible(articleTitle) {
    await test.step(`
      Assert the article ${articleTitle} is not visible in 'Your Feed'`, async () => {
      await expect(this.getArticleInYourFeed(articleTitle)).not.toBeVisible();
    });
  }

  async assertUsernameIsVisible(username) {
    await test.step(`
      Assert the username ${username} is visible`, async () => {
      await expect(this.getUsernameButton(username)).toBeVisible();
    });
  }
}
