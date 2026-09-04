import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { faker } from '@faker-js/faker';

let signInPage;
let settingsPage;
let homePage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('Sign in with changed in profile password', async ({ page1, user }) => {
  settingsPage = new SettingsPage(page1);
  user.newPassword = faker.internet.password();

  await settingsPage.open(user.username);
  await settingsPage.assertProfileNameTitle(user.username);
  await settingsPage.clickEditProfileButton();
  await settingsPage.assertProfileTitleIsVisible();
  await settingsPage.fillNewPasswordField(user.newPassword);
  await settingsPage.clickUpdateSettingsButton();

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
