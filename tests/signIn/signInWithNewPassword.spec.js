import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { faker } from '@faker-js/faker';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../src/ui/constants/authErrorMessages';

test.beforeEach(async ({ page1, user }) => {
  await signUpUser(page1, user);
});

test('Sign in with changed in profile password', async ({
  page1,
  page2,
  user1,
}) => {
  const settingsPage = new SettingsPage(page1);
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);

  const oldPassword = user1.password;
  user1.newPassword = faker.internet.password();

  await settingsPage.open(user1.username);
  await settingsPage.assertProfileNameTitle(user1.username);
  await settingsPage.clickEditProfileButton();
  await settingsPage.assertProfileTitleIsVisible();
  await settingsPage.fillNewPasswordField(user1.newPassword);
  await settingsPage.clickUpdateSettingsButton();

  await signInPage.open();
  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(oldPassword);
  await signInPage.clickSignInButton();
  await signInPage.assertErrorMessageContainsText(
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  );

  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(user1.newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
