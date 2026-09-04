import { test, expect } from '@playwright/test';

const articlePlaceholders = {
  title: 'Article Title',
  description: `What's this article about?`,
  text: 'Write your article (in markdown)',
  tags: 'Enter tags',
};
export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.titleField = page.getByPlaceholder(articlePlaceholders.title);
    this.descriptionField = page.getByPlaceholder(
      articlePlaceholders.description,
    );
    this.textField = page.getByPlaceholder(articlePlaceholders.text);
    this.tagsField = page.getByPlaceholder(articlePlaceholders.tags);
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async clearInputFields(placeholderName) {
    await test.step(`Clear the input fields`, async () => {
      for (const [, value] of Object.entries(placeholderName)) {
        await this.page.getByPlaceholder(value).clear();
      }
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagsField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      const urlBeforeClick = this.page.url();
      await this.updateArticleButton.click();
      await new Promise(resolve => {
        setTimeout(resolve, 300);
      });
      if (this.page.url() !== urlBeforeClick) {
        await this.page.reload();
        await new Promise(resolve => {
          setTimeout(resolve, 300);
        });
      }
    });
  }

  async submitEditedArticleForm(article) {
    await test.step(`Submit the 'Edite Article' form`, async () => {
      await this.clearInputFields(articlePlaceholders);
      await this.fillTitleField(article.title);
      await this.fillDescriptionField(article.description);
      await this.fillTextField(article.text);
      //   if (article.tags.length > 0) {
      //     await this.fillTagsField(article.tags);
      //   }
      await this.clickUpdateArticleButton();
    });
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
