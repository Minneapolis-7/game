import {
  ForumMainPage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  Page404,
  Page500,
  ProfileEditPage,
  ProfileEditPasswordPage,
  ProfilePage,
  RegisterPage,
} from '@/pages';
import paths from '@/shared/const/paths';
import text from '@/shared/const/text';

const routes = [
  {
    path: '/',
    component: MainPage,
    exact: true,
    protected: false,
    title: text.game.title,
  },
  {
    path: paths.LOGIN,
    component: LoginPage,
    exact: true,
    protected: false,
    title: text.login.title,
  },
  {
    path: paths.REGISTER,
    component: RegisterPage,
    exact: true,
    protected: false,
    title: text.register.title,
  },
  {
    path: paths.PROFILE,
    component: ProfilePage,
    exact: true,
    protected: true,
    title: text.profile.title,
  },
  {
    path: paths.PROFILE_EDIT,
    component: ProfileEditPage,
    exact: true,
    protected: true,
    title: text.profile.editTitle,
  },
  {
    path: paths.PROFILE_EDIT_PASSWORD,
    component: ProfileEditPasswordPage,
    exact: true,
    protected: true,
    title: text.profile.editPasswordTitle,
  },
  {
    path: paths.FORUM,
    component: ForumMainPage,
    exact: true,
    protected: true,
    title: text.forum.title,
  },
  {
    path: paths.FORUM_SECTION,
    component: ForumMainPage,
    exact: true,
    protected: true,
    // todo: свой title для разных страниц форума
    title: text.forum.title,
  },
  {
    path: paths.FORUM_THREAD,
    component: ForumMainPage,
    exact: true,
    protected: true,
    title: text.forum.title,
  },
  {
    path: paths.FORUM_THREAD_CREATE,
    component: ForumMainPage,
    exact: true,
    protected: true,
    title: text.forum.title,
  },
  {
    path: paths.FORUM_COMMENT,
    component: ForumMainPage,
    exact: true,
    protected: true,
    title: text.forum.title,
  },
  {
    path: paths.LEADERBOARD,
    component: LeaderboardPage,
    exact: true,
    protected: false,
    title: text.leaderboard.title,
  },
  {
    path: paths.SERVER_ERROR,
    component: Page500,
    exact: true,
    protected: false,
    title: text.page500.title,
  },
  {
    path: '*',
    component: Page404,
    exact: true,
    protected: false,
    title: text.page404.title,
  },
];

export default routes;
