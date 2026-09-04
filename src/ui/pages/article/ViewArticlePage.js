import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  getFollowButton(username) {
    return this.page
      .getByRole('button', { hasText: `Follow ${username}` })
      .first();
  }

  getUnfollowButton(username) {
    return this.page
      .getByRole('button', { hasText: `Unfollow ${username}` })
      .first();
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickFollowButton(username) {
    await test.step(`Click the 'Follow ${username}' button`, async () => {
      await this.getFollowButton(username).click();
    });
  }

  async clickUnfollowButton(username) {
    await test.step(`Click the 'Unfollow ${username}' button`, async () => {
      await this.getUnfollowButton(username).click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`
      Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async assertFollowButtonIsVisible(username) {
    await test.step(`
      Assert the 'Follow ${username}' button is visible`, async () => {
      await expect(this.getFollowButton(username)).toBeVisible();
    });
  }

  async assertUnfollowButtonIsVisible(username) {
    await test.step(`
      Assert the 'Unfollow ${username}' button is visible`, async () => {
      await expect(this.getUnfollowButton(username)).toBeVisible();
    });
  }
}
