import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user', async ({
  page2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  await homePage.open();
  await page2.reload();
  await homePage.assertGlobalFeedTabIsVisible();
  await page2.reload();
  await homePage.assertArticleInGlobalFeedIsVisible(articleWithoutTags.title);
});
