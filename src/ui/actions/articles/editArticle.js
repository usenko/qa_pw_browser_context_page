import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function editArticle(page, article) {
  article['url'] = await test.step(`Edit an article`, async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.open(article.url);
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.submitEditedArticleForm(article);
    //await viewArticlePage.assertArticleTitleIsVisible(article.title);

    return viewArticlePage.url();
  });

  return article;
}
