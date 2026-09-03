import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { editArticle } from '../../../src/ui/actions/articles/editArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(
  async ({
    page1,
    page2,
    user1,
    user2,
    articleWithoutTags,
    articleWithOneTag,
  }) => {
    await signUpUser(page1, user1);
    await signUpUser(page2, user2);

    await createArticle(page1, articleWithoutTags);
    articleWithOneTag.url = articleWithoutTags.url;
    await editArticle(page1, articleWithOneTag);
  },
);

test('View an article updated by another user', async ({
  page2,
  user2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user2.username);
});
